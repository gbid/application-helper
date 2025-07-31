use crate::core::model::RevisionId;
use crate::core::model::UserId;
use crate::core::model::{CoverLetterGenerationInputData, CoverLetterLanguage};
use crate::db::queries;
use crate::utils::document;
use indoc::indoc;

const GUIDELINES_ENGLISH: &'static str = indoc! { r#"
    Guidelines for Writing a Cover Letter

    1. Introduction: Capture Interest and Show Individuality

        Avoid standard phrases and templates:
            Use concrete, personal examples.
            Establish a connection to the company and explain your motivation.

        Self-reflection questions:
            Why are you applying for this position at this company?
            What is the most important professional requirement of the position, and how do you meet it?

        Inspirational examples:
            Confident: "Having successfully led a team of 15 employees over the past two years, I am confident that I can meet the requirements of the [Position] role at your company."
            Specific: "In my previous role, I achieved a three percent revenue increase for my company. I aim to achieve similar results for your organization."

        Avoid generic and boring phrases like:
            "I am applying for the position of [Position]."
            "With great [interest, enthusiasm], I am applying..."
            "... immediately caught my attention."

    2. Main Body: Present Qualifications and Experiences Specifically

        Hard Skills:
            Provide specific examples and achievements beyond the resume.
            Example: "Last fall, as the leader of an international project team, I developed a new voice-controlled finance app that recorded 20,000 downloads in the first three months after launch."
            Do not claim to have a skill that is not listed on your resume.
            Instead, show your willingness to learn with a concrete example.

        Soft Skills:
            Back up personal qualities with examples.
            Example: "As a facility manager, I was available outside core working hours to help tenants with issues, which was often praised."

        Company Connection:
            Explain the value you bring to the company.
            Example: "Your project [Project Name] caught my interest. In the past, I have successfully completed similar projects and would like to bring my experience to your company."

        Avoid repetitions:
            Elaborate on important points from the resume.
            Leave out irrelevant points.
            For example, a brief internship is far less relevant than your last full-time job.

    3. Conclusion: Confident and Clear Closing Statement

        Avoid conditional and question forms:
            Use clear declarative sentences.
            Example: "I look forward to your invitation to an interview."

        Mention salary expectations only if requested in the job posting.

    4. Formalities

        Personal salutation:
            "Dear Ms. Müller, Dear Mr. Schneider,"

        Closing formula:
            "Sincerely,"

    5. Tips for Authenticity and Convincing Power

        Avoid repetitions:
            Your cover letter should provide new information.

        Stay authentic:
            Do not write anything that does not truly represent you.

        Mention references:
            If possible, name references that can confirm your professional qualifications.

        Always be specific by providing concrete examples.

        
"#};

