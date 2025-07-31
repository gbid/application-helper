import { styles } from "./shared";
import { H2 } from "./shared";
import { H3 } from "./shared";
import { linkStyles } from "./shared";
import { serializeRoute } from "../route";
import { RouteKind } from "../route";

export function AnschreibenNotwendig() {
  return (
    <>
      <section style={styles.content.section}>
        <p style={styles.content.paragraph}>
          Stelle dir vor, du findest ein spannendes Dating-Profil und schreibst
          einfach "Hi, hier sind meine wichtigsten Lebensdaten!" Das klingt
          absurd? Genau das tun aber viele Bewerber, die auf ein Anschreiben
          verzichten. Dabei geht es nicht um veraltete Formalitäten, sondern um
          etwas ganz Grundlegendes: Den ersten Kontakt und die Art, wie du dich
          präsentierst.
        </p>

        <p style={styles.content.paragraph}>
          Die Frage "Brauche ich noch ein Anschreiben?" wird heute häufig
          gestellt - und oft falsch beantwortet. Denn es geht nicht darum, ob
          Anschreiben generell "out" oder "must-have" sind. Die entscheidende
          Frage ist: Wie stellst du am besten den ersten Kontakt her und zeigst
          deine Motivation für genau diese Position?
        </p>

        <div style={styles.content.note}>
          Kurz & Knapp: Ein Anschreiben ist keine bloße Formalität, sondern
          deine Chance, direkt in einen Dialog zu treten. Ob klassisches
          Anschreiben oder moderne Alternative - entscheidend ist, dass du deine
          Motivation und Passung überzeugend kommunizierst.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Die eigentliche Funktion des Anschreibens verstehen</H2>
        <p style={styles.content.paragraph}>
          Viele sehen das Anschreiben als lästige Pflichtübung oder veraltete
          Tradition. Dabei übersehen sie den eigentlichen Zweck: Ein Anschreiben
          ist im Kern eine gezielte Kommunikation, die drei wichtige Funktionen
          erfüllt:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Motivation zeigen:</strong> Warum bewirbst du dich auf genau
            diese Stelle? Was reizt dich an diesem Unternehmen? Ein Lebenslauf
            allein kann diese Fragen nicht beantworten.
          </li>
          <li style={styles.content.listItem}>
            <strong>Relevanz herstellen:</strong> Welche deiner Erfahrungen sind
            besonders wichtig für diese Position? Das Anschreiben hilft dem
            Leser, die relevanten Verbindungen aus deinem{" "}
            <a
              href={serializeRoute({
                kind: RouteKind.Blog,
                blogRoute: { kind: "lebenslauf-guide" },
              })}
              style={linkStyles}
            >
              Lebenslauf
            </a>{" "}
            zu erkennen und einzuordnen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Persönlichkeit vermitteln:</strong> Wie kommunizierst du?
            Wie präsentierst du dich? Das Anschreiben gibt einen ersten Eindruck
            deines professionellen Auftretens.
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Diese Funktionen bleiben wichtig - auch wenn sich die Form ändern mag.
          Dabei solltest du unbedingt{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "anschreiben-vorlagen" },
            })}
            style={linkStyles}
          >
            veraltete Standardfloskeln vermeiden
          </a>
          . Vergleichen wir es mit der modernen Kommunikation: Auch bei LinkedIn
          oder XING schreibst du keine formelle Kontaktanfrage, aber du stellst
          dich vor und erklärst dein Interesse. Das Prinzip bleibt das gleiche.
        </p>

        <div style={styles.content.note}>
          Ein gutes Anschreiben - egal in welcher Form - beantwortet die Frage,
          die sich jeder Personaler stellt: "Warum sollten wir uns näher mit
          diesem Kandidaten beschäftigen?"
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Moderne Alternativen zum klassischen Anschreiben</H2>
        <p style={styles.content.paragraph}>
          Die gute Nachricht: Es muss nicht immer das klassische
          DIN-A4-Anschreiben sein. Je nach Branche und Position gibt es heute
          verschiedene Möglichkeiten, die gleichen Ziele zu erreichen:
        </p>

        <H3>LinkedIn/XING-Nachrichten</H3>
        <p style={styles.content.paragraph}>
          Besonders in der Tech- und Startup-Szene ist der direkte Kontakt über
          Business-Netzwerke heute üblich. Der Vorteil: Die Kommunikation ist
          direkter und persönlicher. Eine gut formulierte LinkedIn-Nachricht
          kann dabei die gleiche Funktion erfüllen wie ein klassisches
          Anschreiben - sie zeigt Motivation und stellt relevante Verbindungen
          her.
        </p>

        <H3>Video-Bewerbungen</H3>
        <p style={styles.content.paragraph}>
          Ein kurzes Vorstellungsvideo kann besonders effektiv sein, um
          Persönlichkeit und Motivation zu vermitteln. Aber Vorsicht: Auch hier
          gilt es, professionell und fokussiert zu bleiben. Ein
          60-Sekunden-Video sollte die gleichen Kernbotschaften transportieren
          wie ein klassisches Anschreiben.
        </p>

        <H3>Der "Elevator Pitch" in Schriftform</H3>
        <p style={styles.content.paragraph}>
          Eine moderne Variante ist der kurze, prägnante Pitch - drei bis vier
          Absätze, die knackig auf den Punkt bringen, warum du der ideale
          Kandidat bist. Dieser Ansatz kommt der Art und Weise entgegen, wie
          heute Informationen konsumiert werden: schnell, fokussiert und auf das
          Wesentliche konzentriert.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Egal welches Format - der{" "}
            <a style={linkStyles} href="https://bewerbungshelfer.net">
              Bewerbungshelfer
            </a>{" "}
            unterstützt dich dabei, deine Kernbotschaften klar und überzeugend
            zu formulieren. Die KI analysiert dabei die Stellenanforderungen und
            hilft dir, die relevanten Aspekte deines Profils optimal
            hervorzuheben - sei es für ein klassisches Anschreiben oder eine
            moderne Alternative.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Die richtige Entscheidung treffen</H2>
        <p style={styles.content.paragraph}>
          Letztendlich geht es nicht um die Frage "Anschreiben: ja oder nein?",
          sondern darum, wie du am überzeugendsten den ersten Kontakt
          herstellst. Hier ist deine Entscheidungshilfe:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Klassisches Anschreiben optimal für:</strong>
            <ul>
              <li>
                Traditionelle Branchen (Banken, Verwaltung, große Konzerne)
              </li>
              <li>Positionen mit hohen Kommunikationsanforderungen</li>
              <li>
                Situationen, die Erklärungsbedarf haben (Quereinstieg, Lücken)
              </li>
            </ul>
          </li>
          <li style={styles.content.listItem}>
            <strong>Moderne Alternativen bieten sich an bei:</strong>
            <ul>
              <li>Startups und Tech-Unternehmen</li>
              <li>Kreativen und Marketing-Positionen</li>
              <li>Direktansprache durch Recruiter</li>
            </ul>
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Unabhängig vom gewählten Format gilt: Die Zeit der manuellen
          Textbausteine ist vorbei.{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "ki-nutzung" },
            })}
            style={linkStyles}
          >
            Moderne KI-Unterstützung
          </a>{" "}
          hilft dir dabei, deine Botschaft klar und überzeugend zu
          kommunizieren. Der{" "}
          <a style={linkStyles} href="https://bewerbungshelfer.net">
            Bewerbungshelfer
          </a>{" "}
          identifiziert die relevanten Punkte und unterstützt dich bei der
          professionellen Formulierung - sei es für ein klassisches Anschreiben
          oder einen modernen Pitch.
        </p>

        <div style={styles.content.note}>
          Denk daran: Ein guter erster Kontakt - egal in welcher Form - kann den
          Unterschied zwischen einer Einladung zum Gespräch und einer Absage
          machen. Investiere die Zeit, dich und deine Motivation überzeugend zu
          präsentieren.
        </div>
      </section>
    </>
  );
}
