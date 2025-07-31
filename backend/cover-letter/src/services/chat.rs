use futures::SinkExt;
use indoc::formatdoc;
use lazy_static::lazy_static;
use serde::{Deserialize, Serialize};
use ts_rs::TS;

use crate::core::model::{
    ApplicationId, ApplicationParameters, ChatLog, ChatLogEntry, ChatRole, JsonResume, RevisionId,
    UserId,
};
use crate::db::queries;
use crate::integrations::prompting::{request_json_answer, send_message_streaming};
use crate::web::server_sent_event::ServerSentEvent;
use crate::{
    core::app_state::AppState, core::error::LogErrAndFatal,
    services::resume::RESUME_JSON_EXPLANATION,
};
use futures::stream::StreamExt;

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[serde(tag = "kind")]
#[serde(rename_all = "camelCase")]
pub enum ChatResponseData {
    ResponseChunk(ResponseChunk),
    ChatLog(ChatLog),
    RevisionId(RevisionId),
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[serde(tag = "kind")]
#[serde(rename_all = "camelCase")]
pub enum ChatResponseError {
    NotFound,
    GenerationFailed,
    NeitherJobAdvertNorResumeSpecified,
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct ResponseChunk {
    text: String,
}

trait ToPrompt {
    fn to_prompt(&self) -> String;
}

impl ToPrompt for ApplicationParameters {
    fn to_prompt(&self) -> String {
        let json_resume_prompt: String = self.json_resume.as_ref().map_or_else(
            || "Es gibt derzeit keinen JSON-Lebenslauf für den Nutzer.".to_owned(),
            |json_resume| {
                formatdoc! {r#"
                Der aktuelle Stand des JSON-Lebenslaufs ist wie folgt:
                ```json
                {}
                ```
                "#,
                serde_json::to_string_pretty(json_resume).unwrap()
                }
            },
        );
        let job_advert_prompt: String = self.job_advert.as_ref().map_or_else(
            || "Der Nutzer hat noch keine Stellenanzeige bereitgestellt.".to_owned(),
            |job_advert| {
                formatdoc! {r#"
                Die vom Nutzer bereitgestellte Stellenanzeige lautet wie folgt:
                ```
                {}
                ```
                "#,
                job_advert
                }
            },
        );
        formatdoc! {r#"
        {}
        {}
        "#,
        json_resume_prompt,
        job_advert_prompt
        }
    }
}

lazy_static! {
    pub static ref SYSTEM_PROMPT: String = formatdoc! {r#"
Du bist "Bewerbungshelfer", ein Experte für Bewerbungen, eingebettet in eine Website.
Du bearbeitest den Lebenslauf des Nutzers im JsonResume-Format.
Der JSON-Lebenslauf (JsonResume) wird dem Nutzer auf der Website mit verschiedenen Vorlagen dargestellt.
Beschreibe die Änderungen "high-level", erwähne nicht das JsonResume selbst, da der Nutzer nur den dargestellten Lebenslauf sieht und das JsonResume Format, bzw. JSON, nicht kennt.

Folgend eine Definition und Erklärung des JsonResume-Formats:

{}

Im Allgemeinen kann der Nutzer u.a. Folgendes tun:
1. Den Lebenslauf bearbeiten
2. Den Lebenslauf auf eine Stelle zuschneiden
3. Einen neuen Lebenslauf erstellen

Befolge hierzu folgende Richtlinien:

1. Allgemeine Prinzipien:
   - Formuliere kurz und präzise
   - Formuliere die Angaben des Nutzers professionell und für einen Lebenslauf geeignet
   - Datumsangaben: Monat und Jahr (frage nach, falls nur Jahr angegeben)
   - Umfang: maximal zwei Seiten, bei sehr langer Erfahrung 3
   - Foto: nicht zwingend, aber von Personalern gerne gesehen; professionelle Qualität
   - Keine Rechtschreib- oder Grammatikfehler
   - Kein "Schwafeln" oder Lügen
   - Keine Angabe von Fähigkeiten oder Erfahrungen, die du nicht vom Nutzer selbst hast
   - Aktueller Werdegang bis zum heutigen Datum

2. Struktur und Inhalt:

   a) Kontaktdaten / Persönliche Daten:
      - Pflichtangaben: Email, Telefon-/Handynummer, vollständige Adresse (Straße, PLZ, Ort)
      - Optional: Staatsangehörigkeit, Familienstand, ggf. Kinder

   b) Professional Title:
      - Titel der Stellenanzeige (ggf. Geschlecht anpassen)
      - Eventuell mit zusätzlichem positiven Adjektiv
      - Maximal 2-4 Wörter

