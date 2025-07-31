import { styles } from "./shared";
import { H2 } from "./shared";
import { H3 } from "./shared";
import { linkStyles } from "./shared";
import { serializeRoute } from "../route";
import { RouteKind } from "../route";

export function LebenslaufEnglisch() {
  return (
    <>
      <section style={styles.content.section}>
        <p style={styles.content.paragraph}>
          "My biggest strength is that I am a team player" - Wer seinen
          deutschen Lebenslauf einfach wortwörtlich übersetzt, landet schnell
          bei unfreiwilliger Komik. Denn beim englischen CV geht es nicht nur um
          Übersetzung, sondern um eine komplett andere Denkweise.
        </p>

        <p style={styles.content.paragraph}>
          Die internationale Bewerbung folgt eigenen Regeln, und diese
          unterscheiden sich je nach Zielland erheblich. Was in Deutschland als
          professionell gilt - wie du es in unserem{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "lebenslauf-guide" },
            })}
            style={linkStyles}
          >
            Guide zum deutschen Lebenslauf
          </a>{" "}
          findest - kann in den USA unpassend wirken - und umgekehrt. Der
          Unterschied zwischen einem erfolgreichen internationalen CV und einer
          peinlichen Übersetzung liegt oft in den Details.
        </p>

        <div style={styles.content.note}>
          Kurz & Knapp: Ein überzeugender englischer Lebenslauf ist mehr als die
          Übersetzung deines deutschen CVs. Er erfordert ein Verständnis
          kultureller Unterschiede, landestypischer Konventionen und
          professioneller Formulierungen.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Grundlegende Unterschiede verstehen</H2>
        <p style={styles.content.paragraph}>
          Bevor du mit der Übersetzung beginnst, ist es wichtig zu verstehen,
          dass es nicht "den einen" englischen Lebenslauf gibt. Die
          Anforderungen unterscheiden sich je nach Land und sogar nach
          Unternehmen erheblich.
        </p>

        <H3>CV, Resume oder Curriculum Vitae?</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>UK-Style CV:</strong> Ähnelt noch am ehesten dem deutschen
            Lebenslauf. Meist 2 Seiten, chronologisch, detaillierter als
            US-Version
          </li>
          <li style={styles.content.listItem}>
            <strong>US Resume:</strong> Kurz und fokussiert, idealerweise eine
            Seite. Konzentriert sich auf relevante Achievements, weglassen ist
            erlaubt
          </li>
          <li style={styles.content.listItem}>
            <strong>International CV:</strong> Ein Hybrid-Format, das sich an
            globalen Standards orientiert. Meist 1-2 Seiten, fokussiert aber
            umfassender als US Resume
          </li>
        </ul>

        <H3>Länderspezifische No-Gos</H3>
        <p style={styles.content.paragraph}>
          Was du in Deutschland gewohnt bist, kann international zum
          Ausschlusskriterium werden:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Fotos:</strong> In den USA ein absolutes No-Go
            (Diskriminierungsschutz), in UK unüblich, in Asien teils erwünscht
          </li>
          <li style={styles.content.listItem}>
            <strong>Persönliche Daten:</strong> Alter, Familienstand, Religion
            oder Nationalität haben in US/UK nichts im CV zu suchen
          </li>
          <li style={styles.content.listItem}>
            <strong>Unterschrift/Datum:</strong> Im deutschen Lebenslauf
            Standard, international unüblich
          </li>
          <li style={styles.content.listItem}>
            <strong>Hobbys und Interessen:</strong> Werden international anders
            bewertet als in Deutschland. Wie du{" "}
            <a
              href={serializeRoute({
                kind: RouteKind.Blog,
                blogRoute: { kind: "hobbys-lebenslauf" },
              })}
              style={linkStyles}
            >
              Hobbys im Lebenslauf
            </a>{" "}
            richtig einsetzt, hängt stark vom Zielland ab.
          </li>
        </ul>

        <div style={styles.content.note}>
          Ein Beispiel: Eine deutsche Bewerberin schickte ihren übersetzten
          Lebenslauf an eine US-Firma - komplett mit Foto, Geburtsdatum und der
          Info "verheiratet, keine Kinder". Die HR-Abteilung musste die
          Bewerbung aus rechtlichen Gründen direkt aussortieren.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Die richtige Struktur aufbauen</H2>
        <p style={styles.content.paragraph}>
          Ein internationaler CV folgt einer anderen Logik als sein deutscher
          Cousin. Der Fokus liegt stärker auf Ergebnissen und weniger auf
          lückenlosen Zeitabläufen. Gerade deshalb sind{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "lebenslauf-vorlagen" },
            })}
            style={linkStyles}
          >
            Standard-Lebenslaufvorlagen hier besonders problematisch
          </a>{" "}
          - sie übertragen oft deutsche Konventionen, die international nicht
          funktionieren.
        </p>

        <H3>Professional Summary statt "Über mich"</H3>
        <p style={styles.content.paragraph}>
          Starte mit einem knackigen Professional Summary - kein ausschweifender
          Fließtext, sondern 2-3 Sätze, die deine wichtigsten Qualifikationen
          und Erfolge zusammenfassen:
        </p>

        <div style={styles.content.note}>
          ❌ "I am a motivated team player looking for new challenges"
          <br />✅ "Senior Project Manager with 8+ years of experience leading
          cross-functional teams in software development, delivering 15+
          projects with a combined budget of €5M"
        </div>

        <H3>Achievements statt Aufgabenlisten</H3>
        <p style={styles.content.paragraph}>
          Der größte Unterschied: Internationale CVs fokussieren sich auf
          konkrete Erfolge statt auf Aufgabenbeschreibungen. Das ist besonders
          herausfordernd für{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "berufseinsteiger" },
            })}
            style={linkStyles}
          >
            Berufseinsteiger
          </a>
          , die noch keine messbaren Erfolge vorweisen können. Hier einige
          Beispiele, wie du deutsche Pflichten in englische Erfolge verwandelst:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            ❌ "Verantwortlich für Kundenbetreuung"
            <br />✅ "Increased customer satisfaction scores by 25% through
            implementation of new service standards"
          </li>
          <li style={styles.content.listItem}>
            ❌ "Mitarbeit in Vertriebsprojekten"
            <br />✅ "Generated €500K in new business through proactive outreach
            to 100+ potential clients"
          </li>
        </ul>

        <H3>Keywords und Aktionsverben</H3>
        <p style={styles.content.paragraph}>
          Internationale CVs leben von starken Action Verbs und messbaren
          Erfolgen. Hier eine Auswahl wirkungsvoller Verben, die deinen CV auf
          ein neues Level heben:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Führung:</strong> Orchestrated, Spearheaded, Led, Mentored
          </li>
          <li style={styles.content.listItem}>
            <strong>Erfolge:</strong> Achieved, Delivered, Generated, Increased
          </li>
          <li style={styles.content.listItem}>
            <strong>Innovation:</strong> Developed, Implemented, Transformed,
            Pioneered
          </li>
        </ul>
      </section>

      <section style={styles.content.section}>
        <H2>Typische Fehler vermeiden</H2>
        <p style={styles.content.paragraph}>
          Die größten Stolperfallen beim englischen Lebenslauf entstehen oft
          durch kulturelle Missverständnisse und zu wörtliche Übersetzungen.
          Hier sind die häufigsten Fehler - und wie du sie vermeidest.
        </p>

        <H3>Übersetzungsfallen</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            ❌ "Made my Abitur"
            <br />✅ "German university entrance qualification (Abitur)"
          </li>
          <li style={styles.content.listItem}>
            ❌ "Apprenticeship as bank clerk"
            <br />✅ "Completed 3-year banking traineeship (IHK-certified)"
          </li>
          <li style={styles.content.listItem}>
            ❌ "Got diploma as engineer"
            <br />✅ "Master's Degree in Engineering (Dipl.-Ing.)"
          </li>
        </ul>

        <div style={styles.content.note}>
          Bei deutschen Abschlüssen und Qualifikationen hilft oft eine kurze
          Erklärung in Klammern. Das schafft Klarheit und zeigt gleichzeitig
          dein Bewusstsein für internationale Unterschiede.
        </div>

        <H3>Kulturelle Unterschiede</H3>
        <p style={styles.content.paragraph}>
          Was in Deutschland als bescheiden und professionell gilt, kann
          international als mangelndes Selbstbewusstsein interpretiert werden.
          Beispiele für bessere Formulierungen:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            ❌ "Participated in various projects"
            <br />✅ "Successfully delivered 5 major projects, including..."
          </li>
          <li style={styles.content.listItem}>
            ❌ "Helped to improve sales"
            <br />✅ "Drove 30% sales increase through..."
          </li>
        </ul>
      </section>

      <section style={styles.content.section}>
        <H2>Sprache und Formulierung optimieren</H2>
        <p style={styles.content.paragraph}>
          Die richtige Wortwahl kann den Unterschied zwischen einem
          durchschnittlichen und einem überzeugenden CV ausmachen. Hier sind die
          wichtigsten Prinzipien für wirkungsvolle Formulierungen.
        </p>

        <H3>Power Verbs richtig einsetzen</H3>
        <p style={styles.content.paragraph}>
          Jeder Bullet Point sollte mit einem starken Action Verb beginnen. Aber
          Vorsicht: Der Kontext muss stimmen.
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Für Führungserfolge:</strong>
            <br />
            "Orchestrated company-wide digital transformation, reducing
            operational costs by 25%"
          </li>
          <li style={styles.content.listItem}>
            <strong>Für technische Leistungen:</strong>
            <br />
            "Engineered new testing framework, cutting debugging time by 40%"
          </li>
          <li style={styles.content.listItem}>
            <strong>Für Vertriebserfolge:</strong>
            <br />
            "Captured €2M in new business through strategic account development"
          </li>
        </ul>

        <H3>Achievements quantifizieren</H3>
        <p style={styles.content.paragraph}>
          Internationale Recruiter lieben Zahlen. Wo immer möglich, solltest du
          deine Erfolge quantifizieren:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>Prozentuale Verbesserungen</li>
          <li style={styles.content.listItem}>Teamgrößen und Budgets</li>
          <li style={styles.content.listItem}>
            Zeitersparnisse und Effizienzsteigerungen
          </li>
          <li style={styles.content.listItem}>Konkrete Projektzahlen</li>
        </ul>
      </section>

      <section style={styles.content.section}>
        <H2>Der finale Feinschliff</H2>
        <p style={styles.content.paragraph}>
          Bevor du deinen englischen Lebenslauf abschickst, sind einige wichtige
          letzte Schritte nötig, um wirklich zu überzeugen.
        </p>

        <H3>ATS-Optimierung für internationale Firmen</H3>
        <p style={styles.content.paragraph}>
          Internationale Unternehmen nutzen häufig ATS-Systeme (Applicant
          Tracking Systems). Der{" "}
          <a style={linkStyles} href="https://bewerbungshelfer.net">
            Bewerbungshelfer
          </a>{" "}
          unterstützt dich dabei, deinen CV sowohl für internationale Recruiter
          als auch für ATS-Systeme zu optimieren. Er erkennt die relevanten
          englischen Keywords aus der Stellenanzeige und hilft dir, sie
          natürlich in deinen Lebenslauf einzubauen.
        </p>

        <H3>Proofreading und Quality Check</H3>
        <p style={styles.content.paragraph}>
          Ein englischer CV muss absolut fehlerfrei sein. Kleine
          Grammatikfehler, die Muttersprachler sofort auffallen, können deine
          Chancen zunichte machen. Nutze diese Checkliste:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            ✓ Konsistente Zeitformen (Past Tense für frühere Jobs)
          </li>
          <li style={styles.content.listItem}>
            ✓ Britisches ODER amerikanisches Englisch - nicht mischen
          </li>
          <li style={styles.content.listItem}>
            ✓ Korrekte Fachbegriffe für deine Branche
          </li>
          <li style={styles.content.listItem}>
            ✓ Keine "Denglish"-Formulierungen
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Der Bewerbungshelfer bietet dir nicht nur Übersetzungshilfe, sondern
            eine echte Transformation deines Lebenslaufs ins Englische. Er
            versteht die kulturellen Unterschiede und hilft dir, deine
            Erfahrungen so zu präsentieren, wie sie in der internationalen
            Arbeitswelt überzeugen.
          </p>
        </div>
      </section>
    </>
  );
}
