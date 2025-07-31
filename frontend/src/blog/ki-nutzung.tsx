import { styles } from "./shared";
import { H2 } from "./shared";
import { H3 } from "./shared";
import { linkStyles } from "./shared";
import { serializeRoute } from "../route";
import { RouteKind } from "../route";

export function KINutzung() {
  return (
    <>
      <section style={styles.content.section}>
        <p style={styles.content.paragraph}>
          Die Jobsuche ist wie ein Matching-Prozess: Beide Seiten suchen den
          perfekten Partner. Während Unternehmen den idealen Kandidaten für ihre
          Position finden möchten, suchst du als Bewerber den Job, der wirklich
          zu deinen Fähigkeiten und Zielen passt. Die Herausforderung dabei: Wie
          präsentierst du deine Qualifikationen so, dass die richtige Stelle
          auch zu dir findet?
        </p>

        <p style={styles.content.paragraph}>
          Genau hier kann künstliche Intelligenz helfen - nicht um etwas
          vorzutäuschen, sondern um deine tatsächlichen Qualifikationen optimal
          zur Geltung zu bringen. Denn letztlich sucht kein Arbeitgeber
          jemanden, der besonders gut Bewerbungen schreiben kann - sondern einen
          qualifizierten Mitarbeiter für die ausgeschriebene Position.
        </p>

        <div style={styles.content.note}>
          Kurz & Knapp: Eine Bewerbung ist im Kern ein Matching-Problem. Deine
          Aufgabe ist es, authentisch zu zeigen, warum du und die
          ausgeschriebene Stelle perfekt zusammenpassen. KI-Tools sind dabei
          legitime Helfer - genau wie etablierte Bewerbungsservices schon seit
          Jahrzehnten Bewerber unterstützen.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Bewerbungen als Matching-Problem verstehen</H2>
        <p style={styles.content.paragraph}>
          Sowohl Unternehmen als auch Bewerber stehen vor der gleichen
          Herausforderung: Sie müssen sich attraktiv und authentisch
          präsentieren. Unternehmen tun dies durch professionell formulierte
          Stellenanzeigen und eine gepflegte Arbeitgebermarke. Als Bewerber
          musst du deine Qualifikationen und Motivation überzeugend darstellen -
          und zwar genau für diese eine Position.
        </p>

        <p style={styles.content.paragraph}>
          Moderne Technologie kann dir dabei helfen, dieses Matching-Problem zu
          lösen. Nicht weil Unternehmen auch KI-Tools einsetzen, sondern weil
          sie dir hilft, die wirklich relevanten Aspekte deines Profils
          hervorzuheben. Sie unterstützt dich dabei, die Übereinstimmung
          zwischen deinen Qualifikationen und den Anforderungen der Stelle klar
          und überzeugend darzustellen.
        </p>

        <H3>Warum KI keine Trickserei ist</H3>
        <p style={styles.content.paragraph}>
          Kein Arbeitgeber sucht Bewerber, die besonders gut darin sind,
          Bewerbungen zu schreiben. Gesucht werden Menschen mit den richtigen
          Qualifikationen und der passenden Motivation für die Position. Genau
          deshalb sind professionelle Bewerbungsservices wie{" "}
          <a style={linkStyles} href="https://www.die-bewerbungsschreiber.de/">
            Die Bewerbungsschreiber
          </a>{" "}
          seit Jahrzehnten etabliert und akzeptiert: Sie helfen dir, deine
          tatsächlichen Qualifikationen und Motivation optimal zu präsentieren.
        </p>

        <p style={styles.content.paragraph}>
          KI-Tools wie der{" "}
          <a style={linkStyles} href="https://bewerbungshelfer.net">
            Bewerbungshelfer
          </a>{" "}
          tun genau das Gleiche - nur schneller, kostengünstiger und für jede
          einzelne Stelle individuell optimiert. Sie analysieren die
          Stellenanforderungen und dein Profil und helfen dir, die relevanten
          Verbindungen herzustellen und überzeugend zu formulieren.
        </p>

        <div style={styles.content.note}>
          Der entscheidende Punkt: KI löst das Matching-Problem, indem sie
          analysiert, wie dein Profil zu den Jobanforderungen passt. Sie hilft
          dir, genau diese Übereinstimmungen klar und professionell
          herauszuarbeiten - individuell für jede Stelle.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Der Unterschied zu klassischen Bewerbungshilfen</H2>
        <p style={styles.content.paragraph}>
          Viele Bewerber greifen auf Standard-Vorlagen und Musterbewerbungen
          zurück. Diese können zwar als erste Orientierung dienen, lösen aber
          nicht das eigentliche Problem: Sie zeigen nicht, warum genau du für
          diese spezifische Position der ideale Kandidat bist. Mehr zu den
          Problemen mit Standard-Vorlagen erfährst du in unserem Artikel zu{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "anschreiben-vorlagen" },
            })}
            style={linkStyles}
          >
            Anschreiben-Vorlagen
          </a>{" "}
          und{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "lebenslauf-vorlagen" },
            })}
            style={linkStyles}
          >
            Lebenslauf-Vorlagen
          </a>
          .
        </p>

        <p style={styles.content.paragraph}>
          Der Unterschied wird an konkreten Beispielen deutlich: Wenn du etwa
          eine Teilzeitstelle in der Buchhaltung suchst und nebenbei als
          Schatzmeister in einem Sportverein aktiv bist, erkennt die KI diese
          relevante Erfahrung und formuliert daraus etwas wie: "Meine Erfahrung
          in der Verwaltung der Vereinsfinanzen hat mir praktische Einblicke in
          Buchführung und Budgetierung gegeben." Oder wenn du dich als
          Projektmanager bewirbst und in deinem Lebenslauf steht, dass du eine
          Theatergruppe leitest, wandelt die KI dies in einen relevanten
          Vorteil: "Die Organisation von Theaterproduktionen hat meine Fähigkeit
          geschärft, komplexe Projekte mit verschiedenen Beteiligten
          termingerecht zu koordinieren."
        </p>
      </section>
      <section style={styles.content.section}>
        <H2>Wie KI deine Qualifikationen optimal präsentiert</H2>
        <p style={styles.content.paragraph}>
          Ein häufiges Problem beim Bewerben ist, dass wir unsere eigenen
          Stärken oft nicht richtig einschätzen oder sie nicht optimal
          präsentieren können. Viele von uns neigen dazu, wichtige
          Qualifikationen als selbstverständlich anzusehen oder übersehen, wie
          unsere Erfahrungen auf andere Bereiche übertragbar sind.
        </p>

        <p style={styles.content.paragraph}>
          Die KI funktioniert hier wie ein erfahrener Bewerbungscoach, der
          gezielt nachfragt und Verbindungen herstellt. Wenn du zum Beispiel als
          Verkäufer im Einzelhandel gearbeitet hast und dich jetzt im
          B2B-Vertrieb bewirbst, erkennt die KI die übertragbaren Kompetenzen:
          Aus "Kundenberatung im Elektrofachmarkt" wird "Erfahrung in
          kompetenter Beratung bei technisch komplexen Produkten mit
          unterschiedlichen Kundenanforderungen".
        </p>

        <div style={styles.content.note}>
          KI hilft dir, deine Erfahrungen aus der Perspektive des potenziellen
          Arbeitgebers zu sehen und entsprechend zu formulieren - ohne dabei
          etwas zu erfinden oder zu übertreiben.
        </div>

        <H3>Individualisierung statt Standardfloskeln</H3>
        <p style={styles.content.paragraph}>
          Im Gegensatz zu Vorlagen, die mit generischen Aussagen arbeiten,
          analysiert die KI die konkreten Anforderungen der Stelle und deine
          spezifischen Erfahrungen. Nehmen wir ein Beispiel: Eine Stellenanzeige
          sucht jemanden mit "ausgeprägter Teamfähigkeit und der Fähigkeit, auch
          in stressigen Situationen den Überblick zu behalten."
        </p>

        <p style={styles.content.paragraph}>
          Eine Standard-Vorlage würde hier vielleicht schreiben: "Ich bin
          teamfähig und bleibe auch unter Stress gelassen." Die KI hingegen
          sucht in deinem Lebenslauf nach konkreten Beispielen: Wenn du etwa in
          der Gastronomie gearbeitet hast, formuliert sie daraus: "In meiner
          dreijährigen Tätigkeit als Servicekraft habe ich gelernt, auch zu
          Stoßzeiten den Überblick zu behalten und im Team effektiv zu
          kommunizieren, um einen reibungslosen Service zu gewährleisten."
        </p>
      </section>

      <section style={styles.content.section}>
        <H2>KI als interaktiver Bewerbungsprofi</H2>
        <p style={styles.content.paragraph}>
          Ein weiterer wichtiger Unterschied zu klassischen Bewerbungshilfen: KI
          arbeitet interaktiv. Während Ratgeber und Tutorials nur passive
          Informationen liefern, führt die KI einen aktiven Dialog mit dir. Sie
          fragt nach, wenn Informationen fehlen, und hilft dir, deine
          Erfahrungen besser zu reflektieren.
        </p>

        <p style={styles.content.paragraph}>
          Dieser interaktive Prozess hat einen wertvollen Nebeneffekt: Du
          lernst, deine Qualifikationen besser einzuschätzen und zu
          präsentieren. Das hilft dir nicht nur bei der schriftlichen Bewerbung,
          sondern auch im Vorstellungsgespräch. Denn die gleichen Verbindungen,
          die die KI zwischen deinen Erfahrungen und den Stellenanforderungen
          herstellt, kannst du auch im Gespräch nutzen.
        </p>

        <H3>Professionelle Unterstützung für jeden</H3>
        <p style={styles.content.paragraph}>
          Traditionell war professionelle Bewerbungsunterstützung durch Services
          wie{" "}
          <a style={linkStyles} href="https://www.die-bewerbungsschreiber.de/">
            Die Bewerbungsschreiber
          </a>{" "}
          oft eine Frage des Budgets. Diese persönliche Beratung ist wertvoll,
          aber mit Kosten von oft über 100€ pro Bewerbung nicht für jeden
          erschwinglich. KI-Tools wie der{" "}
          <a style={linkStyles} href="https://bewerbungshelfer.net">
            Bewerbungshelfer
          </a>{" "}
          demokratisieren den Zugang zu professioneller Bewerbungsunterstützung.
        </p>

        <p style={styles.content.paragraph}>
          Dabei geht es nicht darum, menschliche Berater zu ersetzen - in
          komplexen Situationen wie Karrierewechseln oder bei der
          grundsätzlichen Karriereplanung ist persönliche Beratung nach wie vor
          sehr wertvoll. Die KI ist vielmehr eine praktische Ergänzung, die dir
          hilft, jede einzelne Bewerbung optimal auf die jeweilige Stelle
          abzustimmen.
        </p>

        <div style={styles.content.note}>
          Die KI kombiniert dabei das Beste aus beiden Welten: Die analytische
          Präzision bei der Auswertung von Stellenanforderungen und die
          Fähigkeit, deine Qualifikationen in überzeugende Formulierungen zu
          übersetzen - und das individuell für jede Bewerbung.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>KI optimal für deine Bewerbung nutzen</H2>
        <p style={styles.content.paragraph}>
          Um das Beste aus KI-gestützter Bewerbungsunterstützung herauszuholen,
          ist es wichtig, sie als das zu verstehen, was sie ist: Ein
          intelligentes Werkzeug, das dir hilft, deine tatsächlichen
          Qualifikationen optimal zu präsentieren. Hier sind die wichtigsten
          Prinzipien für die erfolgreiche Nutzung:
        </p>

        <H3>Ehrlichkeit als Grundprinzip</H3>
        <p style={styles.content.paragraph}>
          Die KI kann nur mit den Informationen arbeiten, die du ihr gibst.
          Bleib bei deinen tatsächlichen Erfahrungen und Qualifikationen - die
          KI wird dir helfen, diese optimal auf die Stellenanforderungen
          abzustimmen. Übertreibungen oder erfundene Qualifikationen schaden
          nicht nur deiner Glaubwürdigkeit, sondern führen auch zu einem
          schlechten Job-Match: Du willst keine Stelle, für die du nicht
          geeignet bist.
        </p>
        <p style={styles.content.paragraph}>
          Die KI unterstützt dich beim Erstellen überzeugender{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "lebenslauf-guide" },
            })}
            style={linkStyles}
          >
            Lebensläufe
          </a>{" "}
          und{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "anschreiben-guide" },
            })}
            style={linkStyles}
          >
            Anschreiben
          </a>
          . Dabei hilft sie dir, die wichtigsten Anforderungen und
          Schlüsselqualifikationen zu identifizieren.
        </p>

        <H3>Der optimale Workflow</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Stellenanzeige analysieren:</strong> Lass die KI die
            wichtigsten Anforderungen und Schlüsselqualifikationen
            identifizieren
          </li>
          <li style={styles.content.listItem}>
            <strong>Eigene Erfahrungen sammeln:</strong> Liste alle relevanten
            Erfahrungen und Qualifikationen auf - auch solche, die auf den
            ersten Blick vielleicht nicht offensichtlich relevant erscheinen
          </li>
          <li style={styles.content.listItem}>
            <strong>Verbindungen herstellen:</strong> Die KI hilft dir,
            Zusammenhänge zwischen deinen Erfahrungen und den
            Stellenanforderungen zu erkennen und überzeugend darzustellen
          </li>
          <li style={styles.content.listItem}>
            <strong>Überprüfen und anpassen:</strong> Lies die generierten Texte
            kritisch und passe sie an, wo nötig. Du kennst deine Geschichte am
            besten
          </li>
        </ul>

        <div style={styles.content.note}>
          Der{" "}
          <a style={linkStyles} href="https://bewerbungshelfer.net">
            Bewerbungshelfer
          </a>{" "}
          führt dich interaktiv durch diesen Prozess und hilft dir, keine
          wichtigen Aspekte zu übersehen. Die KI ist dabei wie ein erfahrener
          Coach, der die richtigen Fragen stellt und dir hilft, deine Stärken zu
          erkennen und optimal im Lebenslauf und Anschreiben zu präsentieren.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Die Zukunft der Bewerbung</H2>
        <p style={styles.content.paragraph}>
          Der Bewerbungsprozess wird sich weiter wandeln. Schon heute setzen
          viele Unternehmen auf digitale Tools und KI-Unterstützung bei der
          Kandidatenauswahl. Dabei geht es aber nicht um einen
          "Wettrüstungswettlauf" zwischen Bewerbern und Unternehmen, sondern
          darum, den Matching-Prozess für beide Seiten effizienter und
          erfolgreicher zu gestalten.
        </p>

        <p style={styles.content.paragraph}>
          KI-Unterstützung bei der Bewerbung wird dabei immer
          selbstverständlicher werden - ähnlich wie heute niemand mehr
          hinterfragt, ob die Nutzung von Rechtschreibprüfung oder
          Layout-Vorlagen legitim ist. Entscheidend bleibt, dass die Technologie
          dazu dient, echte Qualifikationen und Motivation überzeugend zu
          präsentieren.
        </p>
      </section>

      <section style={styles.content.section}>
        <H2>Fazit: KI als legitimer Bewerbungshelfer</H2>
        <p style={styles.content.paragraph}>
          Die Nutzung von KI bei der Bewerbung ist keine Trickserei, sondern
          eine legitime und zeitgemäße Form der Bewerbungsunterstützung. Sie
          hilft dir dabei, das zentrale Problem jeder Bewerbung zu lösen: Die
          überzeugende Darstellung deiner Qualifikationen und Motivation für
          eine spezifische Stelle.
        </p>

        <p style={styles.content.paragraph}>
          Dabei ersetzt die KI nicht dein eigenes Nachdenken oder deine
          Authentizität. Sie ist vielmehr ein intelligenter Assistent, der dir
          hilft, deine tatsächlichen Stärken zu erkennen und optimal zu
          präsentieren. Genau wie ein guter Bewerbungsberater, nur schneller,
          kostengünstiger und für jede einzelne Bewerbung individuell optimiert.
        </p>

        <p style={styles.content.paragraph}>
          Manche Stellen erfordern heute übrigens gar kein klassisches
          Anschreiben mehr - lies dazu unseren Artikel{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "anschreiben-notwendig" },
            })}
            style={linkStyles}
          >
            "Bewerbung ohne Anschreiben: Wann du darauf verzichten kannst"
          </a>
          .
        </p>
        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Am Ende geht es darum, den bestmöglichen Match zwischen dir und
            deinem potenziellen Arbeitgeber zu finden. KI-Tools wie der{" "}
            <a style={linkStyles} href="https://bewerbungshelfer.net">
              Bewerbungshelfer
            </a>{" "}
            unterstützen dich dabei, indem sie dir helfen, deine relevanten
            Qualifikationen klar und überzeugend zu kommunizieren. Das ist nicht
            nur legitim, sondern im Interesse aller Beteiligten - denn auch
            Arbeitgeber wollen den fachlich betsen Kandidaten für die Stelle
            nicht ablehnen, nur weil er seine Qualifikationen nicht optimal
            präsentiert hat.
          </p>
        </div>
      </section>
    </>
  );
}