   c) Beruflicher Werdegang:
      - Umgekehrt chronologisch
      - 2-5 Stichpunkte bei relevanten Stationen:
        * Aufgaben und Erfolge
        * Falls möglich quantifizieren
        * Kurz und präzise in Stickpunkten formulieren
        * Auf Stellenbeschreibung zuschneiden
      - Weniger Details bei alten Stationen oder Stationen, die für die aktuelle Stellenanzeige weniger relevant sind
      - Interne Jobwechsel separat auflisten

   d) Bildungsweg / Ausbildung:
      - Umgekehrt chronologisch
      - Schulbildung: Abschluss und Schule nennen (keine Grundschule bei Erwachsenen)
      - Abschlussnote optional, bei guter Note erwähnen
      - Studium/Ausbildung: ggf. Schwerpunkte, Auslandserfahrungen
      - Umfang je nach Relevanz für Werdegang und Stellenbeschreibung

   e) Weiterbildung / Fortbildung:
      - Umgekehrt chronologisch
      - Zeitangabe, ggf. Umfang ("100h")
      - Relevanz prüfen: Bezug zur Stelle, Level, Aktualität, Marktwert

   f) Projekte:
      - Besonders für IT, Ingenieurwesen, Architektur
      - Detaillierte Beschreibungen relevanter Aufgaben/Fähigkeiten
      - Für Absolventen: relevante Erfahrungen jenseits des Studiums

   g) Skills / Fähigkeiten:
      - Konkret (z.B. "Microsoft Office 2405" statt "EDV-Fähigkeiten")
      - Durch Werdegang belegt
      - Keywords aus Stellenanzeige (wenn zutreffend)
      - Nur stickpunktartig (1-3 Wörter)
      - Level / Niveau optional, z.B. 6/10 oder Experte / Fortgeschritten / Grundkenntnisse, aber unbedingt einheitlich

   h) Interessen, Hobbys:
      - Nur wenn für Stelle relevant
      - Dienen dazu, Soft Skills belegen, der Bewerbung ein Gesicht zu geben
      - Spezifisch, mit Details

3. Besondere Situationen:
   - Lückenloser Werdegang: Lücken ab 2-3 Monaten erklären (z.B. Reisen, Elternzeit, Neuorientierung, Gesundheit)
   - Bei Arbeitslosigkeit positive Formulierungen wie "berufliche Neuorientierung" oder "Arbeitssuche" verwenden

4. Zuschneiden auf Stelle:
   - Keywords der Stellenanzeige nutzen (nur wenn auf den Nutzer zutreffend)
   - Relevante Erfahrungen und Fähigkeiten hervorheben
   - Details weglassen, die nicht relevant für die Stellenbeschreibung der aktuellen Bewerbung sind

5. Interaktion mit dem Nutzer:
   - Proaktiv sein und den Nutzer durch die Erstellung und Verbesserung des Lebenslauf führen
     - Zum Beispiel: "Zu Ihrer Stelle bei [Firma] könnten wir noch mehr Details hinzufügen. Was waren Ihre Hauptaufgaben dort? Eine Beispielformulierung wäre: 'Personalverantwortung für 5 Mitarbeiter und Verantwortung für ein Projekt mit einem Budget von 100.000€.'"
     - Zum Beispiel: "Sie haben bei Ihrer Stelle als [Berufsbezeichnung] angeben, dass Sie am Kernprodukt mitgearbeitet haben. Je spezifischer Sie hier werden, desto besser. Was ist das Kernprodukt und welche Rolle hatten Sie dabei?"
   - Fehlende Informationen erfragen
   - Verbesserungsvorschläge machen
   - Konkrete Änderungswünsche umsetzen
   - Lücken im Lebenslauf identifizieren und nachfragen
   - Deine Sprache an Bildungsgrad des Nutzers anpassen
   - Inhaltliche Fragen beantworten
   - Erwähne nicht das JsonResume selbst, da der Nutzer nur den dargestellten Lebenslauf sieht und das JsonResume Format, bzw. JSON, nicht kennt
   - Überfordere den Nutzer nicht:
     - Stelle ihm nur eine Frage auf einmal, die möglichst konkret ist
     - Bei offeneren Fragen, die Kreativität oder gute Formulierungen benötigen, gib ihm ein kurzes Beispiel oder Vorschlag
   - Frage die Daten des Nutzers nacheinander ab (erst Name, dann Adresse, dann Telefonnummer, usw.)
     - Zum Beispiel: "Wie lautet ihr vollständiger Name (Vor- und Nachname)?"
     - Stelle nie mehrere Fragen, wie "Bitte geben Sie mir Ihren vollständigen Namen, Ihre Adresse und Ihre Telefonnummer."

Bedenke, du kannst den Inhalt des Lebenslaufs (d.h. das JsonResume) ändern, aber nicht das Layout.
Du kannst notfalls den Inhalt leicht anpassen, um ihn an das Layout anzupassen, aber kommuniziere dem Nutzer klar, dass du das Layout selbst nicht ändern kannst.

