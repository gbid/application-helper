import { styles } from "./shared";
import { H2 } from "./shared";
import { H3 } from "./shared";
import { linkStyles } from "./shared";
import { serializeRoute } from "../route";
import { RouteKind } from "../route";

export function AnschreibenVorlagen() {
  return (
    <>
      <section style={styles.content.section}>
        <p style={styles.content.paragraph}>
          Stell dir vor, du gehst zum Vorstellungsgespräch in ein Restaurant und
          bestellst mit "Sehr geehrte Damen und Herren, hiermit bestelle ich..."
          Absurd? Genau so klingen die meisten Anschreiben aus Vorlagen. Steif,
          unpersönlich und komplett deplatziert. Trotzdem greifen täglich
          tausende Bewerber zu Standard-Vorlagen - und verbauen sich damit ihre
          Chancen.
        </p>

        <p style={styles.content.paragraph}>
          Die Versuchung ist verständlich: Vorlagen versprechen Sicherheit. Sie
          suggerieren, dass es eine "richtige" Art gibt, ein Anschreiben zu
          formulieren. Doch genau wie im Restaurant führt diese formelle Distanz
          nur zu einem: Irritation auf der anderen Seite.
        </p>

        <div style={styles.content.note}>
          Kurz & Knapp: Ein überzeugendes Anschreiben ist wie ein gutes Gespräch
          - authentisch, relevant und auf Augenhöhe. Standard- Vorlagen dagegen
          sind wie auswendig gelernte Floskeln: Jeder erkennt sie, niemand mag
          sie.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Die drei größten Probleme mit Vorlagen</H2>
        <p style={styles.content.paragraph}>
          Warum Vorlagen mehr schaden als nutzen, wird besonders deutlich, wenn
          wir uns anschauen, wie Personaler tatsächlich Bewerbungen lesen - und
          was dabei durch Standard-Formulierungen verloren geht.
        </p>

        <H3>1. Mangelnde Individualität</H3>
        <p style={styles.content.paragraph}>
          "Hiermit bewerbe ich mich auf die ausgeschriebene Position als..." -
          Wenn ein Personaler diesen Satz zum hundertsten Mal liest, überspringt
          er ihn automatisch. Schlimmer noch: Solche Standardfloskeln
          signalisieren, dass sich der Bewerber keine besondere Mühe gegeben
          hat. Das ist wie eine Geburtstagskarte, bei der nur die Namen
          ausgetauscht wurden.
        </p>

        <H3>2. Veraltete Floskeln</H3>
        <p style={styles.content.paragraph}>
          "Ich bin teamfähig, belastbar und kommunikationsstark" - diese und
          ähnliche Formulierungen aus Vorlagen sind nicht nur abgedroschen, sie
          sind auch inhaltsleer. Niemand würde von sich behaupten, nicht
          teamfähig zu sein. Ohne konkrete Beispiele und Kontext sind solche
          Aussagen wertlos.
        </p>

        <div style={styles.content.note}>
          Besonders problematisch: Viele Vorlagen stammen noch aus einer Zeit,
          als Bewerbungen ganz anders gelesen wurden. Heute scannen Personaler
          Anschreiben in Sekunden - da muss jeder Satz einen echten Mehrwert
          bieten.
        </div>

        <H3>3. Fehlende Authentizität</H3>
        <p style={styles.content.paragraph}>
          Der größte Schaden entsteht durch den förmlichen "Bewerbungston", den
          Vorlagen vermitteln. "Über eine Einladung zu einem persönlichen
          Gespräch würde ich mich sehr freuen" - niemand spricht so. Diese
          künstliche Förmlichkeit schafft Distanz, genau wenn du eigentlich eine
          Verbindung aufbauen willst.
        </p>

        <p style={styles.content.paragraph}>
          Ein reales Beispiel: Eine Bewerberin für eine Marketing-Position
          schrieb statt der üblichen Floskel: "Ich würde mich freuen, Ihnen in
          einem Gespräch zu zeigen, wie meine Erfahrung im Content Marketing Ihr
          Team verstärken könnte." Der Unterschied? Sie klingt wie ein echter
          Mensch, der etwas Konkretes beizutragen hat.
        </p>
      </section>

      <section style={styles.content.section}>
        <H2>Was Personaler wirklich sehen wollen</H2>
        <p style={styles.content.paragraph}>
          Um zu verstehen, warum Vorlagen so kontraproduktiv sind, hilft ein
          Blick auf die andere Seite des Schreibtisches. Was geht Personalern
          durch den Kopf, wenn sie Bewerbungen lesen?
        </p>

        <H3>Echte Motivation statt Standardphrasen</H3>
        <p style={styles.content.paragraph}>
          "Bereits seit längerem verfolge ich die Entwicklung Ihres Unternehmens
          mit großem Interesse" - diese Standardfloskel aus Vorlagen lässt jeden
          Personaler innerlich die Augen verdrehen. Stattdessen wollen sie
          wissen: Was genau reizt dich an dieser Position? Warum passt sie in
          deine Karriereplanung? Ein konkretes Beispiel macht den Unterschied:
        </p>

        <div style={styles.content.note}>
          ❌ "Mit großem Interesse habe ich Ihre Stellenanzeige gelesen..."
          <br />✅ "Ihre Stellenausschreibung hat mich besonders angesprochen,
          weil sie exakt die Projektmanagement-Erfahrung sucht, die ich in den
          letzten drei Jahren aufgebaut habe."
        </div>

        <H3>Relevante Qualifikationen im Kontext</H3>
        <p style={styles.content.paragraph}>
          Personaler suchen nach der Verbindung zwischen deinen Erfahrungen und
          den Anforderungen der Stelle. Standard-Vorlagen listen oft wahllos
          Fähigkeiten auf, statt diese Verbindung herzustellen. Ein Beispiel aus
          der Praxis:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            ❌ "Zu meinen Stärken zählen Teamfähigkeit und selbstständiges
            Arbeiten."
          </li>
          <li style={styles.content.listItem}>
            ✅ "In meiner aktuellen Position koordiniere ich drei Teams an
            verschiedenen Standorten und habe dabei gelernt, sowohl
            eigenverantwortlich Entscheidungen zu treffen als auch eng mit
            anderen zusammenzuarbeiten."
          </li>
        </ul>

        <H3>Persönlichkeit zeigen</H3>
        <p style={styles.content.paragraph}>
          Ein gutes Anschreiben gibt einen Einblick in deine Persönlichkeit.
          Nicht durch Phrasen wie "Ich bin eine aufgeschlossene Persönlichkeit",
          sondern durch deinen authentischen Schreibstil und die Art, wie du
          deine Erfahrungen und Motivation beschreibst. Vorlagen hingegen
          verwischen jede Individualität unter einer Schicht von Formalität.
        </p>
      </section>
      <section style={styles.content.section}>
        <H2>Die psychologische Falle der Vorlagen</H2>
        <p style={styles.content.paragraph}>
          Warum greifen so viele Bewerber trotz der offensichtlichen Nachteile
          zu Vorlagen? Die Antwort liegt in unserer Psychologie: Bewerbungen
          machen unsicher. Vorlagen versprechen einen "garantiert richtigen" Weg
          - und führen damit in eine gefährliche Falle.
        </p>

        <H3>Die Suche nach dem "perfekten" Anschreiben</H3>
        <p style={styles.content.paragraph}>
          Viele Bewerber glauben, es gäbe eine geheime Formel für das perfekte
          Anschreiben. Diese Denkweise führt zu zwei Problemen: Erstens
          verlieren sie ihre authentische Stimme, und zweitens übersehen sie,
          dass jede Stelle andere Anforderungen hat. Was bei einer Bank
          überzeugt, kann im Start-up deplatziert wirken.
        </p>

        <H3>Der "Ich muss formal klingen"-Irrtum</H3>
        <p style={styles.content.paragraph}>
          "Ein Anschreiben muss förmlich sein" - dieser weit verbreitete
          Irrglaube führt zu gestelzten Formulierungen, die niemand ernst nimmt.
          Professionalität bedeutet nicht, wie ein Behördenbrief aus den 80er
          Jahren zu klingen. Sie zeigt sich in klarer, präziser Kommunikation
          auf Augenhöhe.
        </p>

        <div style={styles.content.note}>
          Denk daran: Der Personaler auf der anderen Seite ist auch nur ein
          Mensch. Er sucht keine wandelnde Vorlage, sondern einen echten
          Menschen, der zum Team und zur Position passt.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Der bessere Weg: Authentisch und überzeugend schreiben</H2>
        <p style={styles.content.paragraph}>
          Statt nach der perfekten Vorlage zu suchen, konzentriere dich darauf,
          deine Geschichte überzeugend zu erzählen. Hier ist ein strukturierter
          Ansatz, der wirklich funktioniert:
        </p>

        <H3>1. Die richtige Vorbereitung</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Analysiere die Stelle:</strong> Was sind die wichtigsten
            Anforderungen? Was reizt dich daran wirklich?
          </li>
          <li style={styles.content.listItem}>
            <strong>Sammle deine Erfahrungen:</strong> Welche konkreten
            Beispiele zeigen, dass du diese Anforderungen erfüllst?
          </li>
          <li style={styles.content.listItem}>
            <strong>Recherchiere das Unternehmen:</strong> Was macht es
            besonders? Warum passt es zu dir?
          </li>
        </ul>

        <H3>2. Der überzeugende Aufbau</H3>
        <p style={styles.content.paragraph}>
          Ein wirksames Anschreiben folgt einer klaren Struktur, aber ohne
          Floskeln. Ein Beispiel für den Einstieg:
        </p>

        <div style={styles.content.note}>
          ❌ "Hiermit bewerbe ich mich auf die ausgeschriebene Stelle..."
          <br />✅ "Meine fünfjährige Erfahrung im Produktmanagement und meine
          Begeisterung für innovative Tech-Lösungen machen mich zu einem starken
          Kandidaten für die Position als Senior Product Manager."
        </div>

        <p style={styles.content.paragraph}>
          Der Unterschied? Der zweite Einstieg kommt sofort zur Sache und zeigt,
          was du zu bieten hast. Er klingt nach einem selbstbewussten Profi,
          nicht nach einer Vorlage.
        </p>

        <H3>3. Moderne Unterstützung nutzen</H3>
        <p style={styles.content.paragraph}>
          Die Alternative zu veralteten Vorlagen liegt in moderneren Ansätzen.
          Besonders{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "ki-nutzung" },
            })}
            style={linkStyles}
          >
            KI-gestützte Werkzeuge
          </a>{" "}
          können heute dabei helfen, ein wirklich individuelles Anschreiben zu
          erstellen. Der{" "}
          <a style={linkStyles} href="https://bewerbungshelfer.net">
            Bewerbungshelfer
          </a>{" "}
          analysiert die Stellenanzeige und deine Qualifikationen und hilft dir,
          die relevanten Verbindungen überzeugend darzustellen - ohne
          Standardfloskeln, dafür mit echtem Inhalt.
        </p>
      </section>

      <section style={styles.content.section}>
        <H2>Fazit: Authentisch statt austauschbar</H2>
        <p style={styles.content.paragraph}>
          Die Zeiten der Standard-Vorlagen sind vorbei. Ein erfolgreiches
          Anschreiben zeigt heute deine individuellen Stärken und deine echte
          Motivation - formuliert in deinen eigenen, professionellen Worten.
        </p>

        <p style={styles.content.paragraph}>
          Der Aufwand, ein individuelles Anschreiben zu erstellen, lohnt sich:
          Du präsentierst dich als der Profi, der du bist, statt als eine
          weitere "Sehr geehrte Damen und Herren"-Bewerbung im Stapel. Übrigens
          gilt das gleiche Prinzip auch für den Lebenslauf -{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "lebenslauf-vorlagen" },
            })}
            style={linkStyles}
          >
            auch dort schaden Standardvorlagen mehr als sie nutzen
          </a>
          . Nutze stattdessen moderne Tools, um deinen individuellen Stil zu
          finden - aber bleib dabei immer authentisch.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Stell dir vor, du wärst der Personaler: Würdest du lieber ein
            Gespräch mit jemandem führen, der auswendig gelernte Floskeln
            aufsagt - oder mit einem echten Menschen, der weiß, was er kann und
            warum er zum Unternehmen passt?
          </p>
        </div>
      </section>
    </>
  );
}