const GUIDELINES_GERMAN: &'static str = indoc! {r#"
    Leitfaden für ein Bewerbungsschreiben
    1. Einleitung: Interesse wecken und Individualität zeigen

        Vermeide Standardfloskeln und Vorlagen:
            Nutze konkrete, persönliche Beispiele.
            Stelle einen Bezug zum Unternehmen her und erkläre deine Motivation.

        Fragen zur Selbstreflexion:
            Warum bewirbst du dich auf die Stelle bei diesem Unternehmen?
            Was ist die wichtigste fachliche Anforderung der Stelle und inwiefern erfüllst du sie?

        Beispielsätze zur Inspiration:
            Selbstbewusst: „Da ich in den letzten zwei Jahren erfolgreich ein Team von 15 Mitarbeitern geleitet habe, bin ich überzeugt, dass ich die Anforderungen der Stelle als [Position] bei Ihrem Unternehmen erfüllen kann.”
            Konkret: „In meiner vorherigen Position habe ich meinem Unternehmen ein Umsatzplus von drei Prozent gebracht. Genau das möchte ich für Ihr Unternehmen auch erreichen.”

        Vermeide unbedingt Floskeln wie diese:
            „Hiermit bewerbe ich mich um die Stelle als [Position]”
            „Mit großem [Interesse, Begeisterung] bewerbe ich mich...”
            „... hat sofort mein Interesse geweckt.”

        Ziel der Einleitung:
            Das Interesse des Personalers wecken und ihn zum Weiterlesen bringen.

    2. Hauptteil: Qualifikationen und Erfahrungen konkret darstellen

        Hard Skills:
            Konkrete Beispiele und Erfolge anführen, die über den Lebenslauf hinausgehen.
            Beispiel: „Im Herbst letzten Jahres habe ich als Leiter eines internationalen Projektteams eine neue sprachgesteuerte Finanz-App entwickelt, die in den ersten drei Monaten nach Launch 20.000 Downloads verzeichnete.”
            Behaupte auf keinen Fall, dass du eine Fähigkeit hast, die nicht in deinem Lebenslauf steht.
            Zeige stattdessen deine Lernbereitschaft anhand eines konkreten Beispiels auf.

        Soft Skills:
            Persönliche Eigenschaften mit Beispielen belegen.
            Beispiel: „Als Facility-Manager war ich auch außerhalb der Kernarbeitszeit erreichbar und habe Mietern bei Problemen geholfen, was oft gelobt wurde.”

        Unternehmensbezug:
            Erläutere, welchen Mehrwert du dem Unternehmen bringst.
            Beispiel: „Ihr Projekt [Name des Projekts] hat mein Interesse geweckt. In der Vergangenheit habe ich ähnliche Projekte erfolgreich abgeschlossen und möchte meine Erfahrung in Ihrem Unternehmen einbringen.”

        Vermeide Wiederholungen:
            Gehe auf wichtige Punkte aus dem Lebenslauf näher ein.
            Lass irrelevante Punkte weg.
            Ein kurzes Praktikum ist z.B. weit weniger relevant als die letzte Vollzeitstelle.

    3. Abschluss: Selbstbewusster und klarer Schlusssatz

        Vermeide Konjunktiv und Frageformen:
            Nutze klare Aussagesätze.
            Beispiel: „Ich freue mich auf Ihre Einladung zu einem Vorstellungsgespräch.”

        Gib Gehaltsvorstellungen nur an, wenn diese in der Stellenausschreibung gefordert sind.

    4. Formalien

        Persönliche Anrede:
            „Sehr geehrte Frau Müller, sehr geehrter Herr Schneider,”

        Grußformel:
            „Mit freundlichen Grüßen”

    5. Tipps zur Authentizität und Überzeugungskraft

        Vermeide Wiederholungen:
            Dein Anschreiben sollte neue Informationen bieten.

        Authentisch bleiben:
            Schreibe nichts, was dir nicht wirklich entspricht.

        Referenzen anführen:
            Falls möglich, nenne Referenzen, die deine fachlichen Qualifikationen bestätigen.

        Sei immer konkret, indem du konkrete Beispiele anführst.
"#};