Der Nutzer kann Änderungen rückgängig machen (zu einer früheren Version zurückkehren), indem er auf die Zurück-Schaltfläche im Browser klickt.
Informiere ihn darüber, wenn er dich bittet, alle von dir im letzten Schritt vorgenommenen Änderungen rückgängig zu machen.

Denk daran, immer nur eine konkrete Frage auf einmal zu stellen, um den Nutzer nicht zu überfordern.
Zum Beispiel: "Wie lautet ihr vollständiger Name (Vor- und Nachname)?"
Stelle nie mehrere Fragen, wie "Bitte geben Sie mir Ihren vollständigen Namen, Ihre Adresse und Ihre Telefonnummer."
Im JSON Resume entspricht das in der Regel einem einzigen Feld auf der untersten Ebene, also einem konkreten String.

Folgend skizziere ich dir ein Beispielhaftes Vorgehen für das Erstellen des Lebenslaufs:
1. Erfrage den Namen des Nutzers.
2. Frage nach der letzten beruflichen Station im Werdegang.
  2.1. Erfrage die Stellenbezeichnung und den Arbeitgeber.
  2.2. Erfrage den Zeitraum der Tätigkeit.
  2.3. Erfrage ausreichend Details zu dieser Station, hilf beim Formulieren.
  2.4. Mach konkrete Vorschläge nach obigen Richtlinien.
  2.5. Beurteile, ob mehr Details gut wären und mache einen konkreten Vorschlag, was noch erwähnt werden könnte oder sollte.
  2.6. Wiederhole diesen Prozess, bis die Station professionell und vollständig beschrieben ist.
3. Frage nach der vorausgegangenen Station im Lebenslauf. Gehe dabei analog zu Schritt 2 vor.
4. Wiederhole diesen Prozess, bis du alle beruflichen Stationen und Ausbildungen erfasst hast.
5. Mache konkrete Vorschläge für die Skills und Interessen.
6. Frage nach Weiterbildungen.
7. Frage nach Interessen und hilf dem Nutzer diese so zu formulieren, dass sie seiner Bewerbung einen Mehrwert geben.
8. Mache einen konkreten Vorschlag für den professionellen Titel (Professional Title) des Nutzers.
9. Erfrage nacheinander die Kontaktdaten des Nutzers.
"#, *RESUME_JSON_EXPLANATION
    };
}

const ASSISTANT_INTRODUCTION: &str = r#"
Hallo, ich bin Bewerbungshelfer, Ihr Experte für Bewerbungen.
Folgende Dinge kann ich für Sie erledigen:

1. Ihren Lebenslauf **verbessern** bzw. gezielt bearbeiten.
2. Ihren Lebenslauf **auf die Stelle zuschneiden**, auf die Sie sich gerade bewerben.
3. Einen neuen Lebenslauf **erstellen**.
"#;

pub fn initial_chat_log() -> ChatLog {
    ChatLog {
        chat_log: vec![
            ChatLogEntry {
                role: ChatRole::System,
                content: SYSTEM_PROMPT.to_string(),
                image_url: None,
            },
            ChatLogEntry {
                role: ChatRole::Assistant,
                content: ASSISTANT_INTRODUCTION.to_string(),
                image_url: None,
            },
        ],
    }
}

pub async fn create_chat_response_stream(
    state: AppState,
    user_id: UserId,
    application_id: ApplicationId,
    revision_id: Option<RevisionId>,
) -> impl futures::Stream<Item = ServerSentEvent<ChatResponseData, ChatResponseError>> {
    let (mut tx, rx) = futures::channel::mpsc::channel(100);

    tokio::spawn(async move {
        let application_parameters: Option<ApplicationParameters> = match revision_id {
            None => None,
            Some(revision_id) => {
                let application_parameters =
                    queries::get_parameters(&state.db, user_id, revision_id)
                        .await
                        .log_and_fatal()
                        .unwrap();
                match application_parameters {
                    Some(application_parameters) => Some(application_parameters),
                    None => {
                        tx.send(ServerSentEvent::Err {
                            error: ChatResponseError::NotFound,
                        })
                        .await
                        .unwrap();
                        return;
                    }
                }
            }
        };

        let mut chat_log: ChatLog = queries::get_chat_log_or_insert_new(
            &mut state.db.acquire().await.unwrap(),
            &user_id,
            &application_id,
        )
        .await
        .log_and_fatal()
        .unwrap();

        if !should_respond(&chat_log) {
            tx.send(create_chat_log_event(&chat_log)).await.unwrap();
            tx.send(ServerSentEvent::End).await.unwrap();
            return;
        }

        if let Some(application_parameters) = &application_parameters {
            update_system_prompt(&mut chat_log, application_parameters, &user_id, &state).await;
        }

        stream_ai_response(&state, &mut tx, &mut chat_log, user_id, application_id).await;

        update_json_resume(
            &state,
            &mut tx,
            &mut chat_log,
            user_id,
            application_id,
            application_parameters,
        )
        .await;

        tx.send(ServerSentEvent::End).await.unwrap();
    });

    rx
}

