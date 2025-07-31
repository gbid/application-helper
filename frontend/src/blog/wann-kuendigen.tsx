import { styles } from "./shared";
import { H2 } from "./shared";
import { H3 } from "./shared";
import { linkStyles } from "./shared";
import { serializeRoute } from "../route";
import { RouteKind } from "../route";

export function WannKuendigen() {
  return (
    <>
      <section style={styles.content.section}>
        <p style={styles.content.paragraph}>
          "Soll ich kündigen oder bleiben?" - Diese Frage stellen sich viele
          Arbeitnehmer im Laufe ihres Berufslebens. Gerade in Zeiten
          fundamentaler Veränderungen der Arbeitswelt durch Homeoffice, Remote
          Work und hybride Arbeitsmodelle sind die Entscheidungsfaktoren
          komplexer geworden. Während ein{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "lebenslauf-guide" },
            })}
            style={linkStyles}
          >
            überzeugender Lebenslauf
          </a>{" "}
          und ein{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "anschreiben-guide" },
            })}
            style={linkStyles}
          >
            maßgeschneidertes Anschreiben
          </a>{" "}
          essentiell für die nächste Bewerbung sind, ist die Entscheidung über
          den richtigen Zeitpunkt für einen Jobwechsel oft die größere
          Herausforderung.
        </p>

        <p style={styles.content.paragraph}>
          Die Arbeitswelt hat sich gewandelt: Homeoffice-Möglichkeiten, flexible
          Arbeitszeiten und digitale Zusammenarbeit sind für viele zu
          entscheidenden Faktoren der Arbeitszufriedenheit geworden.
          Gleichzeitig sind auch die Erwartungen an die Work-Life-Balance,
          persönliche Entwicklung und Unternehmenskultur gestiegen. Dieser
          Artikel hilft dir, die wichtigsten Signale zu erkennen und eine
          fundierte Entscheidung über deine berufliche Zukunft zu treffen.
        </p>

        <div style={styles.content.note}>
          Kurz & Knapp: Die Entscheidung zu kündigen sollte nie überstürzt
          getroffen werden. Deutliche Warnzeichen sind anhaltende
          Unzufriedenheit, fehlende Entwicklungsperspektiven, ein toxisches
          Arbeitsumfeld oder die Verschlechterung deiner Gesundheit. Besonders
          im Homeoffice-Zeitalter sind zudem die Vereinbarkeit mit deinen
          Präferenzen zur Arbeitsweise, mangelnde digitale Infrastruktur und
          fehlende Wertschätzung der Remote-Arbeit wichtige Indikatoren. Vor der
          Kündigung solltest du eine ehrliche Bestandsaufnahme machen,
          Alternativen prüfen und finanziell sowie beruflich gut vorbereitet
          sein.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>
          Die klassischen Anzeichen: Wann traditionell ein Jobwechsel ansteht
        </H2>
        <p style={styles.content.paragraph}>
          Bevor wir auf die spezifischen Herausforderungen und
          Entscheidungsfaktoren im Homeoffice-Kontext eingehen, lohnt ein Blick
          auf die klassischen Warnsignale, die für einen Jobwechsel sprechen
          können. Diese Anzeichen haben auch in der neuen Arbeitswelt ihre
          Gültigkeit nicht verloren.
        </p>

        <H3>Anhaltende Unzufriedenheit und Motivationsverlust</H3>
        <p style={styles.content.paragraph}>
          Der offensichtlichste Indikator ist eine anhaltende Unzufriedenheit
          mit deiner aktuellen Position. Wenn du regelmäßig mit Widerwillen zur
          Arbeit gehst, dich chronisch untermotiviert fühlst oder das
          Sonntagabendtief zur wöchentlichen Konstante geworden ist, solltest du
          aufhorchen.
        </p>

        <p style={styles.content.paragraph}>
          Wichtig ist hier die Unterscheidung zwischen vorübergehenden Tiefs,
          die in jedem Job vorkommen können, und einer grundlegenden,
          anhaltenden Unzufriedenheit. Stelle dir folgende Fragen:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Hält deine Unzufriedenheit bereits länger als sechs Monate an?
          </li>
          <li style={styles.content.listItem}>
            Kannst du konkrete Auslöser identifizieren, die sich verändern
            lassen?
          </li>
          <li style={styles.content.listItem}>
            Überwiegen negative Gefühle, wenn du an deine Arbeit denkst?
          </li>
        </ul>

        <H3>Fehlende Entwicklungs- und Aufstiegsperspektiven</H3>
        <p style={styles.content.paragraph}>
          Karrierestillstand ist ein weiteres deutliches Warnzeichen. Wenn du
          das Gefühl hast, dass deine berufliche Entwicklung stagniert, du keine
          neuen Fähigkeiten mehr erwirbst oder keine Perspektive für berufliches
          Wachstum siehst, könnte es Zeit für eine Veränderung sein.
        </p>

        <p style={styles.content.paragraph}>
          Die folgenden Anzeichen deuten auf mangelnde Entwicklungsperspektiven
          hin:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Weiterbildungsanträge werden regelmäßig abgelehnt
          </li>
          <li style={styles.content.listItem}>
            Du übernimmst seit langem keine neuen, herausfordernden Aufgaben
            mehr
          </li>
          <li style={styles.content.listItem}>
            Beförderungen gehen systematisch an dir vorbei
          </li>
          <li style={styles.content.listItem}>
            Dein Feedback wird ignoriert oder nicht wertgeschätzt
          </li>
        </ul>

        <H3>Vergütung und Wertschätzung unter Marktniveau</H3>
        <p style={styles.content.paragraph}>
          Eine faire Vergütung ist ein wichtiger Aspekt der beruflichen
          Zufriedenheit. Wenn dein Gehalt deutlich unter dem Marktdurchschnitt
          liegt und Gehaltsverhandlungen wiederholt erfolglos bleiben, kann dies
          ein legitimer Grund für einen Wechsel sein. Gleiches gilt für
          mangelnde Wertschätzung deiner Arbeit und deines Engagements.
        </p>

        <p style={styles.content.paragraph}>Achte auf diese Warnzeichen:</p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Dein Gehalt stagniert über mehrere Jahre trotz guter Leistungen
          </li>
          <li style={styles.content.listItem}>
            Neue Mitarbeiter in vergleichbaren Positionen verdienen deutlich
            mehr
          </li>
          <li style={styles.content.listItem}>
            Deine Erfolge werden nicht anerkannt oder anderen zugeschrieben
          </li>
          <li style={styles.content.listItem}>
            Es fehlt an positivem Feedback für deine Leistungen
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Recherchiere regelmäßig Gehaltsreports für deine Position und
            Branche, um deine Vergütung realistisch einschätzen zu können. Tools
            wie Glassdoor, Kununu oder spezialisierte Gehaltsreports bieten gute
            Orientierung.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Neue Entscheidungsfaktoren im Homeoffice-Zeitalter</H2>
        <p style={styles.content.paragraph}>
          Die flächendeckende Einführung von Homeoffice und hybriden
          Arbeitsmodellen hat neue Faktoren ins Spiel gebracht, die bei der
          Entscheidung für oder gegen einen Jobwechsel berücksichtigt werden
          sollten. Die Möglichkeit, remote zu arbeiten, ist für viele zu einem
          entscheidenden Kriterium geworden.
        </p>

        <H3>Unvereinbarkeit mit deinen Homeoffice-Präferenzen</H3>
        <p style={styles.content.paragraph}>
          Ein zentraler Aspekt ist die Übereinstimmung zwischen deinen
          Präferenzen zur Arbeitsweise und den Möglichkeiten, die dein
          Arbeitgeber bietet. Hier können verschiedene Konstellationen zu
          Unzufriedenheit führen:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Rückruf ins Büro trotz erfolgreicher Remote-Arbeit:</strong>{" "}
            Wenn dein Unternehmen nach der Pandemie wieder vollständige Präsenz
            fordert, obwohl du im Homeoffice produktiver und zufriedener
            arbeitest, kann dies ein legitimer Grund zum Wechseln sein.
          </li>
          <li style={styles.content.listItem}>
            <strong>Fehlende Flexibilität im hybriden Modell:</strong> Starre
            Vorgaben, wann genau du im Büro sein musst, ohne Rücksicht auf deine
            persönlichen Umstände oder Aufgabenanforderungen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Zu viel Isolation im Vollzeit-Homeoffice:</strong> Umgekehrt
            kann auch ein rein virtuelles Setup ohne Möglichkeit zum
            persönlichen Austausch problematisch sein, wenn du mehr
            Kollaboration und persönlichen Kontakt wünschst.
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Die Präferenzen sind hier individuell sehr unterschiedlich –
          entscheidend ist, ob dein Arbeitgeber ein Modell bietet, das zu deinen
          persönlichen Bedürfnissen und deiner optimalen Arbeitsweise passt.
        </p>

        <H3>Digitale Infrastruktur und Remote-Führungskultur</H3>
        <p style={styles.content.paragraph}>
          Ein weiterer wichtiger Faktor ist die Qualität der digitalen
          Infrastruktur und die Fähigkeit des Unternehmens, Teams auch auf
          Distanz effektiv zu führen und zu unterstützen.
        </p>

        <p style={styles.content.paragraph}>
          Diese Warnzeichen deuten auf Probleme hin:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Veraltete oder unzureichende digitale Tools, die effizientes
            Arbeiten im Homeoffice behindern
          </li>
          <li style={styles.content.listItem}>
            Mangelndes Vertrauen und übermäßige Kontrolle durch Vorgesetzte bei
            Remote-Arbeit
          </li>
          <li style={styles.content.listItem}>
            Fehlende klare Kommunikationsstrukturen für virtuelle Zusammenarbeit
          </li>
          <li style={styles.content.listItem}>
            "Meeting-Overload" als Ersatz für echte Zusammenarbeit im Homeoffice
          </li>
          <li style={styles.content.listItem}>
            Schlechtere Karrierechancen für Mitarbeiter, die häufig remote
            arbeiten ("Proximity Bias")
          </li>
        </ul>

        <H3>Work-Life-Balance und Entgrenzung im Homeoffice</H3>
        <p style={styles.content.paragraph}>
          Die Arbeit im Homeoffice kann die Work-Life-Balance sowohl verbessern
          als auch verschlechtern. Wenn du feststellst, dass die Grenzen
          zwischen Arbeit und Privatleben zunehmend verschwimmen und dein
          Arbeitgeber diese Problematik nicht ernst nimmt, könnte dies ein Grund
          zum Wechseln sein.
        </p>

        <p style={styles.content.paragraph}>
          Achte auf diese problematischen Anzeichen:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Erwartungen ständiger Erreichbarkeit weit über die reguläre
            Arbeitszeit hinaus
          </li>
          <li style={styles.content.listItem}>
            Zunehmende Arbeitsbelastung ohne Anpassung der Ressourcen oder
            Fristen
          </li>
          <li style={styles.content.listItem}>
            Fehlen einer Unternehmenskultur, die Pausen und Abschalten aktiv
            fördert
          </li>
          <li style={styles.content.listItem}>
            Missachtung gesetzlicher Ruhezeiten bei der Terminplanung oder
            Aufgabenverteilung
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Laut einer Studie des Fraunhofer-Instituts für Arbeitswirtschaft und
            Organisation (IAO) arbeiten etwa 45% der Beschäftigten im Homeoffice
            länger als im Büro. Wenn du regelmäßig Überstunden machst, die weder
            vergütet noch wertgeschätzt werden, ist dies ein deutliches
            Warnsignal.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Der Einfluss der Unternehmenskultur und des Teamklimas</H2>
        <p style={styles.content.paragraph}>
          Die Unternehmenskultur und das Klima im Team haben einen enormen
          Einfluss auf unsere Arbeitszufriedenheit. Toxische Arbeitsumgebungen
          sind einer der häufigsten Gründe für Kündigungen – und im Homeoffice
          können sich bestimmte Probleme sogar noch verstärken.
        </p>

        <H3>Anzeichen für ein toxisches Arbeitsumfeld</H3>
        <p style={styles.content.paragraph}>
          Ein toxisches Arbeitsumfeld kann sich auf verschiedene Arten
          manifestieren:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Mangelnde Wertschätzung:</strong> Deine Beiträge werden
            systematisch ignoriert oder heruntergespielt
          </li>
          <li style={styles.content.listItem}>
            <strong>Mobbing und Ausgrenzung:</strong> Auch digital können
            Ausgrenzung und Schikane stattfinden, etwa durch Ausschluss von
            wichtigen Kommunikationswegen
          </li>
          <li style={styles.content.listItem}>
            <strong>Ständige Kritik ohne konstruktives Feedback:</strong> Du
            erhältst überwiegend negative Rückmeldungen ohne
            Verbesserungsvorschläge
          </li>
          <li style={styles.content.listItem}>
            <strong>Schuldzuweisungen statt Lösungsorientierung:</strong> Bei
            Problemen wird nach Schuldigen gesucht statt nach Lösungen
          </li>
          <li style={styles.content.listItem}>
            <strong>Übermäßiger Wettbewerb:</strong> Kollegen werden
            gegeneinander ausgespielt statt zur Zusammenarbeit ermutigt
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Im Homeoffice können sich diese Probleme anders äußern – etwa durch
          systematischen Ausschluss von Informationen, fehlende Rückmeldungen
          oder das Ignorieren von digitalen Beiträgen. Die Grundmuster bleiben
          jedoch ähnlich.
        </p>

        <H3>Die Bedeutung sozialer Verbindungen im Remote-Kontext</H3>
        <p style={styles.content.paragraph}>
          Ein oft unterschätzter Aspekt der Arbeitszufriedenheit sind die
          sozialen Verbindungen zu Kollegen und im Team. Gerade bei
          überwiegender oder vollständiger Remote-Arbeit kann dieses Element
          leiden, was langfristig die Zufriedenheit und Bindung ans Unternehmen
          schwächt.
        </p>

        <p style={styles.content.paragraph}>
          Diese Anzeichen können auf Probleme hindeuten:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Fehlende Gelegenheiten zum informellen Austausch in virtuellen
            Settings
          </li>
          <li style={styles.content.listItem}>
            Keine oder nur sehr formelle Team-Events für Remote-Mitarbeiter
          </li>
          <li style={styles.content.listItem}>
            Zunehmende Entfremdung vom Team und Unternehmen
          </li>
          <li style={styles.content.listItem}>
            Das Gefühl, bei wichtigen Entscheidungen oder Informationen
            übergangen zu werden
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Wenn du merkst, dass die soziale Komponente deiner Arbeit
          kontinuierlich abnimmt und dies deine Zufriedenheit beeinträchtigt,
          kann dies ein legitimer Grund sein, nach einem Unternehmen mit
          besserer Remote-Kultur zu suchen.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Ein engagierter Arbeitgeber sollte aktiv in die Teamkultur im
            Homeoffice investieren: Virtuelle Kaffeepausen, informelle
            Video-Calls, hybride Teamevents und klare Kommunikationsstrukturen
            sind Anzeichen für eine gelungene Remote-Kultur.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Gesundheitliche Warnsignale ernst nehmen</H2>
        <p style={styles.content.paragraph}>
          Ein häufig unterschätzter, aber äußerst wichtiger Aspekt bei der
          Entscheidung über einen Jobwechsel ist der Einfluss der Arbeit auf
          deine physische und psychische Gesundheit. Wenn dein Job deine
          Gesundheit beeinträchtigt, ist dies ein ernstzunehmendes Warnsignal.
        </p>

        <H3>Körperliche Symptome durch Stress und ungesunde Arbeitsweisen</H3>
        <p style={styles.content.paragraph}>
          Insbesondere im Homeoffice können sich ungesunde Arbeitsgewohnheiten
          einschleichen, die langfristig zu körperlichen Beschwerden führen.
          Achte auf folgende Warnsignale:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Chronische Rücken-, Nacken- oder Kopfschmerzen durch ergonomisch
            schlechte Arbeitsplätze
          </li>
          <li style={styles.content.listItem}>
            Verschlechterung der Sehkraft durch übermäßige Bildschirmarbeit ohne
            ausreichende Pausen
          </li>
          <li style={styles.content.listItem}>
            Schlafstörungen, die in direktem Zusammenhang mit beruflichem Stress
            stehen
          </li>
          <li style={styles.content.listItem}>
            Verdauungsprobleme oder häufige Kopfschmerzen als Folge von
            Anspannung
          </li>
          <li style={styles.content.listItem}>
            Zunehmender Konsum von Koffein, Alkohol oder Medikamenten zur
            Stressbewältigung
          </li>
        </ul>

        <H3>Psychische Belastungen und Burnout-Gefahr erkennen</H3>
        <p style={styles.content.paragraph}>
          Noch kritischer können sich psychische Belastungen durch den Job
          auswirken. Diese verdienen besondere Aufmerksamkeit, da sie sich oft
          schleichend entwickeln. Warnzeichen können sein:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Anhaltende Erschöpfung, die sich durch normale Erholung nicht
            bessert
          </li>
          <li style={styles.content.listItem}>
            Zunehmende emotionale Distanzierung von der Arbeit und den Kollegen
          </li>
          <li style={styles.content.listItem}>
            Gefühle von Ineffektivität trotz hohen Arbeitseinsatzes
          </li>
          <li style={styles.content.listItem}>
            Zynismus gegenüber der eigenen Tätigkeit, dem Unternehmen oder den
            Kunden
          </li>
          <li style={styles.content.listItem}>
            Reizbarkeit und erhöhte Empfindlichkeit gegenüber Feedback
          </li>
          <li style={styles.content.listItem}>
            Verlust der Freude an Aktivitäten, die früher Spaß gemacht haben
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Im Homeoffice kann die Burnout-Gefahr besonders hoch sein, da die
          Grenzen zwischen Arbeit und Privatleben verschwimmen und Warnsignale
          von Kollegen oder Vorgesetzten oft weniger wahrgenommen werden.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Deine Gesundheit sollte immer Vorrang haben. Wenn du bemerkst, dass
            dein Job kontinuierlich deine körperliche oder psychische Gesundheit
            belastet und keine Verbesserung in Sicht ist, ist dies ein legitimer
            und wichtiger Grund für einen Wechsel – unabhängig von anderen
            beruflichen Faktoren.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Vor der Kündigung: Alternativen prüfen und vorbereiten</H2>
        <p style={styles.content.paragraph}>
          Bevor du die Entscheidung zur Kündigung triffst, lohnt es sich,
          mögliche Alternativen zu prüfen und deinen Absprung strategisch
          vorzubereiten. Eine übereilte Kündigung ohne Plan kann dich in eine
          schwierige Situation bringen.
        </p>

        <H3>Möglichkeiten zur Verbesserung der aktuellen Situation</H3>
        <p style={styles.content.paragraph}>
          In vielen Fällen gibt es Möglichkeiten, deine Arbeitszufriedenheit zu
          verbessern, ohne gleich zu kündigen:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Offenes Gespräch mit Vorgesetzten:</strong> Viele Probleme
            basieren auf mangelnder Kommunikation. Ein konstruktives Gespräch
            über deine Bedürfnisse und Erwartungen kann überraschende Lösungen
            hervorbringen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Verhandlung über Homeoffice-Regelungen:</strong> Wenn die
            aktuellen Remote-Work-Policies nicht zu deinen Bedürfnissen passen,
            lohnt sich ein Versuch, individuelle Regelungen zu vereinbaren.
          </li>
          <li style={styles.content.listItem}>
            <strong>Interne Stellenwechsel:</strong> In größeren Unternehmen
            besteht oft die Möglichkeit, in eine andere Abteilung oder ein
            anderes Team zu wechseln.
          </li>
          <li style={styles.content.listItem}>
            <strong>Weiterbildung anstoßen:</strong> Manchmal kann eine neue
            Qualifikation oder ein Projekt frischen Wind in den Job bringen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Teilzeitmodelle oder Sabbaticals:</strong> Bei Erschöpfung
            kann eine temporäre Reduzierung der Arbeitszeit helfen, wieder Kraft
            zu tanken.
          </li>
        </ul>

        <H3>Strategische Vorbereitung eines Jobwechsels</H3>
        <p style={styles.content.paragraph}>
          Wenn du zu dem Schluss kommst, dass ein Wechsel unvermeidbar ist,
          solltest du diesen sorgfältig vorbereiten. Ein überlegter Ausstieg ist
          besser als ein impulsiver:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Finanzielle Absicherung:</strong> Sorge für ausreichende
            finanzielle Reserven, um eine Übergangsphase oder Jobsuche zu
            überbrücken (idealerweise 3-6 Monatsgehälter)
          </li>
          <li style={styles.content.listItem}>
            <strong>Kompetenzanalyse:</strong> Mache dir klar, welche
            Fähigkeiten und Erfahrungen du mitbringst und welche für deinen
            nächsten Karriereschritt noch fehlen könnten
          </li>
          <li style={styles.content.listItem}>
            <strong>Bewerbungsunterlagen aktualisieren:</strong> Bringe deinen{" "}
            <a
              href={serializeRoute({
                kind: RouteKind.Blog,
                blogRoute: { kind: "lebenslauf-guide" },
              })}
              style={linkStyles}
            >
              Lebenslauf
            </a>{" "}
            auf den neuesten Stand, bevor du kündigst
          </li>
          <li style={styles.content.listItem}>
            <strong>Netzwerk aktivieren:</strong> Informiere diskret dein
            berufliches Netzwerk, dass du offen für neue Möglichkeiten bist
          </li>
          <li style={styles.content.listItem}>
            <strong>Referenzen sichern:</strong> Sorge dafür, dass du gute
            Referenzen und ein positives{" "}
            <a
              href={serializeRoute({
                kind: RouteKind.Blog,
                blogRoute: { kind: "arbeitszeugnis-verstehen" },
              })}
              style={linkStyles}
            >
              Arbeitszeugnis
            </a>{" "}
            erhältst
          </li>
          <li style={styles.content.listItem}>
            <strong>Arbeitsmarkt sondieren:</strong> Verschaffe dir einen
            Überblick über den aktuellen Arbeitsmarkt in deinem Bereich,
            insbesondere hinsichtlich Homeoffice-Optionen
          </li>
        </ul>

        <H3>Der richtige Zeitpunkt für die Kündigung</H3>
        <p style={styles.content.paragraph}>
          Das Timing einer Kündigung kann entscheidend sein. Folgende Faktoren
          solltest du berücksichtigen:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Wirtschaftliche Lage:</strong> In Krisenzeiten kann die
            Jobsuche länger dauern – die Sicherheit des bestehenden Jobs nicht
            leichtfertig aufgeben
          </li>
          <li style={styles.content.listItem}>
            <strong>Saisonale Einstellungszyklen:</strong> In manchen Branchen
            gibt es typische Einstellungsphasen (z.B. Frühjahr/Herbst)
          </li>
          <li style={styles.content.listItem}>
            <strong>Abschluss wichtiger Projekte:</strong> Aus Gründen der
            Professionalität wichtige Projekte zum Abschluss bringen
          </li>
          <li style={styles.content.listItem}>
            <strong>Boni und finanzielle Aspekte:</strong> Jahresboni,
            Urlaubsansprüche oder langfristige Vergütungskomponenten
            berücksichtigen
          </li>
          <li style={styles.content.listItem}>
            <strong>Persönliche Umstände:</strong> Familiäre Verpflichtungen,
            Wohnungssuche oder andere persönliche Faktoren einbeziehen
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Ein strategischer Ansatz: Beginne mit der Jobsuche, während du noch
            angestellt bist. So vermeidest du finanzielle Engpässe und kannst in
            Ruhe nach der wirklich passenden neuen Stelle suchen. Nutze den{" "}
            <a style={linkStyles} href="https://bewerbungshelfer.net">
              Bewerbungshelfer
            </a>{" "}
            um deine Bewerbungsunterlagen optimal auf neue Stellen zuzuschneiden
            – besonders wenn du gezielt nach Positionen mit attraktiven
            Homeoffice-Regelungen suchst.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>
          Homeoffice-Regelungen als Entscheidungsfaktor für den nächsten Job
        </H2>
        <p style={styles.content.paragraph}>
          Wenn du dich für einen Jobwechsel entschieden hast, werden die
          Homeoffice-Regelungen potenzieller neuer Arbeitgeber wahrscheinlich
          ein wichtiges Kriterium für dich sein. Hier gilt es, die Angebote
          sorgfältig zu prüfen und frühzeitig die richtigen Fragen zu stellen.
        </p>

        <H3>Was in Stellenanzeigen zu Remote-Arbeit beachten</H3>
        <p style={styles.content.paragraph}>
          Stellenanzeigen geben bereits wichtige Hinweise auf die
          Remote-Work-Kultur eines Unternehmens:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Konkrete vs. vage Angaben:</strong> "100% Remote möglich"
            oder "3 Tage Homeoffice pro Woche" sind klare Aussagen. Vorsicht bei
            vagen Formulierungen wie "Homeoffice möglich" oder "flexible
            Arbeitsorte"
          </li>
          <li style={styles.content.listItem}>
            <strong>Betriebliche Notwendigkeit:</strong> Formulierungen wie
            "Homeoffice nach betrieblicher Notwendigkeit" lassen viel
            Interpretationsspielraum für den Arbeitgeber
          </li>
          <li style={styles.content.listItem}>
            <strong>Technische Ausstattung:</strong> Hinweise auf
            bereitgestellte Technik für Homeoffice (Laptop, Monitore, Büromöbel)
            deuten auf eine etablierte Remote-Kultur hin
          </li>
          <li style={styles.content.listItem}>
            <strong>Erfahrung mit Remote-Teams:</strong> Unternehmen, die
            bereits vor 2020 mit verteilten Teams gearbeitet haben, verfügen
            meist über ausgereifte Remote-Konzepte
          </li>
        </ul>

        <H3>Kritische Fragen im Vorstellungsgespräch</H3>
        <p style={styles.content.paragraph}>
          Im Vorstellungsgespräch hast du die Chance, die Homeoffice-Realität
          genauer zu erkunden. Diese Fragen helfen dir, die tatsächliche
          Situation einzuschätzen:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            "Wie sieht die praktische Umsetzung der Homeoffice-Regelung aus?
            Gibt es feste Tage oder freie Wahl?"
          </li>
          <li style={styles.content.listItem}>
            "Wie wird die Zusammenarbeit zwischen Büro und Remote-Mitarbeitern
            gestaltet? Gibt es hybride Meeting-Setups?"
          </li>
          <li style={styles.content.listItem}>
            "Wie werden Leistungen von Remote-Mitarbeitern bewertet? Gibt es
            spezielle Prozesse für Feedback und Beurteilung?"
          </li>
          <li style={styles.content.listItem}>
            "Haben Homeoffice-Mitarbeiter die gleichen Karriere- und
            Entwicklungschancen wie Büromitarbeiter?"
          </li>
          <li style={styles.content.listItem}>
            "Wie unterstützt das Unternehmen die Einrichtung eines ergonomischen
            Homeoffice-Arbeitsplatzes?"
          </li>
          <li style={styles.content.listItem}>
            "Wie sieht die Kommunikationsstruktur im Remote-Setup aus? Welche
            Tools werden genutzt?"
          </li>
        </ul>

        <H3>Verhandlungstipps für optimale Homeoffice-Bedingungen</H3>
        <p style={styles.content.paragraph}>
          Wenn das Grundangebot stimmt, aber du spezifische Wünsche hast, lohnt
          sich eine Verhandlung:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Klare Prioritäten setzen:</strong> Überlege im Vorfeld,
            welche Aspekte der Homeoffice-Regelung für dich nicht verhandelbar
            sind
          </li>
          <li style={styles.content.listItem}>
            <strong>Probezeit für Remote-Arbeit:</strong> Schlage eine Testphase
            vor, in der du beweisen kannst, dass du auch remote produktiv
            arbeitest
          </li>
          <li style={styles.content.listItem}>
            <strong>Schriftliche Vereinbarung:</strong> Bestehe auf eine
            konkrete schriftliche Regelung im Arbeitsvertrag, nicht nur auf
            mündliche Zusagen
          </li>
          <li style={styles.content.listItem}>
            <strong>Kostenübernahme verhandeln:</strong> Sprich die Übernahme
            von Kosten für Internetanschluss, Büromöbel oder technische
            Ausstattung an
          </li>
          <li style={styles.content.listItem}>
            <strong>Vergütung ortsunabhängig gestalten:</strong> Achte darauf,
            dass dein Gehalt nicht niedriger ausfällt, weil du im Homeoffice
            arbeitest
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Tipp für die Recherche: Unternehmensbewertungsplattformen wie Kununu
            oder Glassdoor enthalten oft Erfahrungsberichte zu
            Homeoffice-Regelungen. Auch LinkedIn-Posts oder Xing-Beiträge von
            Mitarbeitern können wertvolle Einblicke in die tatsächliche
            Remote-Kultur geben.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Die professionelle Kündigung: Den Abschied richtig gestalten</H2>
        <p style={styles.content.paragraph}>
          Wenn die Entscheidung zur Kündigung gefallen ist, kommt es darauf an,
          den Abschied professionell zu gestalten. Ein souveräner Ausstieg
          hinterlässt einen positiven letzten Eindruck und hält dir Türen für
          die Zukunft offen.
        </p>

        <H3>Der korrekte formale Prozess</H3>
        <p style={styles.content.paragraph}>
          Die Kündigung sollte formal korrekt erfolgen, um Komplikationen zu
          vermeiden:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Schriftform einhalten:</strong> Die Kündigung muss
            schriftlich mit eigenhändiger Unterschrift erfolgen (E-Mail oder SMS
            sind nicht ausreichend)
          </li>
          <li style={styles.content.listItem}>
            <strong>Kündigungsfristen prüfen:</strong> Halte die im
            Arbeitsvertrag vereinbarten Fristen ein
          </li>
          <li style={styles.content.listItem}>
            <strong>Zugang sicherstellen:</strong> Sende die Kündigung per
            Einschreiben oder übergib sie persönlich gegen Empfangsbestätigung
          </li>
          <li style={styles.content.listItem}>
            <strong>Konkrete Angaben:</strong> Nenne das genaue Beendigungsdatum
            und verweise auf die einschlägige Kündigungsfrist
          </li>
          <li style={styles.content.listItem}>
            <strong>Sachlicher Ton:</strong> Verzichte auf Vorwürfe oder
            emotionale Begründungen im Kündigungsschreiben
          </li>
        </ul>

        <H3>Das persönliche Kündigungsgespräch gestalten</H3>
        <p style={styles.content.paragraph}>
          Vor der schriftlichen Kündigung steht idealerweise ein persönliches
          Gespräch mit dem Vorgesetzten:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Persönliches Gespräch suchen:</strong> Auch bei
            überwiegender Remote-Arbeit sollte das Kündigungsgespräch wenn
            möglich persönlich oder per Videocall stattfinden
          </li>
          <li style={styles.content.listItem}>
            <strong>Gut vorbereiten:</strong> Überlege dir vorab, was du sagen
            möchtest und wie du auf mögliche Gegenangebote reagierst
          </li>
          <li style={styles.content.listItem}>
            <strong>Positiver Grundton:</strong> Betone auch die positiven
            Aspekte deiner Beschäftigung und danke für die Zusammenarbeit
          </li>
          <li style={styles.content.listItem}>
            <strong>Konkrete, aber diplomatische Gründe:</strong> Benenne
            Hauptgründe für deinen Wechsel, ohne unnötig zu kritisieren
          </li>
          <li style={styles.content.listItem}>
            <strong>Fragen zum Übergabeprozess:</strong> Zeige Bereitschaft,
            einen reibungslosen Übergang zu unterstützen
          </li>
        </ul>

        <H3>Die letzten Wochen: Brücken intakt lassen</H3>
        <p style={styles.content.paragraph}>
          Die Art, wie du die letzten Wochen gestaltest, prägt den bleibenden
          Eindruck bei Kollegen und Vorgesetzten:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Professionelle Haltung bewahren:</strong> Arbeite bis zum
            letzten Tag mit vollem Einsatz
          </li>
          <li style={styles.content.listItem}>
            <strong>Gründliche Übergabe:</strong> Dokumentiere laufende Projekte
            und Prozesse sorgfältig für deine Nachfolger
          </li>
          <li style={styles.content.listItem}>
            <strong>Positives Feedback geben:</strong> Nutze die Gelegenheit,
            Kollegen und Vorgesetzten positives Feedback zu geben
          </li>
          <li style={styles.content.listItem}>
            <strong>Kontaktdaten austauschen:</strong> Pflege dein berufliches
            Netzwerk durch Austausch von Kontaktdaten mit wichtigen Kollegen
          </li>
          <li style={styles.content.listItem}>
            <strong>Fragen zu formalen Prozessen klären:</strong> Informiere
            dich über Rückgabe von Firmeneigentum, letzte Gehaltsabrechnung und
            Arbeitszeugniserstellung
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Ein professioneller Abschied zahlt sich aus: Laut Studien wechseln
            viele Arbeitnehmer im Laufe ihrer Karriere zu einem früheren
            Arbeitgeber zurück. Diese "Boomerang-Mitarbeiter" sind besonders
            wertvoll, da sie sowohl die Unternehmenskultur kennen als auch neue
            Perspektiven mitbringen. Halte dir diese Option durch einen
            souveränen Abgang offen.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>
          Fazit: Die richtige Balance zwischen Bleiben und Wechseln finden
        </H2>
        <p style={styles.content.paragraph}>
          Die Entscheidung, einen Job zu verlassen, gehört zu den schwierigsten
          beruflichen Weichenstellungen. Sie ist immer individuell und sollte
          weder überstürzt noch zu lange hinausgezögert werden. Besonders in
          Zeiten flexibler Arbeitsmodelle mit Homeoffice-Optionen haben sich die
          Entscheidungsfaktoren erweitert und verändert.
        </p>

        <p style={styles.content.paragraph}>
          Die wichtigsten Erkenntnisse im Überblick:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Auf Warnsignale achten:</strong> Anhaltende Unzufriedenheit,
            Stagnation, toxisches Umfeld und gesundheitliche Belastungen sind
            deutliche Anzeichen, dass ein Wechsel angebracht sein könnte
          </li>
          <li style={styles.content.listItem}>
            <strong>Homeoffice-Kompatibilität prüfen:</strong> Die Vereinbarkeit
            der Remote-Work-Kultur mit deinen Präferenzen ist heute ein
            zentraler Aspekt der Arbeitszufriedenheit
          </li>
          <li style={styles.content.listItem}>
            <strong>Alternativen ausloten:</strong> Vor der Kündigung solltest
            du Verbesserungsmöglichkeiten im bestehenden Job ausloten
          </li>
          <li style={styles.content.listItem}>
            <strong>Strategisch vorgehen:</strong> Ein geplanter Jobwechsel ist
            erfolgreicher als eine überstürzte Kündigung aus Frust
          </li>
          <li style={styles.content.listItem}>
            <strong>Professionell bleiben:</strong> Ein souveräner Abschied hält
            Türen offen und schützt deine Reputation
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Letztendlich geht es darum, einen Arbeitsplatz zu finden, der nicht
          nur fachlich, sondern auch in Bezug auf Arbeitsweise,
          Unternehmenskultur und Work-Life-Balance zu dir passt. Die zunehmende
          Flexibilisierung durch Homeoffice-Optionen bietet dabei neue Chancen,
          aber auch neue Herausforderungen.
        </p>

        <p style={styles.content.paragraph}>
          Wenn du dich für einen Wechsel entschieden hast, wird die nächste
          Herausforderung sein, den passenden neuen Job zu finden und dich
          überzeugend zu präsentieren. Ein{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "lebenslauf-guide" },
            })}
            style={linkStyles}
          >
            professioneller Lebenslauf
          </a>{" "}
          und ein{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "anschreiben-guide" },
            })}
            style={linkStyles}
          >
            überzeugendes Anschreiben
          </a>{" "}
          sind dabei entscheidende Werkzeuge, um den nächsten Karriereschritt
          erfolgreich zu gehen.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Der{" "}
            <a style={linkStyles} href="https://bewerbungshelfer.net">
              Bewerbungshelfer
            </a>{" "}
            unterstützt dich bei der Erstellung überzeugender
            Bewerbungsunterlagen für deine nächste berufliche Station. Gerade
            bei der gezielten Suche nach Positionen mit attraktiven
            Homeoffice-Regelungen hilft dir die KI-gestützte Analyse, deine
            Erfahrungen und Fähigkeiten optimal auf die jeweiligen Anforderungen
            abzustimmen. So erhöhst du deine Chancen auf einen Job, der nicht
            nur fachlich, sondern auch in der Arbeitsweise wirklich zu dir
            passt.
          </p>
        </div>
      </section>
    </>
  );
}