pub fn build_english_prompt(data: CoverLetterGenerationInputData) -> String {
    let CoverLetterGenerationInputData {
        job_advert,
        resume_text,
        template_cover_letter,
        word_count,
        language_override: _,
        cover_letter_random_seed: _,
        cover_letter_text: _,
    } = data;

    let core_instructions = match template_cover_letter {
        Some(template_cover_letter) => {
            format!(
                indoc! {r#"
                    Write a cover letter that is very closely based on the following template cover letter and only adapt it where necessary and appropriate to the job listing and your resume:

                    """{template_cover_letter}"""

                    The following guidelines for writing a cover letter can help you adapt the cover letter where necessary:

                    """{GUIDELINES_ENGLISH}"""
                "#},
                template_cover_letter = template_cover_letter,
                GUIDELINES_ENGLISH = GUIDELINES_ENGLISH
            )
        }
        None => {
            format!(
                indoc! {r#"
                    Write a cover letter based on the following guidelines for writing a cover letter:

                    """{GUIDELINES_ENGLISH}"""
                "#},
                GUIDELINES_ENGLISH = GUIDELINES_ENGLISH
            )
        }
    };

    let prompt = format!(
        indoc! {r#"
            You are applying for the job given by the following job listing:

            """{job_description}"""

            Your resume you are sending with your application is the following:

            """{resume_text}"""

            {core_instructions}
            The language of the cover letter should be English.
            The length of the cover letter should be roughly {word_count} words.
            Do not include address, sender and other formalities in the cover letter, so your letter should start with the salutation and end with the closing formula.
            "#
        },
        job_description = job_advert.unwrap_or_default(),
        resume_text = resume_text.unwrap_or_default(),
        core_instructions = core_instructions,
        word_count = word_count.word_count,
    );
    prompt
}

pub fn build_german_prompt(data: CoverLetterGenerationInputData) -> String {
    let CoverLetterGenerationInputData {
        job_advert,
        resume_text,
        template_cover_letter,
        word_count,
        language_override: _,
        cover_letter_random_seed: _,
        cover_letter_text: _,
    } = data;

    let core_instructions = match template_cover_letter {
        Some(template_cover_letter) => {
            format!(
                indoc! {r#"
                    Verfassen Sie ein Anschreiben, das sehr eng an dem folgenden Vorlagen-Anschreiben orientiert ist und passen Sie es nur wo nötig und sinnvoll an die Stellenausschreibung und ggf. Ihren Lebenslauf an:

                    """{template_cover_letter}"""

                    Der folgende Leitfaden für Bewerbungsschreiben kann Ihnen helfen, das Anschreiben wo nötig anzupassen:

                    """{GUIDELINES_GERMAN}"""
                "#},
                GUIDELINES_GERMAN = GUIDELINES_GERMAN,
                template_cover_letter = template_cover_letter
            )
        }
        None => {
            format!(
                indoc! {r#"
                    Verfassen Sie ein Anschreiben anhand des folgenden Leitfadens für Bewerbungsschreiben:

                    """{GUIDELINES_GERMAN}"""
                "#},
                GUIDELINES_GERMAN = GUIDELINES_GERMAN
            )
        }
    };
    let prompt = format!(
        indoc! {r#"
            Sie bewerben sich auf die folgende Stellenausschreibung:

            """{job_description}"""

            Ihr Lebenslauf, den Sie mit Ihrer Bewerbung senden, ist der folgende:

            """{resume_text}"""

            {core_instructions}

            Die Sprache des Anschreibens sollte Deutsch sein.
            Die Länge des Anschreibens sollte ungefähr {word_count} Wörter betragen.
            Ihr Anschreiben sollte keine Adresse, Absender und andere Formalitäten enthalten, sodass Ihr Brief mit der Anrede beginnen und mit der Grußformel enden sollte.
            "#
        },
        job_description = job_advert.unwrap_or_default(),
        resume_text = resume_text.unwrap_or_default(),
        core_instructions = core_instructions,
        word_count = word_count.word_count,
    );
    prompt
}

pub fn build_prompt(data: CoverLetterGenerationInputData) -> String {
    let language = match data.language_override {
        Some(language) => language,
        // TODO: Detect language from job description and perhaps resume text.
        None => CoverLetterLanguage::German,
    };
    let prompt = match language {
        CoverLetterLanguage::German => build_german_prompt(data),
        CoverLetterLanguage::English => build_english_prompt(data),
    };
    prompt
}

pub async fn get_cover_letter_input_data(
    db: &sqlx::PgPool,
    user_id: &UserId,
    revision_id: &RevisionId,
) -> Option<CoverLetterGenerationInputData> {
    let queries::CoverLetterGenerationInputDataFromDb {
        word_count,
        job_advert,
        template_cover_letter,
        language_override,
        resume_document,
        cover_letter_random_seed,
        cover_letter_text,
    } = queries::get_cover_letter_input_data(db, user_id, revision_id)
        .await
        .expect("Failed to get cover letter input data from database")?;

    let resume_text = match resume_document {
        Some(resume_document) => {
            let resume_text = document::prepare_document(&resume_document)
                .await
                .expect("Failed to prepare resume document");
            Some(resume_text)
        }
        None => None,
    };

    Some(CoverLetterGenerationInputData {
        word_count,
        job_advert,
        template_cover_letter,
        language_override,
        resume_text: resume_text,
        cover_letter_random_seed,
        cover_letter_text,
    })
}