fn should_respond(chat_log: &ChatLog) -> bool {
    match chat_log.chat_log.last().map(|entry| entry.role) {
        Some(ChatRole::Assistant) | Some(ChatRole::System) | None => false,
        Some(ChatRole::Function) | Some(ChatRole::Tool) | Some(ChatRole::User) => true,
    }
}

fn create_chat_log_event(
    chat_log: &ChatLog,
) -> ServerSentEvent<ChatResponseData, ChatResponseError> {
    ServerSentEvent::Ok {
        data: ChatResponseData::ChatLog(chat_log.clone()),
    }
}

async fn update_system_prompt(
    chat_log: &mut ChatLog,
    application_parameters: &ApplicationParameters,
    user_id: &UserId,
    state: &AppState,
) {
    let json_resume = match &application_parameters.json_resume {
        Some(json_resume) => Some(json_resume.clone()),
        None => {
            crate::services::resume::get_json_resume_for_application_parameters(
                state,
                &user_id,
                &application_parameters,
            )
            .await
        }
    };
    let application_parameters_with_json_resume_gotten = ApplicationParameters {
        json_resume,
        ..application_parameters.clone()
    };
    let system_message = formatdoc! {r#"
        {}
        {}
        "#,
        *SYSTEM_PROMPT,
        application_parameters_with_json_resume_gotten.to_prompt(),
    };

    chat_log.chat_log[0] = ChatLogEntry {
        role: ChatRole::System,
        content: system_message,
        image_url: None,
    };
}

async fn stream_ai_response(
    state: &AppState,
    tx: &mut futures::channel::mpsc::Sender<ServerSentEvent<ChatResponseData, ChatResponseError>>,
    chat_log: &mut ChatLog,
    user_id: UserId,
    application_id: ApplicationId,
) {
    let streaming_response = send_message_streaming("".to_owned(), chat_log.clone().into(), None)
        .await
        .unwrap();

    tx.send(create_chat_log_event(chat_log)).await.unwrap();
    let mut buffer = String::new();
    let mut stream = Box::pin(streaming_response);

    while let Some(chunk) = stream.next().await {
        if let Ok(chunk) = chunk {
            buffer.push_str(&chunk);
            let data_event = ServerSentEvent::Ok {
                data: ChatResponseData::ResponseChunk(ResponseChunk { text: chunk }),
            };
            tx.send(data_event).await.unwrap();
        }
    }

    let assistant_response = ChatLogEntry {
        role: ChatRole::Assistant,
        content: buffer.clone(),
        image_url: None,
    };
    chat_log.chat_log.push(assistant_response.clone());

    {
        let mut db_connection = state.db.acquire().await.unwrap();
        queries::push_chat_log_entry(
            &mut *db_connection,
            &user_id,
            &application_id,
            assistant_response,
        )
        .await
        .log_and_fatal()
        .unwrap();
    }
}

async fn update_json_resume(
    state: &AppState,
    tx: &mut futures::channel::mpsc::Sender<ServerSentEvent<ChatResponseData, ChatResponseError>>,
    chat_log: &mut ChatLog,
    user_id: UserId,
    application_id: ApplicationId,
    application_parameters: Option<ApplicationParameters>,
) {
    let update_json_resume_prompt = r#"[Hat der Nutzer ins seiner letzten Nachricht Änderungen am Lebenslauf gefordert, die du ihm gerade erklärt hast, dass du sie vornimmst? Falls ja, gib nun das vollständige und aktualisierte JsonResume aus, also nicht nur die Änderung. Falls es keiner Änderungen bedarf, antworte einfach nur mit ```json null```.]"#;

    let json_resume: Option<JsonResume> = request_json_answer(
        update_json_resume_prompt.to_owned(),
        &mut chat_log.clone().into(),
    )
    .await
    .unwrap();

    if let Some(json_resume) = json_resume {
        let old_parameters = application_parameters.unwrap_or_default();
        let new_parameters = ApplicationParameters {
            json_resume: Some(json_resume),
            ..old_parameters
        };

        let new_revision_id = queries::set_application_parameters(
            &state.db,
            user_id,
            application_id,
            &new_parameters,
        )
        .await
        .log_and_fatal()
        .unwrap();

        if let Some(revision_id) = new_revision_id {
            let event = ServerSentEvent::Ok {
                data: ChatResponseData::RevisionId(revision_id),
            };
            tx.send(event).await.unwrap();
        }
    }
}
