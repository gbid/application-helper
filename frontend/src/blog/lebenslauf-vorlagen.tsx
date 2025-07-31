import { styles } from "./shared";
import { H2 } from "./shared";
import { H3 } from "./shared";
import { linkStyles } from "./shared";
import { serializeRoute } from "../route";
import { RouteKind } from "../route";

export function LebenslaufVorlagen() {
  return (
    <>
      <section style={styles.content.section}>
        <p style={styles.content.paragraph}>
          Ein Anzug von der Stange sieht erst dann wirklich gut aus, wenn er
          angepasst wurde. Bei Lebenslauf-Vorlagen ist es genauso: Die Struktur
          mag stimmen, aber ohne individuelle Anpassung wirst du nie perfekt
          damit aussehen. Trotzdem laden täglich tausende Bewerber
          Standard-Templates herunter - und verschenken damit die Chance, ihr
          wahres Potenzial zu zeigen.
        </p>

        <p style={styles.content.paragraph}>
          Versteh uns nicht falsch: Eine grundlegende Struktur ist wichtig. Aber
          genau wie ein guter Schneider aus einem Standard-Anzug ein perfekt
          sitzendes Einzelstück macht, liegt der Unterschied in der
          individuellen Anpassung. Die Frage ist also nicht, ob du eine Vorlage
          nutzen solltest - sondern wie du sie so verfeinerst, dass deine
          Qualifikationen optimal zur Geltung kommen.
        </p>

        <div style={styles.content.note}>
          Kurz & Knapp: Ein überzeugender Lebenslauf braucht mehr als nur eine
          Vorlage. Er muss deine spezifischen Stärken hervorheben, ATS-optimiert
          sein und zur Branche passen. Wie du das erreichst, erfährst du in
          diesem Artikel.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Die größten Schwächen von Standard-Vorlagen</H2>
        <p style={styles.content.paragraph}>
          Warum reichen Standard-Vorlagen nicht aus? Die Probleme werden
          besonders deutlich, wenn wir verstehen, wie moderne Bewerbungsprozesse
          tatsächlich funktionieren - und was dabei durch vorgefertigte
          Templates verloren geht.
        </p>

        <H3>Falsche Gewichtung der Erfahrungen</H3>
        <p style={styles.content.paragraph}>
          Standard-Vorlagen behandeln alle Berufserfahrungen gleich. Sie bieten
          drei Zeilen für jede Position, egal ob es sich um einen zweiwöchigen
          Nebenjob oder deine entscheidende Führungsposition handelt. Das ist,
          als würdest du bei einem Anzug die Ärmel kürzen, ohne die Schultern
          anzupassen - es passt einfach nicht richtig.
        </p>

        <H3>Unzureichende ATS-Optimierung</H3>
        <p style={styles.content.paragraph}>
          Viele Vorlagen sehen zwar gut aus, sind aber für automatische
          Bewerbungssysteme (ATS) ein Problem. Fancy Layouts, komplexe Tabellen
          oder PDF-Exports mit schlechter Texterkennung führen dazu, dass deine
          Qualifikationen im System nicht richtig erkannt werden. Das ist, als
          hättest du einen schicken Anzug an, wärst aber im falschen Raum.
        </p>

        <div style={styles.content.note}>
          Ein Beispiel: Eine beliebte Word-Vorlage nutzt für Skills eine
          zweispaltige Tabelle mit Bewertungssymbolen. Sieht toll aus, aber das
          ATS liest daraus "Excel ★★★★☆ | Word ★★★★★" - und kann mit diesen
          Sternen nichts anfangen.
        </div>

        <H3>Ignorieren von Branchenstandards</H3>
        <p style={styles.content.paragraph}>
          Was im Start-up beeindruckt, kann in der Bank deplatziert wirken - und
          umgekehrt. Standard-Vorlagen versuchen allen gerecht zu werden und
          treffen damit niemanden richtig. Ein IT-Experte braucht andere
          Schwerpunkte als eine Marketing-Managerin. Die Vorlage kann das nicht
          wissen - du schon. Besonders kritisch wird dies bei{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "berufseinsteiger" },
            })}
            style={linkStyles}
          >
            Berufseinsteigern
          </a>{" "}
          oder bei{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "lebenslauf-englisch" },
            })}
            style={linkStyles}
          >
            internationalen Bewerbungen
          </a>
          , wo Standard-Vorlagen oft komplett falsche Signale senden.
        </p>

        <p style={styles.content.paragraph}>
          Ein konkretes Beispiel: Eine Entwicklerin nutzte eine Standard-
          Vorlage, die ihre Programmierkenntnisse unter "Sonstige
          Qualifikationen" am Ende versteckte - während ihr Schulpraktikum von
          vor 10 Jahren prominent auf der ersten Seite stand. Das ist wie ein
          Anzug in der falschen Größe: Er sitzt nicht nur nicht, er sendet auch
          die falschen Signale.
        </p>
      </section>

      <section style={styles.content.section}>
        <H2>Was Personaler und ATS-Systeme wirklich suchen</H2>
        <p style={styles.content.paragraph}>
          Um zu verstehen, wie ein überzeugender Lebenslauf aussieht, müssen wir
          beide Seiten der Bewerbung betrachten: den menschlichen Personaler und
          die automatische Vorsortierung durch ATS-Systeme.
        </p>

        <H3>Relevante Schlüsselwörter, clever platziert</H3>
        <p style={styles.content.paragraph}>
          ATS-Systeme scannen deinen Lebenslauf nach relevanten Keywords aus der
          Stellenanzeige. Aber Achtung: Blindes Kopieren der Begriffe
          funktioniert nicht. Die Kunst liegt darin, die richtigen Keywords in
          sinnvolle Zusammenhänge einzubetten. Statt "Projektmanagement" einfach
          zu listen, beschreibe konkret: "Leitung von 3 parallel laufenden
          Digitalisierungsprojekten mit jeweils 5-köpfigen Teams."
        </p>

        <H3>Messbare Erfolge statt Aufgabenlisten</H3>
        <p style={styles.content.paragraph}>
          Standard-Vorlagen verführen zu reinen Aufgabenlisten: "Verantwortlich
          für Kundenbetreuung". Personaler suchen aber nach konkreten Erfolgen
          und Verantwortlichkeiten. Der Unterschied:
        </p>

        <div style={styles.content.note}>
          ❌ "Zuständig für Social Media Marketing"
          <br />✅ "Steigerung der Social Media Reichweite um 150% durch
          Entwicklung einer neuen Content-Strategie"
        </div>

        <H3>Branchenspezifische Priorisierung</H3>
        <p style={styles.content.paragraph}>
          Verschiedene Branchen legen Wert auf unterschiedliche Aspekte. Ein
          Beispiel: Im Vertrieb sind Zahlen und Erfolgsquoten entscheidend, in
          der IT zählen spezifische Technologien und Projekterfahrungen, im
          Kreativbereich steht das Portfolio im Vordergrund. Eine gute Struktur
          passt sich diesen Anforderungen an - wie ein Anzug, der für den
          jeweiligen Anlass richtig sitzt.
        </p>
      </section>

      <section style={styles.content.section}>
        <H2>Der richtige Umgang mit Vorlagen</H2>
        <p style={styles.content.paragraph}>
          Vorlagen können durchaus ein guter Ausgangspunkt sein - es kommt
          darauf an, wie du sie nutzt. Hier sind die wichtigsten Prinzipien für
          die erfolgreiche Anpassung:
        </p>

        <H3>Die Basis richtig wählen</H3>
        <p style={styles.content.paragraph}>
          Nicht jede Vorlage eignet sich für jede Branche. Ein minimalistisches,
          technisches Layout kann für IT-Positionen ideal sein, während
          klassischere Branchen wie Banken und Versicherungen eine
          traditionellere Struktur erwarten. Wähle eine Vorlage, die zu deinem
          Zielbereich passt.
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>IT & Tech:</strong> Fokus auf technische Skills,
            übersichtliche Gliederung von Projekten und Technologien
          </li>
          <li style={styles.content.listItem}>
            <strong>Klassische Branchen:</strong> Chronologischer Aufbau,
            konservatives Layout, detaillierte Bildungsangaben
          </li>
          <li style={styles.content.listItem}>
            <strong>Kreativberufe:</strong> Mehr Gestaltungsfreiheit, aber ohne
            die Lesbarkeit zu opfern
          </li>
        </ul>

        <H3>Notwendige Anpassungen</H3>
        <p style={styles.content.paragraph}>
          Folgende Elemente solltest du in jedem Fall individualisieren:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Gewichtung der Abschnitte:</strong> Relevante Erfahrungen
            ausführlicher darstellen, Nebentätigkeiten kürzer fassen
          </li>
          <li style={styles.content.listItem}>
            <strong>Formulierungen:</strong> Stellenspezifische Keywords
            einbauen, messbare Erfolge hervorheben
          </li>
          <li style={styles.content.listItem}>
            <strong>Reihenfolge:</strong> Wichtigste Qualifikationen für die
            Stelle nach oben ziehen
          </li>
          <li style={styles.content.listItem}>
            <strong>Persönliche Elemente:</strong> Besonders bei{" "}
            <a
              href={serializeRoute({
                kind: RouteKind.Blog,
                blogRoute: { kind: "hobbys-lebenslauf" },
              })}
              style={linkStyles}
            >
              Hobbys und Interessen
            </a>{" "}
            ist eine durchdachte, individuelle Präsentation wichtiger als
            Standard-Formulierungen
          </li>
        </ul>
      </section>

      <section style={styles.content.section}>
        <H2>Die optimale Struktur entwickeln</H2>
        <p style={styles.content.paragraph}>
          Ein überzeugender Lebenslauf basiert auf einer klaren,
          leserfreundlichen Struktur. Hier sind die wichtigsten Prinzipien für
          den Aufbau:
        </p>

        <H3>Klare Hierarchie der Informationen</H3>
        <p style={styles.content.paragraph}>
          Stelle die wichtigsten Informationen prominent dar. Das bedeutet oft,
          von der streng chronologischen Reihenfolge abzuweichen. Ein Beispiel:
          Bei einem Quereinstieg sind relevante Projekte oder Weiterbildungen
          möglicherweise wichtiger als die chronologische Auflistung früherer,
          branchenfremder Tätigkeiten.
        </p>

        <H3>Formatierung für Mensch und Maschine</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Schriftart:</strong> Gut lesbare Standardschriften wie Arial
            oder Calibri
          </li>
          <li style={styles.content.listItem}>
            <strong>Größe:</strong> 11-12pt für Text, 14-16pt für Überschriften
          </li>
          <li style={styles.content.listItem}>
            <strong>Abstände:</strong> Großzügige Weißräume für bessere
            Lesbarkeit
          </li>
          <li style={styles.content.listItem}>
            <strong>Hervorhebungen:</strong> Sparsam einsetzen, nur für wirklich
            wichtige Punkte
          </li>
        </ul>

        <div style={styles.content.note}>
          Weniger ist mehr: Ein übersichtlicher Lebenslauf mit klarer Struktur
          ist einprägsamer als ein überladenes Design mit zu vielen Farben,
          Linien und Effekten.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Der Weg zum perfekten Lebenslauf</H2>
        <p style={styles.content.paragraph}>
          Die Optimierung deines Lebenslaufs ist ein iterativer Prozess. Moderne
          Tools können dir dabei helfen, das Beste aus deinem Profil
          herauszuholen.
        </p>

        <H3>Intelligente Unterstützung nutzen</H3>
        <p style={styles.content.paragraph}>
          Moderne{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "ki-nutzung" },
            })}
            style={linkStyles}
          >
            KI-basierte Tools
          </a>{" "}
          können dir dabei helfen, das Beste aus einer Vorlage zu machen. Der{" "}
          <a style={linkStyles} href="https://bewerbungshelfer.net">
            Bewerbungshelfer
          </a>{" "}
          übernimmt genau die Rolle, die wir in diesem Artikel beschrieben
          haben: Er analysiert die Stellenanzeige und deine Qualifikationen und
          hilft dir dabei, aus einer Basis-Vorlage einen perfekt angepassten
          Lebenslauf zu entwickeln. Die KI erkennt, welche deiner Erfahrungen
          besonders relevant sind, schlägt die optimale Gewichtung vor und
          formuliert deine Erfolge überzeugend - aber immer basierend auf deinen
          tatsächlichen Qualifikationen.
        </p>

        <p style={styles.content.paragraph}>
          Dabei berücksichtigt der Bewerbungshelfer automatisch alle wichtigen
          Aspekte: ATS-Optimierung, branchengerechte Formatierung und die
          richtige Balance zwischen Vollständigkeit und Relevanz. Du erhältst
          nicht einfach eine weitere Vorlage, sondern einen intelligent auf dich
          und die Stelle zugeschnittenen Lebenslauf.
        </p>

        <H3>Finale Checkliste</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            ✓ Sind alle Angaben aktuell und relevant?
          </li>
          <li style={styles.content.listItem}>
            ✓ Hast du deine wichtigsten Erfolge quantifiziert?
          </li>
          <li style={styles.content.listItem}>
            ✓ Enthält der Lebenslauf die relevanten Keywords aus der
            Stellenanzeige?
          </li>
          <li style={styles.content.listItem}>
            ✓ Ist das Layout ATS-freundlich?
          </li>
          <li style={styles.content.listItem}>
            ✓ Passt die Gewichtung der Informationen zur Stelle?
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Ein überzeugender Lebenslauf ist keine Frage der richtigen Vorlage,
            sondern der richtigen Anpassung und Optimierung. Nutze moderne Tools
            zur Unterstützung, aber behalte immer im Blick, was dich und deine
            Erfahrung einzigartig macht.
          </p>
        </div>
      </section>
    </>
  );
}
