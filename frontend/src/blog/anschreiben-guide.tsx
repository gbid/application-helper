import { styles } from "./shared";
import { H2 } from "./shared";
import { H3 } from "./shared";
import { linkStyles } from "./shared";
import { serializeRoute } from "../route";
import { RouteKind } from "../route";

export function AnschreibenGuide() {
  return (
    <>
      <section style={styles.content.section}>
        <p style={styles.content.paragraph}>
          Ein überzeugendes Anschreiben zu verfassen gehört zu den größten
          Herausforderungen im Bewerbungsprozess. Da Personaler oft hunderte
          Bewerbungen auf eine Stelle erhalten, ist das Anschreiben deine
          Chance, aus der Masse herauszustechen. Dabei hat sich in den letzten
          Jahren viel verändert: Während früher oft standardisierte
          Formulierungen und Floskeln verwendet wurden, erwarten Unternehmen
          heute eine deutlich persönlichere und zielgerichtetere Ansprache.
        </p>

        <p style={styles.content.paragraph}>
          Gerade bei der aktuellen Dynamik am Arbeitsmarkt kommt es besonders
          darauf an, deine spezifischen Qualifikationen überzeugend
          darzustellen. Das gilt für erfahrene Bewerber genauso wie für{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "berufseinsteiger" },
            })}
            style={linkStyles}
          >
            Berufseinsteiger
          </a>
          . Ein durchdachtes Anschreiben macht dabei oft den entscheidenden
          Unterschied.
        </p>

        <div style={styles.content.note}>
          Kurz & Knapp: Ein erfolgreiches Anschreiben ist individuell auf die
          Stelle zugeschnitten, vermittelt authentisch deine Motivation und
          belegt deine Eignung mit konkreten, relevanten Beispielen aus deinem
          Werdegang.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Die häufigsten Stolperfallen</H2>
        <p style={styles.content.paragraph}>
          Bevor wir uns anschauen, wie ein überzeugendes Anschreiben aufgebaut
          ist, lass uns die typischen Fehler betrachten, die viele Bewerbende
          immer wieder machen - und die dazu führen, dass ihre Bewerbung direkt
          aussortiert wird.
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Standardfloskeln und Phrasen:</strong> "Hiermit bewerbe ich
            mich..." oder "Über eine Einladung würde ich mich freuen" sind nicht
            nur überflüssig, sondern signalisieren auch: Hier hat sich jemand
            keine besondere Mühe gegeben. Gleiches gilt für Formulierungen wie
            "Ich bin teamfähig und belastbar" - ohne konkrete Beispiele sind das
            leere Worthülsen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Fehlender Bezug zur Stelle:</strong> Eines der größten
            Probleme sind Anschreiben, die an jedes beliebige Unternehmen gehen
            könnten. Wenn du nicht konkret darauf eingehst, warum genau diese
            Position und dieses Unternehmen dich reizen und warum du gut dazu
            passt, wird dein Anschreiben kaum überzeugen. Besonders kritisch
            wird es, wenn Textbausteine erkennbar sind oder sogar vergessen
            wurde, den Firmennamen anzupassen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Zu lang oder zu kurz:</strong> Personaler haben wenig Zeit.
            Ein Anschreiben sollte eine DIN-A4-Seite nicht überschreiten, aber
            auch nicht zu kurz sein. Zwei bis drei aussagekräftige Absätze sind
            das Minimum, um deine Motivation und Eignung überzeugend
            darzustellen. Dabei gilt: Jeder Satz muss einen Mehrwert bieten.
          </li>
          <li style={styles.content.listItem}>
            <strong>Unspezifische Erfolge:</strong> "Ich habe viel Erfahrung im
            Projektmanagement" ist eine schwache Aussage. Konkrete Erfolge wie
            "In meinem letzten Projekt konnte ich durch die Einführung agiler
            Methoden die Entwicklungszeit um 30% reduzieren" überzeugen dagegen
            sofort.
          </li>
        </ul>
      </section>

      <section style={styles.content.section}>
        <H2>Perfekter Aufbau: Diese Struktur überzeugt</H2>
        <p style={styles.content.paragraph}>
          Eine klare Struktur ist das Grundgerüst deines Anschreibens. Dabei
          geht es nicht um starre Formeln, sondern darum, deine Motivation und
          Eignung logisch und überzeugend darzulegen. Personalverantwortliche
          scannen Anschreiben zunächst nur kurz - eine übersichtliche Gliederung
          hilft ihnen dabei, die wichtigsten Informationen schnell zu erfassen.
        </p>

        <H3>Der Einstieg: Dein erster Eindruck</H3>
        <p style={styles.content.paragraph}>
          Vergiss "Hiermit bewerbe ich mich..." - dieser erste Satz ist deine
          Chance, Interesse zu wecken. Ein guter Einstieg zeigt sofort, dass du
          dich mit der Position und dem Unternehmen auseinandergesetzt hast. Zum
          Beispiel: "Die Verbindung von Datenanalyse und Kundenberatung in der
          ausgeschriebenen Position als Business Intelligence Analyst hat mich
          begeistert, da sie exakt an meine Erfahrungen aus dem Controlling bei
          [bisheriger Arbeitgeber] anknüpft."
        </p>

        <p style={styles.content.paragraph}>
          Auch der Bezug zu aktuellen Entwicklungen kann ein starker Einstieg
          sein: "Ihr Fokus auf nachhaltige Mobilitätslösungen, wie in ihrem
          kürzlich gestarteten E-Bike-Sharing Projekt, deckt sich mit meiner
          Vision einer umweltfreundlichen Stadtentwicklung, die ich in meiner
          bisherigen Tätigkeit als Verkehrsplanerin verfolgt habe."
        </p>

        <H3>Der Hauptteil: Deine Qualifikationen gezielt präsentieren</H3>
        <p style={styles.content.paragraph}>
          Hier zeigst du, warum du die ideale Besetzung für die Position bist.
          Analysiere dafür die Stellenanzeige genau: Welche Anforderungen werden
          genannt? Welche Aufgaben sollen übernommen werden? Wähle dann zwei bis
          drei Kernaspekte aus, bei denen deine Erfahrungen besonders gut
          passen.
        </p>

        <p style={styles.content.paragraph}>
          Wichtig ist dabei die Verbindung von konkreten Erfolgen mit den
          Anforderungen der neuen Stelle. Ein Beispiel: "In meiner aktuellen
          Position habe ich die Umstellung auf SAP S/4HANA in der Buchhaltung
          geleitet. Dabei konnte ich nicht nur meine technische Expertise
          einbringen, sondern auch mein Team durch Schulungen und regelmäßige
          Feedback-Gespräche erfolgreich durch den Veränderungsprozess führen.
          Diese Erfahrung in der Kombination von Prozessoptimierung und
          Mitarbeiterführung möchte ich gerne in Ihre geplante Digitalisierung
          der Controlling-Abteilung einbringen."
        </p>

        <div style={styles.content.note}>
          Vermeide dabei allgemeine Aussagen wie "Ich arbeite gerne im Team"
          oder "Ich bin sehr motiviert". Stattdessen: "Als Scrum Master habe ich
          drei cross-funktionale Teams koordiniert und durch die Einführung
          täglicher Stand-ups und zweiwöchiger Retrospektiven die Zusammenarbeit
          deutlich verbessert. Die Entwicklungszyklen verkürzten sich dadurch
          von sechs auf vier Wochen."
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Besonderheiten verschiedener Branchen</H2>
        <p style={styles.content.paragraph}>
          Die Erwartungen an Anschreiben unterscheiden sich je nach Branche und
          Position erheblich. Was in einem Start-up als innovativ und mutig
          gilt, könnte bei einer Behörde deplatziert wirken. Dabei geht es nicht
          nur um den Ton, sondern auch um die Schwerpunkte, die du setzt.
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>IT & Tech:</strong> Hier zählen konkrete technische Skills
            und Projekterfolge. Zeige deine Expertise in relevanten
            Technologien, aber vergiss nicht die Soft Skills: Agile Methoden,
            Teamfähigkeit und die Fähigkeit, komplexe Themen verständlich zu
            kommunizieren. Ein Beispiel: "Als Lead Developer habe ich nicht nur
            das Backend in Node.js entwickelt, sondern auch regelmäßig
            Requirements-Workshops mit den Fachabteilungen durchgeführt, um die
            Anwendung optimal auf die Nutzerbedürfnisse auszurichten."
          </li>

          <li style={styles.content.listItem}>
            <strong>Vertrieb:</strong> Zahlen und messbare Erfolge sind hier
            besonders wichtig. "Im letzten Jahr konnte ich meinen Kundenstamm um
            40% erweitern und den Umsatz in meiner Region von 2,1 auf 3,4
            Millionen Euro steigern." Zeige auch dein Verständnis für
            Verkaufspsychologie und moderne Vertriebsmethoden.
          </li>

          <li style={styles.content.listItem}>
            <strong>Öffentlicher Dienst:</strong> Hier sind Formalität und
            Präzision gefragt. Beziehe dich auf die exakte Stellenausschreibung
            inklusive Kennziffer. Betone deine Kenntnisse relevanter
            Verwaltungsvorschriften und deine Erfahrung im Umgang mit
            verschiedenen Interessengruppen. Die Betonung liegt auf
            Zuverlässigkeit, Genauigkeit und der Fähigkeit, auch in komplexen
            Strukturen effektiv zu arbeiten.
          </li>

          <li style={styles.content.listItem}>
            <strong>Marketing & Kreativbereich:</strong> Hier darfst und
            solltest du kreativer sein - sowohl im Schreibstil als auch im
            Layout. Aber Vorsicht: Auch originelle Anschreiben müssen
            professionell und zielgerichtet sein. Zeige deine Kreativität durch
            gelungene Formulierungen und relevante Erfolgsgeschichten: "Die von
            mir konzipierte Social-Media-Kampagne erreichte durch den Einsatz
            von User-Generated Content eine organische Reichweite von über
            500.000 Nutzern und steigerte die Engagement-Rate um 180%."
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Verschiedene Online-Plattformen wie{" "}
          <a style={linkStyles} href="https://anschreiben.com">
            XING
          </a>{" "}
          bieten mittlerweile Vorlagen und Tools für unterschiedliche Branchen
          an. Diese können als erste Orientierung dienen, ersetzen aber nicht
          die notwendige individuelle Anpassung. Besonders wichtig ist dabei,
          dass nicht nur das Anschreiben, sondern auch der Lebenslauf auf die
          jeweilige Stelle zugeschnitten wird - eine Aufgabe, bei der der{" "}
          <a style={linkStyles} href="https://bewerbungshelfer.net/application">
            Bewerbungshelfer
          </a>{" "}
          durch seine KI-gestützte Analyse der Stellenanzeige besonders effektiv
          unterstützt.
        </p>
      </section>

      <section style={styles.content.section}>
        <H2>Der richtige Ton macht die Musik</H2>
        <p style={styles.content.paragraph}>
          Eine der größten Herausforderungen beim Schreiben des Anschreibens ist
          der richtige Ton. Zu förmlich wirkt distanziert und steif, zu locker
          unprofessionell. Der optimale Ton liegt meist dazwischen und hängt
          stark von Branche und Unternehmenskultur ab. Ein guter Anhaltspunkt
          ist oft die Kommunikation des Unternehmens selbst - wie präsentiert es
          sich auf seiner Website und in sozialen Medien?
        </p>

        <p style={styles.content.paragraph}>
          Vergleichen wir zwei Formulierungen für die gleiche Information:
          "Aufgrund meiner mehrjährigen Tätigkeit im Bereich der
          Softwareentwicklung verfüge ich über fundierte Kenntnisse in der
          Programmierung" klingt distanziert und wenig greifbar. Besser: "Als
          Entwickler habe ich in den letzten drei Jahren mehrere
          React-Native-Apps von der Konzeption bis zum App Store Release
          begleitet und dabei eng mit UX-Designern und Produktmanagern
          zusammengearbeitet."
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Ein Praxistipp: Lies dir deinen Text laut vor. Klingen die Sätze
            natürlich? Würdest du sie so auch in einem Vorstellungsgespräch
            sagen? Das Anschreiben soll dich als Person authentisch
            repräsentieren, nicht wie ein Bewerbungsratgeber aus den 90er Jahren
            klingen. Stolperst du über Formulierungen oder fühlst dich unwohl
            dabei, sie auszusprechen, ist das ein sicheres Zeichen für
            Überarbeitung.
          </p>
        </div>

        <p style={styles.content.paragraph}>
          Besonders wichtig ist der aktive Schreibstil. Statt "Für die Position
          bringe ich Erfahrung in der Kundenberatung mit" besser: "In über 200
          Beratungsgesprächen habe ich Kunden bei der Auswahl und
          Implementierung von CRM-Systemen unterstützt." Der aktive Stil macht
          deine Erfahrungen greifbar und zeigt dein Engagement. Gleichzeitig
          vermeidest du so Konjunktive und Abschwächungen wie "könnte", "würde"
          oder "hätte".
        </p>
      </section>

      <section style={styles.content.section}>
        <H2>Moderne Unterstützung für deine Bewerbung</H2>
        <p style={styles.content.paragraph}>
          Die Zeiten, in denen Bewerber alleine vor dem leeren Blatt saßen, sind
          vorbei. Heute gibt es verschiedene Möglichkeiten, professionelle
          Unterstützung für deine Bewerbung zu bekommen. Dabei ist wichtig zu
          verstehen, welche Option für deine spezifische Situation am besten
          geeignet ist.
        </p>

        <H3>Klassische Bewerbungsberatung</H3>
        <p style={styles.content.paragraph}>
          Etablierte Dienstleister wie{" "}
          <a style={linkStyles} href="https://www.die-bewerbungsschreiber.de/">
            Die Bewerbungsschreiber
          </a>{" "}
          bieten eine umfassende persönliche Beratung. Sie analysieren deinen
          Werdegang im Detail und erstellen dir für eine konkrete eine
          maßgeschneiderte Bewerbung. Diese Option ist besonders wertvoll, wenn
          du einen Karrierewechsel planst oder nach längerer Pause wieder ins
          Berufsleben einsteigst. Der persönliche Austausch hilft dabei, deine
          Stärken zu erkennen und optimal zu präsentieren. Allerdings sind die
          Kosten dieser manuellen Dienstleistung oft hoch, meist weit über 100€
          pro Bewerbung.
        </p>

        <H3>Klassische Vorlagen und Muster</H3>
        <p style={styles.content.paragraph}>
          Im Internet findest du unzählige vorgefertigte Vorlagen und Muster für
          Anschreiben. Diese können zwar als erste Orientierung für Struktur und
          Aufbau dienen, haben aber einen entscheidenden Nachteil: Sie sind
          generisch und austauschbar. Häufig enthalten sie Standardfloskeln wie
          "Hiermit bewerbe ich mich..." oder "Über eine Einladung würde ich mich
          freuen". Genau diese vorformulierten Texte sind es, die Personaler
          sofort als "Massenware" erkennen. Das Wichtigste am Anschreiben - die
          individuelle Verbindung zwischen deinen spezifischen Erfahrungen und
          den konkreten Anforderungen der Stelle - fehlt bei solchen Vorlagen
          völlig.
        </p>

        <H3>KI-gestützte Anschreiben-Generatoren</H3>
        <p style={styles.content.paragraph}>
          Die Technologie verändert die Art, wie wir Bewerbungen schreiben.{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "ki-nutzung" },
            })}
            style={linkStyles}
          >
            Künstliche Intelligenz kann dabei helfen
          </a>
          , individuelle und überzeugende Anschreiben zu erstellen. Selbst
          etablierte Jobportale wie{" "}
          <a
            style={linkStyles}
            href="https://www.stepstone.de/anschreiben-erstellen"
          >
            Stepstone
          </a>{" "}
          und{" "}
          <a style={linkStyles} href="https://anschreiben.com">
            XING
          </a>{" "}
          bieten mittlerweile auch KI-basierte Tools an, die bei der Erstellung
          von Anschreiben unterstützen. Diese Entwicklung zeigt, wie wichtig
          individualisierte Bewerbungsunterlagen heute sind. Allerdings
          konzentrieren sich diese Tools meist nur auf das Anschreiben und
          berücksichtigen nicht den wichtigen Zusammenhang mit deinem
          Lebenslauf. Der{" "}
          <a style={linkStyles} href="https://bewerbungshelfer.net/application">
            Bewerbungshelfer
          </a>{" "}
          geht hier einen Schritt weiter: Die KI analysiert sowohl deinen
          Lebenslauf als auch die Stellenausschreibung und kann so sehr
          spezifische Vorschläge machen. Der besondere Vorteil liegt dabei in
          der Möglichkeit, nicht nur dein Anschreiben, sondern auch deinen
          Lebenslauf auf jede Stelle zuzuschneiden. Dies ist besonders wichtig,
          da viele Unternehmen heute Bewerbungen automatisiert scannen. Diese
          sogenannten ATS (Applicant Tracking Systems) beurteilen basierend auf
          Schlüsselwörtern und -phrasen, ob ein Kandidat die für die Stelle
          ausgeschriebenen Qualifikationen erfüllt. Ein auf die Stelle
          zugeschnittener Lebenslauf ist daher entscheidend, um überhaupt in die
          engere Auswahl zu kommen.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Unabhängig von der gewählten Unterstützung gilt: Das finale
            Anschreiben muss authentisch nach dir klingen und deine persönliche
            Motivation und Eignung herausarbeiten. Nutze Hilfsmittel als
            Inspiration und Strukturhilfe, aber behalte die Kontrolle über den
            endgültigen Text.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Checkliste vor dem Absenden</H2>
        <p style={styles.content.paragraph}>
          Bevor du deine Bewerbung abschickst, nimm dir Zeit für eine gründliche
          Überprüfung. Diese Checkliste hilft dir dabei, nichts Wichtiges zu
          übersehen:
        </p>

        <H3>Inhaltliche Prüfung</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            ✓ <strong>Individualisierung:</strong> Nimmst du konkret Bezug auf
            die Stelle und das Unternehmen? Hast du die wichtigsten
            Anforderungen aus der Stellenanzeige mit deinen Erfahrungen
            verknüpft?
          </li>
          <li style={styles.content.listItem}>
            ✓ <strong>Aktualität:</strong> Sind alle Angaben zu Position,
            Unternehmen und Ansprechpartner korrekt? Besonders peinlich:
            Falscher Firmenname oder veraltete Stellenbezeichnung.
          </li>
          <li style={styles.content.listItem}>
            ✓ <strong>Motivation:</strong> Wird klar, warum du dich für genau
            diese Position interessierst? Hast du deine spezifische Motivation
            für das Unternehmen überzeugend dargestellt?
          </li>
          <li style={styles.content.listItem}>
            ✓ <strong>Konkrete Beispiele:</strong> Hast du deine Erfolge und
            Erfahrungen mit messbaren Ergebnissen belegt? Vermeidest du leere
            Floskeln und Allgemeinplätze?
          </li>
        </ul>

        <H3>Formale Prüfung</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            ✓ <strong>Rechtschreibung & Grammatik:</strong> Nutze nicht nur die
            automatische Korrektur, sondern lies den Text auch mehrmals selbst.
            Noch besser: Lass eine zweite Person gegenlesen.
          </li>
          <li style={styles.content.listItem}>
            ✓ <strong>Format & Layout:</strong> Ist dein Anschreiben einheitlich
            formatiert? Stimmen Schriftart und -größe mit deinem Lebenslauf
            überein? Passt alles auf eine Seite?
          </li>
          <li style={styles.content.listItem}>
            ✓ <strong>Kontaktdaten:</strong> Sind alle deine Kontaktdaten
            aktuell und vollständig? Auch E-Mail-Adresse und Telefonnummer
            nochmal prüfen!
          </li>
          <li style={styles.content.listItem}>
            ✓ <strong>Dateiformat:</strong> PDF-Format verwenden und die Datei
            sinnvoll benennen, z.B.
            "Anschreiben_Max_Mustermann_Frontend_Developer.pdf"
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Ein häufig übersehener Punkt: Prüfe auch deinen Lebenslauf nochmal
            auf Konsistenz mit dem Anschreiben. Die Stärken und Erfahrungen, die
            du im Anschreiben hervorhebst, sollten sich auch in deinem
            Lebenslauf wiederfinden und dort idealerweise noch detaillierter
            dargestellt sein. Unsere KI ist daher so konzipiert, dass sie dein
            Anschreiben und deinen Lebenslauf aufeinander abstimmt und so eine
            konsistente und stimmige Bewerbung sicherstellt.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Fazit: Der Weg zum überzeugenden Anschreiben</H2>
        <p style={styles.content.paragraph}>
          Die Art, wie wir uns bewerben, hat sich in den letzten Jahren stark
          gewandelt. Während früher standardisierte Anschreiben die Norm waren,
          ist heute die individuelle Anpassung auf jede einzelne Stelle der
          Schlüssel zum Erfolg. Dies gilt nicht nur für das Anschreiben, sondern
          für die gesamte Bewerbung - vom Lebenslauf bis zum
          Motivationsschreiben.
        </p>

        <p style={styles.content.paragraph}>
          Die große Herausforderung dabei: Jede Bewerbung erfordert Zeit und
          sorgfältige Anpassung. Du musst die Stellenanzeige analysieren, deine
          relevanten Erfahrungen identifizieren und beides überzeugend
          miteinander verbinden. Der Aufwand lohnt sich jedoch: Ein
          durchdachtes, individuelles Anschreiben hebt dich von der Masse ab und
          erhöht deine Chancen erheblich.
        </p>

        <p style={styles.content.paragraph}>
          Die gute Nachricht ist, dass du bei dieser Aufgabe nicht alleine bist.
          Von klassischer Bewerbungsberatung über moderne KI-Tools bis hin zu
          spezialisierten Dienstleistern - es gibt verschiedene Möglichkeiten
          der Unterstützung. Wichtig ist, dass du die für dich passende
          Herangehensweise findest und dabei nie das Wichtigste aus den Augen
          verlierst: Dein Anschreiben muss authentisch sein und deine
          persönliche Motivation und Eignung für die Stelle überzeugend
          darstellen.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Ein letzter, wichtiger Tipp: Viele von uns verkaufen sich in
            Bewerbungen unter Wert - nicht aus mangelnder Qualifikation, sondern
            weil wir uns davor scheuen, unsere Erfolge und Stärken selbstbewusst
            zu formulieren. Ein Perspektivwechsel kann hier Wunder bewirken. Der{" "}
            <a
              style={linkStyles}
              href="https://bewerbungshelfer.net/application"
            >
              Bewerbungshelfer
            </a>{" "}
            wurde genau dafür entwickelt: Die KI analysiert deinen Lebenslauf
            und zeigt dir, wie ein Außenstehender deine Qualifikationen
            präsentieren würde - professionell und überzeugend. Diese neue
            Perspektive wird dir nicht nur beim Anschreiben helfen, sondern auch
            mehr Selbstvertrauen für Vorstellungsgespräche geben.
          </p>
        </div>
      </section>
    </>
  );
}
