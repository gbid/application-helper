import { styles } from "./shared";
import { H2 } from "./shared";
import { H3 } from "./shared";
import { linkStyles } from "./shared";
import { serializeRoute } from "../route";
import { RouteKind } from "../route";

export function HobbysLebenslauf() {
  return (
    <>
      <section style={styles.content.section}>
        <p style={styles.content.paragraph}>
          Du organisierst das jährliche Familien-Grillfest? Koordinierst den
          Spielplan deiner Fußballmannschaft? Führst einen Gaming-Discord mit
          200 Mitgliedern? Gratulation - du hast gerade Projekt-, Team- und
          Kommunikationserfahrung bewiesen. Und genau darum geht es bei Hobbys
          im Lebenslauf.
        </p>

        <p style={styles.content.paragraph}>
          Denn Personaler interessieren sich nicht dafür, wie du deine Freizeit
          verbringst - sie suchen nach Hinweisen auf Kompetenzen, Engagement und
          Persönlichkeit. Die Kunst liegt darin, diese Verbindung für sie
          sichtbar zu machen. Ein gut gewähltes und clever präsentiertes Hobby
          kann der Türöffner für dein nächstes Vorstellungsgespräch sein.
        </p>

        <p style={styles.content.paragraph}>
          Wo genau du deine Hobbys platzierst und wie viel Raum sie im{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "lebenslauf-guide" },
            })}
            style={linkStyles}
          >
            perfekten Lebenslauf
          </a>{" "}
          einnehmen sollten, hängt von deiner individuellen Situation ab.
        </p>

        <div style={styles.content.note}>
          Kurz & Knapp: Hobbys im Lebenslauf sind keine Lückenfüller, sondern
          strategische Chancen, deine Fähigkeiten und Persönlichkeit zu
          demonstrieren - wenn du sie richtig einsetzt.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>
          Die strategische Entscheidung: Welche Hobbys gehören in den
          Lebenslauf?
        </H2>
        <p style={styles.content.paragraph}>
          Die erste Frage ist nicht, welche Hobbys du listen solltest, sondern
          ob überhaupt. Die Antwort hängt von mehreren Faktoren ab - und von der
          Fähigkeit, echten Mehrwert zu zeigen.
        </p>

        <H3>Wann Hobbys Sinn machen</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Berufseinsteiger:</strong> Ohne lange Berufserfahrung können
            Hobbys wertvolle Soft Skills belegen
          </li>
          <li style={styles.content.listItem}>
            <strong>Quereinsteiger:</strong> Freizeitaktivitäten können
            relevante Kompetenzen für die neue Branche zeigen
          </li>
          <li style={styles.content.listItem}>
            <strong>Kreativberufe:</strong> Hier sind passende Hobbys oft sogar
            erwünscht und unterstreichen dein Profil
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Gerade für Berufseinsteiger sind gut präsentierte Hobbys oft
          erfolgsentscheidend. Wie du als Berufseinsteiger auch in anderen
          Bereichen deines Lebenslaufs punkten kannst, zeigen wir dir in unserem{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "berufseinsteiger" },
            })}
            style={linkStyles}
          >
            speziellen Artikel für Berufseinsteiger
          </a>
          .
        </p>

        <H3>Branchenspezifische Unterschiede</H3>
        <p style={styles.content.paragraph}>
          Je nach Branche und Position variiert die Bedeutung von
          Freizeitaktivitäten erheblich. Besonders bei internationalen
          Bewerbungen musst du kulturelle Unterschiede beachten - mehr dazu in
          unserem Artikel zum{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "lebenslauf-englisch" },
            })}
            style={linkStyles}
          >
            englischen Lebenslauf
          </a>
          . Für den deutschen Markt gilt:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Kreativ- und Medienbranche:</strong> Hobbys zeigen
            Kreativität und kulturelles Interesse - sehr wichtig
          </li>
          <li style={styles.content.listItem}>
            <strong>Konservative Branchen:</strong> Weniger ist mehr, aber
            gezielt eingesetzte Aktivitäten können Leadership zeigen
          </li>
          <li style={styles.content.listItem}>
            <strong>IT und Tech:</strong> Relevante Side Projects oder
            Tech-Hobbys können echte Pluspunkte sein
          </li>
        </ul>

        <div style={styles.content.note}>
          Ein Beispiel: Ein Bewerber für eine Projektmanagement-Position
          erwähnte seine Rolle als Raid-Leader in einem Online-Game. Klingt
          erstmal seltsam? Nicht wenn man es richtig formuliert: "Koordination
          eines 25-köpfigen internationalen Teams bei komplexen, zeitkritischen
          Herausforderungen" - plötzlich wird daraus relevante
          Führungserfahrung.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Hobbys richtig präsentieren</H2>
        <p style={styles.content.paragraph}>
          Der Unterschied zwischen einem belanglosen Hobby und einem
          überzeugenden Pluspunkt liegt oft nur in der Präsentation. Die Kunst
          ist es, die versteckten Kompetenzen sichtbar zu machen.
        </p>

        <H3>Von der Aktivität zur Kompetenz</H3>
        <p style={styles.content.paragraph}>
          Hier einige Beispiele, wie du Freizeitaktivitäten in relevante
          Kompetenzen übersetzt. Vermeide dabei die üblichen Floskeln aus{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "lebenslauf-vorlagen" },
            })}
            style={linkStyles}
          >
            Standard-Lebenslaufvorlagen
          </a>
          , die Hobbys oft nur oberflächlich behandeln:
        </p>

        <H3>Die richtige Balance</H3>
        <p style={styles.content.paragraph}>
          Drei bis fünf gut präsentierte Aktivitäten reichen völlig. Dabei gilt:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Aktiv vor passiv:</strong> "Marathon-Finisher" schlägt
            "Interesse an Sport"
          </li>
          <li style={styles.content.listItem}>
            <strong>Spezifisch vor allgemein:</strong> "Organisation des
            jährlichen Vereinsturniers" statt "Vereinsarbeit"
          </li>
          <li style={styles.content.listItem}>
            <strong>Relevant vor vollständig:</strong> Nicht alle Hobbys müssen
            rein - nur die, die etwas Wichtiges über dich aussagen
          </li>
        </ul>

        <div style={styles.content.note}>
          Achte darauf, dass du zu jedem genannten Hobby auch wirklich etwas
          erzählen kannst. Im Vorstellungsgespräch sind gut präsentierte
          Freizeitaktivitäten oft ein willkommener Gesprächseinstieg.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Die No-Go Liste: Was besser weggelassen wird</H2>
        <p style={styles.content.paragraph}>
          Nicht jedes Hobby gehört in den Lebenslauf. Manche Freizeitaktivitäten
          können sogar kontraproduktiv sein - hier erfährst du, was du besser
          weglässt.
        </p>

        <H3>Zu generische Angaben</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>"Lesen, Reisen, Sport":</strong> Der Klassiker unter den
            Hobby-Floskeln. Ohne konkrete Details völlig aussagelos.
          </li>
          <li style={styles.content.listItem}>
            <strong>"Freunde treffen":</strong> Soziale Kompetenz zeigst du
            besser durch konkrete Aktivitäten.
          </li>
          <li style={styles.content.listItem}>
            <strong>"Musik hören":</strong> Passive Konsumaktivitäten sagen
            nichts über deine Fähigkeiten aus.
          </li>
        </ul>

        <H3>Sensible Themen richtig einschätzen</H3>
        <p style={styles.content.paragraph}>
          Bei bestimmten Aktivitäten kommt es stark auf den Kontext und die Art
          der Präsentation an. Hier ist besonders wichtig, die relevanten
          Kompetenzen in den Vordergrund zu stellen:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Politisches Engagement:</strong> Eine Führungsposition in
            einer Partei-Jugendorganisation zeigt wertvolle
            Leadership-Erfahrung. Fokussiere auf die übertragbaren Kompetenzen
            wie Projektmanagement, Teamführung oder Public Speaking - nicht auf
            politische Inhalte.
          </li>
          <li style={styles.content.listItem}>
            <strong>Soziales Engagement:</strong> Ob in religiösen oder anderen
            Organisationen - die Mitarbeit in sozialen Projekten demonstriert
            Soft Skills und Teamfähigkeit. Der organisatorische Rahmen ist dabei
            zweitrangig.
          </li>
        </ul>

        <div style={styles.content.note}>
          Entscheidend ist nicht die Art der Aktivität, sondern ihre Relevanz
          für die angestrebte Position und die professionelle Präsentation der
          dabei erworbenen Kompetenzen.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Branchenspezifische Chancen nutzen</H2>
        <p style={styles.content.paragraph}>
          Je nach Branche und Position können unterschiedliche Hobbys besonders
          wertvoll sein. Hier erfährst du, wie du deine Freizeitaktivitäten
          optimal auf deinen Zielberuf abstimmst.
        </p>

        <H3>Kreativberufe & Marketing</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Content Creation:</strong> "Betreibe eigenen Lifestyle-Blog
            mit 5.000 monatlichen Lesern"
          </li>
          <li style={styles.content.listItem}>
            <strong>Social Media:</strong> "Instagram-Account zu nachhaltiger
            Mode mit 10k+ Followern"
          </li>
          <li style={styles.content.listItem}>
            <strong>Design:</strong> "Ehrenamtliche Gestaltung von
            Vereinspublikationen und Event-Materialien"
          </li>
        </ul>

        <H3>IT & Technische Berufe</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Coding:</strong> "Entwicklung von Open-Source-Tools für die
            WordPress-Community"
          </li>
          <li style={styles.content.listItem}>
            <strong>Hardware:</strong> "Restaurierung und Modding klassischer
            Gaming-Konsolen"
          </li>
          <li style={styles.content.listItem}>
            <strong>Problemlösung:</strong> "Organisation von lokalen
            Coding-Workshops für Jugendliche"
          </li>
        </ul>

        <H3>Management & Leadership</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Vereinsarbeit:</strong> "Vorstandsmitglied im Sportverein
            mit 300 Mitgliedern"
          </li>
          <li style={styles.content.listItem}>
            <strong>Event-Management:</strong> "Organisation des jährlichen
            Stadtfests mit 50+ Ehrenamtlichen"
          </li>
          <li style={styles.content.listItem}>
            <strong>Teamleitung:</strong> "Leitung der Jugendfeuerwehr mit
            Verantwortung für Ausbildung und Teambuilding"
          </li>
        </ul>
      </section>

      <section style={styles.content.section}>
        <H2>Der Authentizitäts-Check</H2>
        <p style={styles.content.paragraph}>
          Strategische Präsentation ist wichtig - aber sie muss authentisch
          bleiben. Denn spätestens im Vorstellungsgespräch fliegt jede
          Übertreibung auf. Der Trick liegt darin, deine echten Interessen so zu
          präsentieren, dass ihre Relevanz deutlich wird.
        </p>

        <H3>Die richtige Balance finden</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Ehrlich bleiben:</strong> Wähle nur Hobbys, zu denen du
            wirklich etwas erzählen kannst. Ein authentisches Gespräch über dein
            "kleines" Hobby ist besser als eine aufgeblasene Beschreibung einer
            vermeintlich beeindruckenderen Aktivität.
          </li>
          <li style={styles.content.listItem}>
            <strong>Aktualität prüfen:</strong> Wenn du eine Aktivität seit
            Jahren nicht mehr ausübst, gehört sie nicht in den aktuellen
            Lebenslauf - auch wenn sie gut klingen würde.
          </li>
          <li style={styles.content.listItem}>
            <strong>Tiefe zeigen:</strong> Echtes Engagement zeigt sich in
            Details. Statt oberflächlicher Schlagworte beschreibe konkrete
            Aspekte deiner Aktivität, die dich begeistern.
          </li>
        </ul>

        <H3>Professionelle Unterstützung nutzen</H3>
        <p style={styles.content.paragraph}>
          Der{" "}
          <a style={linkStyles} href="https://bewerbungshelfer.net">
            Bewerbungshelfer
          </a>{" "}
          unterstützt dich dabei, die Balance zwischen strategischer
          Präsentation und Authentizität zu finden. Die KI hilft dir, die
          wirklich relevanten Aspekte deiner Hobbys zu erkennen und
          professionell zu formulieren - ohne dabei gekünstelt zu wirken.
        </p>

        <H3>Dein Authentizitäts-Check</H3>
        <p style={styles.content.paragraph}>
          Prüfe jedes Hobby, das du in deinen Lebenslauf aufnehmen möchtest,
          anhand dieser Kriterien:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            ✓ Könntest du spontan 5 Minuten frei darüber sprechen?
          </li>
          <li style={styles.content.listItem}>
            ✓ Hast du in den letzten 6 Monaten Zeit damit verbracht?
          </li>
          <li style={styles.content.listItem}>
            ✓ Kannst du konkrete Beispiele für dein Engagement nennen?
          </li>
          <li style={styles.content.listItem}>
            ✓ Siehst du selbst die Verbindung zur angestrebten Position?
          </li>
          <li style={styles.content.listItem}>
            ✓ Würden Freunde dich mit diesem Hobby in Verbindung bringen?
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Eine überzeugende Präsentation deiner Hobbys bedeutet nicht, etwas
            vorzugeben, was nicht da ist. Es geht darum, die wertvollen
            Erfahrungen und Kompetenzen sichtbar zu machen, die du durch deine
            authentischen Interessen bereits entwickelt hast. Denn genau diese
            Authentizität macht dich als Bewerber interessant.
          </p>
        </div>
      </section>
    </>
  );
}
