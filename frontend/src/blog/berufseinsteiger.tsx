import { styles } from "./shared";
import { H2 } from "./shared";
import { H3 } from "./shared";
import { linkStyles } from "./shared";
import { serializeRoute } from "../route";
import { RouteKind } from "../route";

export function Berufseinsteiger() {
  return (
    <>
      <section style={styles.content.section}>
        <p style={styles.content.paragraph}>
          Stell dir vor, Netflix würde nur Serien mit mindestens 5 Staffeln
          zeigen. Spannende Newcomer hätten keine Chance. Absurd? Genau so fühlt
          es sich oft an, wenn Berufseinsteiger Stellenanzeigen lesen. Dabei hat
          jede Erfolgsgeschichte mal mit Staffel 1 angefangen - und genau wie
          eine gute Pilotfolge kann auch dein Lebenslauf ohne jahrelange
          Berufserfahrung überzeugen.
        </p>

        <p style={styles.content.paragraph}>
          Der Trick liegt darin, nicht darüber zu lamentieren, was noch fehlt,
          sondern zu zeigen, was bereits da ist: dein Potenzial, deine
          Lernbereitschaft und deine bisherigen Erfahrungen - auch wenn sie
          nicht aus klassischer Berufstätigkeit stammen. Denn auch "Breaking
          Bad" startete nicht mit einem Drogenkartell, sondern mit einem
          Chemielehrer.
        </p>

        <div style={styles.content.note}>
          Kurz & Knapp: Ein überzeugender Berufseinsteiger-Lebenslauf zeigt
          nicht nur deine formalen Qualifikationen, sondern macht dein Potenzial
          und deine Motivation sichtbar. Die Kunst liegt darin, deine
          vorhandenen Erfahrungen richtig zu präsentieren.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Erfahrung neu denken: Was du wirklich zu bieten hast</H2>
        <p style={styles.content.paragraph}>
          Der häufigste Fehler von Berufseinsteigern: Sie unterschätzen ihre
          vorhandenen Erfahrungen. Dabei ist "Berufserfahrung" viel breiter als
          viele denken. Hier sind die oft übersehenen Quellen relevanter
          Erfahrung:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Praktika und Werkstudententätigkeiten:</strong> Auch kurze
            Einblicke in die Arbeitswelt zählen. Ein zweimonatiges Praktikum, in
            dem du aktiv an Projekten mitgearbeitet hast, kann wertvoller sein
            als ein Jahr Routinearbeit.
          </li>
          <li style={styles.content.listItem}>
            <strong>Studienprojekte:</strong> Deine Abschlussarbeit,
            Projektarbeiten oder Forschungsprojekte zeigen oft genau die
            Fähigkeiten, die Arbeitgeber suchen: Analytisches Denken,
            Projektmanagement, selbstständiges Arbeiten.
          </li>
          <li style={styles.content.listItem}>
            <strong>Ehrenamtliches Engagement:</strong> Die Organisation von
            Vereinsveranstaltungen oder die Leitung einer Jugendgruppe
            vermittelt wichtige Soft Skills wie Teamführung,
            Verantwortungsbewusstsein und Organisationsfähigkeit.
          </li>
          <li style={styles.content.listItem}>
            <strong>Nebenjobs:</strong> Auch wenn sie nicht direkt mit dem
            Zielberuf zu tun haben - Servicejobs oder Nachhilfe zeigen
            Einsatzbereitschaft und vermitteln wichtige Grundkompetenzen wie
            Kundenorientierung und Zuverlässigkeit.
          </li>
        </ul>

        <div style={styles.content.note}>
          Die Kunst liegt nicht darin, möglichst viele Aktivitäten aufzulisten,
          sondern die wertvollen Kompetenzen aus deinen Erfahrungen
          herauszuarbeiten. Ein Nebenjob im Café ist nicht einfach nur
          "Kellnern" - es geht um Kundenservice, Stressresistenz und Teamarbeit
          unter Zeitdruck.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Die richtige Struktur: Potenzial in den Vordergrund</H2>
        <p style={styles.content.paragraph}>
          Anders als bei erfahrenen Bewerbern steht bei Berufseinsteigern nicht
          der berufliche Werdegang im Mittelpunkt. Stattdessen gilt es, eine
          Struktur zu wählen, die deine Stärken optimal präsentiert:
        </p>

        <H3>Der optimale Aufbau</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Persönliche Daten & Profil:</strong> Kurz und professionell.
            Ein prägnanter Einleitungssatz kann hier bereits deine
            Kernkompetenzen und Ziele aufzeigen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Bildungsweg:</strong> Bei Berufseinsteigern ein zentraler
            Punkt. Hebe relevante Schwerpunkte, Projektarbeiten und besondere
            Leistungen hervor.
          </li>
          <li style={styles.content.listItem}>
            <strong>Praktische Erfahrungen:</strong> Hier kommen Praktika,
            Werkstudententätigkeiten und relevante Nebenjobs - mit Fokus auf die
            dabei erworbenen, relevanten Kompetenzen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Zusatzqualifikationen & Skills:</strong> Von
            Programmierkenntnissen bis Projektmanagement-Methoden - zeige, was
            du bereits kannst.
          </li>
          <li style={styles.content.listItem}>
            <strong>Engagement & Interessen:</strong> Wähle bewusst die
            Aktivitäten aus, die relevante Soft Skills oder Motivation für
            deinen Zielberuf belegen. Wie du{" "}
            <a
              href={serializeRoute({
                kind: RouteKind.Blog,
                blogRoute: { kind: "hobbys-lebenslauf" },
              })}
              style={linkStyles}
            >
              Hobbys clever im Lebenslauf einsetzt
            </a>
            , kann gerade als Berufseinsteiger ein wichtiger Vorteil sein.
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Dabei hilft dir der{" "}
          <a style={linkStyles} href="https://bewerbungshelfer.net">
            Bewerbungshelfer
          </a>{" "}
          nicht nur bei der optimalen Strukturierung, sondern auch dabei, die
          relevanten Aspekte deiner Erfahrungen zu identifizieren und
          überzeugend zu formulieren. Die KI erkennt Verbindungen zwischen
          deinen Aktivitäten und den Anforderungen der Stelle, die du vielleicht
          selbst übersehen würdest.
        </p>

        <H3>Konkrete Beispiele statt leerer Worte</H3>
        <p style={styles.content.paragraph}>
          Statt zu schreiben "Teamfähigkeit durch verschiedene Gruppenarbeiten",
          beschreibe konkrete Projekte und Ergebnisse:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            ❌ "Mitarbeit in Studienprojekten"
            <br />✅ "Entwicklung einer Marketing-Strategie im 5-köpfigen Team,
            Präsentation vor Industriepartner"
          </li>
          <li style={styles.content.listItem}>
            ❌ "Nebenjob in der Gastronomie"
            <br />✅ "Service und Teamleitung im Café, verantwortlich für
            Einarbeitung neuer Mitarbeiter"
          </li>
          <li style={styles.content.listItem}>
            ❌ "Ehrenamtliches Engagement im Verein"
            <br />✅ "Organisation des jährlichen Sommerfests mit 200+
            Besuchern, Budgetverantwortung 5.000€"
          </li>
        </ul>

        <div style={styles.content.note}>
          Professionelle Formulierungen machen den Unterschied: Statt "hatte
          eine Werkstudentenstelle" besser "Unterstützte als Werkstudent die
          Marketingabteilung bei der Content-Erstellung und
          Social-Media-Analyse". Die KI hilft dir dabei, deine Erfahrungen
          prägnant und überzeugend darzustellen.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Moderne Wege, dein Potenzial zu zeigen</H2>
        <p style={styles.content.paragraph}>
          Ein moderner Lebenslauf endet nicht mehr bei der Auflistung deiner
          Erfahrungen. Vermeide dabei die Fallen von{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "lebenslauf-vorlagen" },
            })}
            style={linkStyles}
          >
            Standard-Vorlagen
          </a>
          , die gerade Berufseinsteiger oft falsch gewichten. Stattdessen hast
          du heute viele Möglichkeiten, deine Fähigkeiten und dein Potenzial
          zusätzlich zu demonstrieren:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Online-Präsenz:</strong> Ein professionelles LinkedIn-Profil
            ist heute fast Pflicht. Hier kannst du auch Projekte und
            Arbeitsproben teilen, Empfehlungen von Praktikums- betreuern sammeln
            und dein Netzwerk aufbauen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Projektportfolio:</strong> Ob GitHub für
            Programmierprojekte, Behance für Design-Arbeiten oder eine eigene
            Website - zeige, was du bereits geschaffen hast. Auch Uni-Projekte
            oder private Arbeiten können hier wertvoll sein.
          </li>
          <li style={styles.content.listItem}>
            <strong>Zertifikate & Online-Kurse:</strong> Zusätzliche
            Qualifikationen von Plattformen wie{" "}
            <a style={linkStyles} href="https://www.coursera.org">
              Coursera
            </a>{" "}
            oder{" "}
            <a style={linkStyles} href="https://www.udemy.com">
              Udemy
            </a>{" "}
            zeigen Eigeninitiative und Lernbereitschaft. Wähle Kurse, die
            relevant für deine Zielposition sind.
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Diese zusätzlichen Elemente sollten clever in deinen Lebenslauf
          integriert werden. Ein QR-Code oder Link zu deinem Portfolio kann
          beispielsweise direkt unter deinen Kontaktdaten platziert werden.
          Erwähne Online-Kurse und Zertifikate im Abschnitt
          "Zusatzqualifikationen", aber nur wenn sie wirklich relevant sind.
        </p>

        <div style={styles.content.note}>
          Qualität geht vor Quantität: Ein gut gepflegtes LinkedIn-Profil und
          zwei relevante Projektbeispiele sind wertvoller als eine lange Liste
          halbfertiger Online-Kurse oder verlinkter Projekte.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Überzeugend und authentisch durchstarten</H2>
        <p style={styles.content.paragraph}>
          Ein erfolgreicher Lebenslauf als Berufseinsteiger folgt einem
          wichtigen Prinzip: Er konzentriert sich nicht darauf, fehlende
          Berufserfahrung zu kaschieren, sondern stellt deine vorhandenen
          Qualifikationen und dein Potenzial in den Vordergrund. Dabei können{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "ki-nutzung" },
            })}
            style={linkStyles}
          >
            moderne KI-Tools
          </a>{" "}
          eine wertvolle Unterstützung sein.
        </p>

        <p style={styles.content.paragraph}>
          Nutze dabei moderne Unterstützung wie den{" "}
          <a style={linkStyles} href="https://bewerbungshelfer.net">
            Bewerbungshelfer
          </a>
          , um deine Erfahrungen optimal zu präsentieren. Die KI hilft dir,
          versteckte Stärken in deinem Profil zu erkennen und sie professionell
          zu formulieren. Auch wenn du noch am Anfang stehst - mit der richtigen
          Präsentation deiner Qualifikationen kannst du Personaler von deinem
          Potenzial überzeugen.
        </p>

        <H3>Checkliste für deinen Berufseinsteiger-Lebenslauf</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            ✓ Bildung und relevante Studienprojekte prominent platziert?
          </li>
          <li style={styles.content.listItem}>
            ✓ Praktika und Nebenjobs mit konkreten Ergebnissen beschrieben?
          </li>
          <li style={styles.content.listItem}>
            ✓ Ehrenamtliches Engagement mit übertragbaren Skills verknüpft?
          </li>
          <li style={styles.content.listItem}>
            ✓ Zusatzqualifikationen und digitale Nachweise integriert?
          </li>
          <li style={styles.content.listItem}>
            ✓ Alle Erfahrungen auf die Zielposition ausgerichtet?
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Denk daran: Jeder erfolgreiche Berufstätige war einmal
            Berufseinsteiger. Mit einem durchdachten Lebenslauf, der deine
            vorhandenen Qualifikationen und dein Potenzial optimal präsentiert,
            legst du den Grundstein für deine eigene Karriere-Erfolgsgeschichte.
          </p>
        </div>
      </section>
    </>
  );
}
