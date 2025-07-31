import { styles } from "./shared";
import { H2 } from "./shared";
import { H3 } from "./shared";
import { linkStyles } from "./shared";
import { serializeRoute } from "../route";
import { RouteKind } from "../route";

export function ProbearbeitenUndProbezeit() {
  return (
    <>
      <section style={styles.content.section}>
        <p style={styles.content.paragraph}>
          Der Einstieg in ein neues Arbeitsverhältnis ist sowohl für
          Arbeitnehmer als auch für Arbeitgeber eine entscheidende Phase. Mit
          Probearbeiten und Probezeit existieren zwei wichtige Instrumente, die
          beiden Seiten ermöglichen, die Zusammenarbeit zu testen, bevor eine
          langfristige Bindung eingegangen wird. Besonders in Zeiten zunehmender
          Homeoffice- Regelungen stellen sich viele Fragen: Wie gestaltet sich
          die Probezeit im Homeoffice? Welche Rechte und Pflichten haben beide
          Seiten? Und wie kann man diese Phase optimal für den eigenen
          beruflichen Erfolg nutzen?
        </p>

        <p style={styles.content.paragraph}>
          Ob bei der Einarbeitung vor Ort oder im hybriden Arbeitsmodell – die
          ersten Monate im neuen Job sind entscheidend für deine langfristigen
          Erfolgsperspektiven. Dieser Artikel gibt dir einen umfassenden
          Überblick über deine rechtliche Situation und zeigt praxiserprobte
          Strategien, wie du sowohl Probearbeiten als auch die Probezeit
          erfolgreich meisterst – selbst wenn ein großer Teil davon im
          Homeoffice stattfindet.
        </p>

        <div style={styles.content.note}>
          Kurz & Knapp: Probearbeiten und Probezeit sind rechtlich klar
          geregelt, aber oft missverstanden. Während ein Probearbeiten höchstens
          einen Tag dauern sollte und unbezahlt sein kann, ist die Probezeit ein
          echter Teil des Arbeitsverhältnisses mit verkürzten Kündigungsfristen.
          Im Homeoffice sind klare Kommunikation und Eigeninitiative besonders
          wichtig, um die Probezeit erfolgreich zu bestehen. Nutze diese Zeit,
          um deine Fähigkeiten zu zeigen und Beziehungen aufzubauen – mit der
          richtigen Strategie wird die Probezeit zum Sprungbrett für deine
          Karriere.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Probearbeiten verstehen: Rechtlicher Rahmen und Grenzen</H2>
        <p style={styles.content.paragraph}>
          Bevor wir uns der Probezeit widmen, klären wir ein häufiges
          Missverständnis: Das Probearbeiten ist nicht dasselbe wie die
          Probezeit. Beim Probearbeiten – auch Einfühlungsverhältnis oder
          Schnuppertag genannt – geht es darum, einen ersten praktischen
          Eindruck vom möglichen Arbeitsverhältnis zu bekommen, bevor ein
          Vertrag unterschrieben wird.
        </p>

        <H3>Was ist rechtlich beim Probearbeiten erlaubt?</H3>
        <p style={styles.content.paragraph}>
          Das Probearbeiten bewegt sich in einem rechtlichen Graubereich.
          Folgende Regeln solltest du unbedingt kennen:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Dauer:</strong> Ein Probearbeiten sollte in der Regel
            maximal einen Tag dauern. Längere Zeiträume könnten bereits als
            Arbeitsverhältnis ausgelegt werden.
          </li>
          <li style={styles.content.listItem}>
            <strong>Vergütung:</strong> Ein kurzes Probearbeiten kann auch
            unbezahlt sein, wenn es primär dem Kennenlernen dient und keine
            wirtschaftlich verwertbare Arbeitsleistung erbracht wird.
          </li>
          <li style={styles.content.listItem}>
            <strong>Versicherungsschutz:</strong> Auch während des
            Probearbeitens besteht grundsätzlich Unfallversicherungsschutz durch
            die Berufsgenossenschaft des Betriebs.
          </li>
          <li style={styles.content.listItem}>
            <strong>Keine Arbeitspflicht:</strong> Während des Probearbeitens
            besteht keine eigentliche Arbeitspflicht, und du solltest nicht in
            den regulären Betriebsablauf eingegliedert werden.
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Ein seriöses Unternehmen wird dir für ein Probearbeiten klare Regeln
          nennen und schriftlich festhalten, dass es sich um ein unverbindliches
          Kennenlernen handelt. Vorsicht ist geboten, wenn du mehrere Tage
          „probearbeiten" sollst oder konkrete Arbeitsleistungen erbringen musst
          – hier könnte es sich um versteckte unbezahlte Arbeit handeln.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Achte darauf, dass ein Probearbeiten nicht mit einem Praktikum
            verwechselt wird. Während ein Probearbeiten dem kurzen gegenseitigen
            Kennenlernen dient, ist ein Praktikum ein längerfristiges
            Vertragsverhältnis mit eigenen Rechten und Pflichten, das in der
            Regel auch vergütet werden muss (Mindestlohn seit 2020 bei Praktika
            über drei Monaten).
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Die Probezeit: Dein rechtlicher Status auf dem Prüfstand</H2>
        <p style={styles.content.paragraph}>
          Im Gegensatz zum Probearbeiten ist die Probezeit bereits Teil eines
          bestehenden Arbeitsverhältnisses. Sie dient beiden Seiten zur Prüfung,
          ob die Zusammenarbeit wie gewünscht funktioniert, und bietet durch
          verkürzte Kündigungsfristen mehr Flexibilität.
        </p>

        <H3>Rechtliche Grundlagen der Probezeit</H3>
        <p style={styles.content.paragraph}>
          Die Probezeit ist gesetzlich in § 622 Abs. 3 BGB verankert und hat
          folgende Kernmerkmale:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Maximale Dauer:</strong> Eine Probezeit darf maximal sechs
            Monate betragen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Kündigungsfrist:</strong> Während der Probezeit gilt eine
            verkürzte gesetzliche Kündigungsfrist von zwei Wochen (statt vier
            Wochen bei regulären Arbeitsverhältnissen).
          </li>
          <li style={styles.content.listItem}>
            <strong>Kündigungsschutz:</strong> Der allgemeine Kündigungsschutz
            nach dem Kündigungsschutzgesetz gilt erst nach Ablauf von sechs
            Monaten.
          </li>
          <li style={styles.content.listItem}>
            <strong>Vergütung:</strong> Während der Probezeit hast du Anspruch
            auf das vereinbarte Gehalt und alle im Vertrag festgelegten
            Arbeitnehmervergünstigungen.
          </li>
        </ul>

        <H3>Besonderheiten bei befristeten Verträgen</H3>
        <p style={styles.content.paragraph}>
          Auch bei befristeten Arbeitsverträgen kann eine Probezeit vereinbart
          werden. Wichtig ist dabei:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Die Probezeit sollte in einem angemessenen Verhältnis zur
            Gesamtdauer des befristeten Vertrags stehen.
          </li>
          <li style={styles.content.listItem}>
            Bei sehr kurzen befristeten Verträgen (z.B. drei Monate) kann eine
            sechsmonatige Probezeit unangemessen und damit unwirksam sein.
          </li>
          <li style={styles.content.listItem}>
            Eine Faustregel besagt, dass die Probezeit nicht mehr als 25% der
            Gesamtlaufzeit des befristeten Vertrags betragen sollte.
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Wichtig: Die Probezeit muss ausdrücklich im Arbeitsvertrag
            vereinbart werden. Fehlt eine solche Vereinbarung, gilt automatisch
            die normale Kündigungsfrist von vier Wochen zum 15. oder zum Ende
            eines Kalendermonats. Achte daher beim Vertragsabschluss genau auf
            die Formulierungen zur Probezeit.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Probezeit im Homeoffice: Besondere Herausforderungen meistern</H2>
        <p style={styles.content.paragraph}>
          Die zunehmende Verbreitung von Homeoffice hat auch Auswirkungen auf
          die Gestaltung der Probezeit. Wenn du deine ersten Monate im neuen Job
          teilweise oder vollständig im Homeoffice verbringst, ergeben sich
          besondere Herausforderungen – aber auch Chancen.
        </p>

        <H3>Rechtliche Besonderheiten im Homeoffice</H3>
        <p style={styles.content.paragraph}>
          Grundsätzlich gelten im Homeoffice während der Probezeit dieselben
          rechtlichen Rahmenbedingungen wie bei der Arbeit im Büro. Dennoch gibt
          es einige Besonderheiten zu beachten:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Arbeitsschutz:</strong> Auch im Homeoffice muss der
            Arbeitgeber für angemessene Arbeitsbedingungen sorgen. Dies umfasst
            ergonomische Aspekte ebenso wie Arbeitszeitregelungen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Datenschutz:</strong> Im Homeoffice gelten besondere
            Anforderungen an den Datenschutz. Stelle sicher, dass du die
            entsprechenden Richtlinien deines Arbeitgebers kennst und einhältst.
          </li>
          <li style={styles.content.listItem}>
            <strong>Arbeitsmittel:</strong> Die Frage, wer die erforderlichen
            Arbeitsmittel (Computer, Internet, Möbel) stellt, sollte vertraglich
            geregelt sein. In der Regel ist der Arbeitgeber verpflichtet, die
            notwendige Ausstattung zu stellen oder deren Kosten zu erstatten.
          </li>
          <li style={styles.content.listItem}>
            <strong>Erreichbarkeit:</strong> Die erwarteten Kernarbeitszeiten
            und Erreichbarkeitszeiten sollten klar definiert sein.
          </li>
        </ul>

        <H3>Strategien für die erfolgreiche Probezeit im Homeoffice</H3>
        <p style={styles.content.paragraph}>
          Die fehlende physische Präsenz im Büro kann es schwieriger machen,
          Beziehungen aufzubauen und sich ins Team zu integrieren. Umso
          wichtiger ist es, proaktive Strategien zu entwickeln:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Regelmäßige Check-ins:</strong> Vereinbare regelmäßige
            virtuelle Treffen mit deinem Vorgesetzten, um Feedback zu erhalten
            und Fragen zu klären.
          </li>
          <li style={styles.content.listItem}>
            <strong>Sichtbarkeit schaffen:</strong> Melde dich in virtuellen
            Meetings zu Wort, teile Fortschritte in Teamchats und mache deine
            Leistungen sichtbar.
          </li>
          <li style={styles.content.listItem}>
            <strong>Dokumentiere deine Erfolge:</strong> Führe ein
            „Erfolgsjournal", in dem du Projekte, positive Rückmeldungen und
            erreichte Meilensteine festhältst. Dies kann bei Feedback-Gesprächen
            sehr nützlich sein.
          </li>
          <li style={styles.content.listItem}>
            <strong>Informelle Kontakte pflegen:</strong> Nutze virtuelle
            Kaffeepausen oder Team-Events, um Kollegen auch auf informeller
            Ebene kennenzulernen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Eigeninitiative zeigen:</strong> Im Homeoffice ist
            selbstständiges Arbeiten noch wichtiger. Zeige Eigeninitiative und
            suche aktiv nach Lösungen, bevor du um Hilfe bittest.
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Eine hybride Arbeitsform – also eine Kombination aus Homeoffice und
          Präsenz im Büro – kann während der Probezeit besonders vorteilhaft
          sein. So kannst du die Flexibilität des Homeoffice nutzen und
          gleichzeitig persönliche Kontakte im Unternehmen aufbauen.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Tipp: Optimiere deinen Homeoffice-Arbeitsplatz von Anfang an. Eine
            professionelle Umgebung mit guter Beleuchtung, einem aufgeräumten
            Hintergrund für Videokonferenzen und stabiler Internetverbindung
            hinterlässt einen positiven Eindruck bei virtuellen Meetings. Mehr
            dazu findest du im{" "}
            <a
              href={serializeRoute({
                kind: RouteKind.Blog,
                blogRoute: { kind: "anschreiben-guide" },
              })}
              style={linkStyles}
            >
              Bewerbungs-Guide
            </a>
            .
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Die ersten 100 Tage: Strategien für einen erfolgreichen Start</H2>
        <p style={styles.content.paragraph}>
          Die ersten drei Monate – oft auch als die „ersten 100 Tage" bezeichnet
          – sind entscheidend für deinen langfristigen Erfolg in der neuen
          Position. In dieser Zeit bildet sich das Fundament für deine
          zukünftige Zusammenarbeit mit Kollegen und Vorgesetzten.
        </p>

        <H3>Phase 1: Die ersten Wochen – Orientierung und Einarbeitung</H3>
        <p style={styles.content.paragraph}>
          In den ersten Wochen geht es vor allem darum, das Unternehmen, seine
          Strukturen und Prozesse kennenzulernen:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Beobachten und Zuhören:</strong> Verschaffe dir einen
            Überblick über Unternehmenskultur, ungeschriebene Regeln und
            Erwartungen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Fragen stellen:</strong> Zeige Interesse und scheue dich
            nicht, Fragen zu stellen. Dies signalisiert Lernbereitschaft und
            Engagement.
          </li>
          <li style={styles.content.listItem}>
            <strong>Erwartungen klären:</strong> Besprich mit deinem
            Vorgesetzten, welche konkreten Ziele du in der Probezeit erreichen
            sollst.
          </li>
          <li style={styles.content.listItem}>
            <strong>Beziehungen aufbauen:</strong> Lerne wichtige
            Ansprechpartner, Kollegen und Teammitglieder kennen.
          </li>
        </ul>

        <H3>
          Phase 2: Der zweite Monat – Selbstständig arbeiten und erste Erfolge
        </H3>
        <p style={styles.content.paragraph}>
          Nach der initialen Einarbeitung solltest du zunehmend eigenständig
          arbeiten können:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Eigenverantwortung übernehmen:</strong> Zeige, dass du
            Aufgaben selbstständig und verantwortungsbewusst erledigst.
          </li>
          <li style={styles.content.listItem}>
            <strong>Zwischenfeedback einholen:</strong> Frage nach einem
            Zwischenfeedback, um frühzeitig mögliche Verbesserungspotenziale zu
            erkennen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Lösungsorientiert arbeiten:</strong> Bring nicht nur
            Probleme zur Sprache, sondern gleich mögliche Lösungsansätze.
          </li>
          <li style={styles.content.listItem}>
            <strong>Erste Erfolge verbuchen:</strong> Konzentriere dich darauf,
            kleinere Projekte erfolgreich abzuschließen.
          </li>
        </ul>

        <H3>
          Phase 3: Der dritte Monat – Mehrwert zeigen und Position festigen
        </H3>
        <p style={styles.content.paragraph}>
          Im dritten Monat solltest du bereits einen echten Beitrag zum Team
          leisten können:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Mehrwert demonstrieren:</strong> Zeige, welchen konkreten
            Nutzen du für das Unternehmen bringst.
          </li>
          <li style={styles.content.listItem}>
            <strong>Netzwerk ausbauen:</strong> Erweitere dein internes Netzwerk
            auch über die unmittelbaren Teamgrenzen hinaus.
          </li>
          <li style={styles.content.listItem}>
            <strong>Verbesserungsvorschläge einbringen:</strong> Mit dem Blick
            von außen kannst du möglicherweise frische Ideen oder
            Verbesserungsvorschläge einbringen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Probezeitgespräch vorbereiten:</strong> Bereite dich auf das
            abschließende Probezeitgespräch vor, indem du deine Erfolge
            dokumentierst und Zukunftsperspektiven entwickelst.
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Besonders im Homeoffice gilt: Unterschätze nicht die Bedeutung von
            sogenannten „Soft Skills" wie Kommunikationsfähigkeit,
            Eigenorganisation und Teamfähigkeit. Diese Fähigkeiten sind oft
            genauso wichtig wie fachliche Kompetenz – gerade wenn persönliche
            Kontakte eingeschränkt sind. Ein durchdachtes{" "}
            <a
              href={serializeRoute({
                kind: RouteKind.Blog,
                blogRoute: { kind: "arbeitszeugnis-verstehen" },
              })}
              style={linkStyles}
            >
              Verständnis der Unternehmenskultur
            </a>{" "}
            ist hier besonders hilfreich.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Häufige Problemsituationen in der Probezeit und ihre Lösungen</H2>
        <p style={styles.content.paragraph}>
          Nicht immer verläuft die Probezeit reibungslos. Folgende
          Herausforderungen können auftreten und so gemeistert werden:
        </p>

        <H3>Mangelndes Feedback und unklare Erwartungen</H3>
        <p style={styles.content.paragraph}>
          Eine der häufigsten Herausforderungen in der Probezeit ist fehlendes
          Feedback oder unklare Erwartungen seitens des Arbeitgebers:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Proaktiv Feedback einholen:</strong> Warte nicht darauf,
            dass dein Vorgesetzter auf dich zukommt. Bitte aktiv um regelmäßige
            Feedbackgespräche.
          </li>
          <li style={styles.content.listItem}>
            <strong>SMART-Ziele vereinbaren:</strong> Versuche, spezifische,
            messbare, erreichbare, relevante und terminierte Ziele für deine
            Probezeit zu vereinbaren.
          </li>
          <li style={styles.content.listItem}>
            <strong>Schriftliche Zusammenfassungen:</strong> Fasse nach
            wichtigen Gesprächen die besprochenen Punkte und vereinbarten Ziele
            kurz schriftlich zusammen und teile sie mit deinem Vorgesetzten.
          </li>
        </ul>

        <H3>Isolation im Homeoffice überwinden</H3>
        <p style={styles.content.paragraph}>
          Besonders im Homeoffice kann das Gefühl entstehen, vom Team isoliert
          zu sein:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Virtuelle Teamevents nutzen:</strong> Nimm an virtuellen
            Teamevents, Kaffeepausen oder After-Work-Treffen teil.
          </li>
          <li style={styles.content.listItem}>
            <strong>1:1-Gespräche initiieren:</strong> Vereinbare kurze
            virtuelle Kennenlerngespräche mit einzelnen Kollegen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Präsenztage optimal nutzen:</strong> Wenn du in einem
            hybriden Modell arbeitest, plane deine Bürotage strategisch, um
            wichtige Meetings persönlich wahrzunehmen und Zeit für informellen
            Austausch zu haben.
          </li>
          <li style={styles.content.listItem}>
            <strong>Kommunikationskanäle diversifizieren:</strong> Nutze
            verschiedene Kommunikationsformen (Chat, Video, Telefon) je nach
            Situation und Präferenz der Kollegen.
          </li>
        </ul>

        <H3>Überforderung und Stress bewältigen</H3>
        <p style={styles.content.paragraph}>
          Die Probezeit kann mit Stress und Leistungsdruck verbunden sein:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Prioritäten setzen:</strong> Konzentriere dich auf die
            wichtigsten Aufgaben und Ziele. Nicht alles muss sofort perfekt
            sein.
          </li>
          <li style={styles.content.listItem}>
            <strong>Hilfe annehmen:</strong> Zögere nicht, bei Bedarf Kollegen
            um Rat zu fragen. Dies zeigt nicht Schwäche, sondern
            Teamorientierung.
          </li>
          <li style={styles.content.listItem}>
            <strong>Selbstfürsorge:</strong> Achte auch in stressigen Phasen auf
            ausreichend Erholung, Bewegung und gesunde Ernährung.
          </li>
          <li style={styles.content.listItem}>
            <strong>Realistische Erwartungen:</strong> Niemand erwartet, dass du
            von Anfang an perfekt bist. Lernbereitschaft und kontinuierliche
            Verbesserung sind wichtiger als Perfektion.
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Bei anhaltenden Problemen solltest du nicht zu lange warten, bevor
            du das Gespräch suchst. Je früher Missverständnisse oder
            Schwierigkeiten angesprochen werden, desto eher können sie gelöst
            werden. Bereite solche Gespräche gut vor, indem du konkrete
            Beispiele sammelst und konstruktive Lösungsvorschläge entwickelst.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Kündigung in der Probezeit: Rechte und Strategien</H2>
        <p style={styles.content.paragraph}>
          Trotz aller Bemühungen kann es vorkommen, dass ein Arbeitsverhältnis
          bereits in der Probezeit endet – sei es durch Kündigung des
          Arbeitgebers oder durch eigene Entscheidung. In beiden Fällen ist es
          wichtig, die rechtlichen Rahmenbedingungen zu kennen und strategisch
          klug zu handeln.
        </p>

        <H3>Wenn der Arbeitgeber kündigt</H3>
        <p style={styles.content.paragraph}>
          Eine Kündigung durch den Arbeitgeber während der Probezeit unterliegt
          weniger strengen Regelungen als im etablierten Arbeitsverhältnis:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Kündigungsfrist:</strong> Die gesetzliche Kündigungsfrist
            beträgt während der Probezeit nur zwei Wochen, sofern im Arbeits-
            oder Tarifvertrag keine andere Regelung getroffen wurde.
          </li>
          <li style={styles.content.listItem}>
            <strong>Keine Begründungspflicht:</strong> Der Arbeitgeber muss die
            Kündigung während der Probezeit grundsätzlich nicht begründen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Eingeschränkter Kündigungsschutz:</strong> Der allgemeine
            Kündigungsschutz nach dem Kündigungsschutzgesetz gilt erst nach
            sechs Monaten Betriebszugehörigkeit.
          </li>
          <li style={styles.content.listItem}>
            <strong>Besondere Schutzvorkehrungen:</strong> Besondere
            Kündigungsschutzregelungen, etwa für Schwangere, Menschen mit
            Schwerbehinderung oder Betriebsratsmitglieder, gelten jedoch auch
            während der Probezeit.
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Erhältst du eine Kündigung in der Probezeit, solltest du folgende
          Schritte in Betracht ziehen:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Kündigungsschreiben prüfen:</strong> Achte auf korrekte
            Form, Datum und Einhaltung der Kündigungsfrist.
          </li>
          <li style={styles.content.listItem}>
            <strong>Abschlussgespräch führen:</strong> Bitte um ein
            Abschlussgespräch, um die Gründe für die Kündigung zu verstehen und
            daraus für die Zukunft zu lernen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Arbeitszeugnis anfordern:</strong> Du hast Anspruch auf ein
            qualifiziertes Arbeitszeugnis, auch wenn das Arbeitsverhältnis nur
            kurz gedauert hat.
          </li>
          <li style={styles.content.listItem}>
            <strong>Arbeitslosmeldung:</strong> Melde dich unverzüglich bei der
            Agentur für Arbeit arbeitsuchend, spätestens drei Monate vor Ende
            des Arbeitsverhältnisses, bei kürzeren Fristen spätestens drei Tage
            nach Kenntnis des Beendigungszeitpunkts.
          </li>
        </ul>

        <H3>Wenn du selbst kündigen möchtest</H3>
        <p style={styles.content.paragraph}>
          Auch du kannst das Arbeitsverhältnis während der Probezeit mit einer
          Frist von zwei Wochen kündigen. Vor diesem Schritt solltest du jedoch
          Folgendes bedenken:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Gründliche Überlegung:</strong> Überlege genau, ob die
            Probleme nicht durch offene Kommunikation gelöst werden könnten.
          </li>
          <li style={styles.content.listItem}>
            <strong>Timing:</strong> Vergewissere dich, dass du finanziell
            abgesichert bist und idealerweise bereits eine neue Stelle in
            Aussicht hast.
          </li>
          <li style={styles.content.listItem}>
            <strong>Form der Kündigung:</strong> Eine Kündigung sollte immer
            schriftlich erfolgen und eigenhändig unterschrieben sein. E-Mail
            oder SMS genügen nicht.
          </li>
          <li style={styles.content.listItem}>
            <strong>Konstruktives Abschiedsgespräch:</strong> Vermeide negative
            Äußerungen und fokussiere dich auf konstruktives Feedback – die
            Berufswelt ist klein, und du möchtest keine Brücken abbrechen.
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Eine Kündigung in der Probezeit ist kein Scheitern, sondern kann ein
            strategisch kluger Schritt sein, wenn Job und Bewerber nicht
            zusammenpassen. Viele erfolgreiche Karrieren beinhalten solche
            Kurskorrekturen. Wichtig ist, konstruktiv damit umzugehen und die
            Erfahrung für die nächste{" "}
            <a
              href={serializeRoute({
                kind: RouteKind.Blog,
                blogRoute: { kind: "ki-nutzung" },
              })}
              style={linkStyles}
            >
              Bewerbung
            </a>{" "}
            zu nutzen.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Das Probezeitgespräch optimal vorbereiten und nutzen</H2>
        <p style={styles.content.paragraph}>
          Am Ende der Probezeit steht häufig ein formelles Probezeitgespräch,
          das über die Fortsetzung des Arbeitsverhältnisses entscheidet. Mit der
          richtigen Vorbereitung kannst du dieses Gespräch zu deinem Vorteil
          nutzen.
        </p>

        <H3>Vor dem Gespräch: Gründliche Vorbereitung</H3>
        <p style={styles.content.paragraph}>
          Eine sorgfältige Vorbereitung auf das Probezeitgespräch erhöht deine
          Chancen auf ein positives Ergebnis:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Erfolge dokumentieren:</strong> Erstelle eine Liste deiner
            Erfolge, abgeschlossenen Projekte und positiven Beiträge während der
            Probezeit.
          </li>
          <li style={styles.content.listItem}>
            <strong>Selbsteinschätzung durchführen:</strong> Reflektiere ehrlich
            deine Stärken und Bereiche mit Entwicklungspotenzial.
          </li>
          <li style={styles.content.listItem}>
            <strong>Feedback sammeln:</strong> Sammle informelles Feedback von
            Kollegen und Vorgesetzten, mit denen du eng zusammengearbeitet hast.
          </li>
          <li style={styles.content.listItem}>
            <strong>Zukunftsperspektiven entwickeln:</strong> Überlege dir,
            welche Ziele du für die Zeit nach der Probezeit anstreben möchtest
            und wie diese mit den Unternehmenszielen übereinstimmen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Fragen vorbereiten:</strong> Notiere Fragen zu deinen
            zukünftigen Aufgaben, Entwicklungsmöglichkeiten oder zum Feedback
            deiner Vorgesetzten.
          </li>
        </ul>

        <H3>Während des Gesprächs: Souverän und konstruktiv auftreten</H3>
        <p style={styles.content.paragraph}>
          Im Gespräch selbst kommt es auf eine professionelle Haltung an:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Aktives Zuhören:</strong> Höre aufmerksam zu und gehe
            konstruktiv auf das Feedback ein.
          </li>
          <li style={styles.content.listItem}>
            <strong>Erfolge präsentieren:</strong> Stelle deine Erfolge dar,
            ohne überheblich zu wirken. Konkrete Beispiele und messbare
            Ergebnisse sind besonders überzeugend.
          </li>
          <li style={styles.content.listItem}>
            <strong>Konstruktiver Umgang mit Kritik:</strong> Reagiere
            aufgeschlossen auf Verbesserungsvorschläge und zeige
            Lösungsbereitschaft.
          </li>
          <li style={styles.content.listItem}>
            <strong>Zukunftsorientierung:</strong> Signalisiere dein Interesse
            an langfristiger Mitarbeit und weiterer Entwicklung im Unternehmen.
          </li>
        </ul>

        <H3>Nach dem Gespräch: Follow-up und nächste Schritte</H3>
        <p style={styles.content.paragraph}>
          Nach dem Probezeitgespräch solltest du die Ergebnisse reflektieren und
          die nächsten Schritte planen:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Gesprächszusammenfassung:</strong> Notiere die wichtigsten
            Punkte des Gesprächs, insbesondere vereinbarte Ziele und
            Entwicklungsmaßnahmen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Schriftliche Bestätigung:</strong> Bei positivem Ausgang
            kann es sinnvoll sein, die Übernahme nach der Probezeit schriftlich
            bestätigen zu lassen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Entwicklungsplan erstellen:</strong> Entwickle auf Basis des
            Feedbacks einen persönlichen Entwicklungsplan für die kommenden
            Monate.
          </li>
          <li style={styles.content.listItem}>
            <strong>Bei negativem Ausgang:</strong> Sollte das Gespräch nicht
            zum gewünschten Ergebnis führen, bitte um konkretes Feedback für
            deine berufliche Weiterentwicklung.
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Besonders im Homeoffice solltest du für das Probezeitgespräch
            optimale technische Bedingungen schaffen: stabile
            Internetverbindung, ruhige Umgebung, professioneller Hintergrund und
            angemessene Kleidung. Ein Test der Technik vor dem Gespräch gibt
            zusätzliche Sicherheit. Frage vorab, ob du für das Gespräch ins Büro
            kommen sollst – ein persönliches Gespräch kann manchmal
            vorteilhafter sein.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Von der Probezeit zur langfristigen Karriereplanung</H2>
        <p style={styles.content.paragraph}>
          Nach erfolgreichem Abschluss der Probezeit beginnt ein neuer Abschnitt
          im Arbeitsverhältnis. Nun geht es darum, die guten Erfahrungen aus der
          Probezeit in langfristigen beruflichen Erfolg umzumünzen.
        </p>

        <H3>Nach der Probezeit: Veränderungen und neue Möglichkeiten</H3>
        <p style={styles.content.paragraph}>
          Mit dem Ende der Probezeit ändern sich einige Rahmenbedingungen:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Kündigungsschutz:</strong> Nach sechs Monaten greift in
            Betrieben mit mehr als zehn Mitarbeitern der allgemeine
            Kündigungsschutz nach dem Kündigungsschutzgesetz.
          </li>
          <li style={styles.content.listItem}>
            <strong>Längere Kündigungsfristen:</strong> Die gesetzliche
            Kündigungsfrist verlängert sich auf mindestens vier Wochen zum 15.
            oder zum Ende eines Kalendermonats.
          </li>
          <li style={styles.content.listItem}>
            <strong>Zusätzliche Benefits:</strong> Manche Unternehmen gewähren
            bestimmte Vergünstigungen wie betriebliche Altersvorsorge oder
            Zusatzurlaub erst nach Ablauf der Probezeit.
          </li>
          <li style={styles.content.listItem}>
            <strong>Gehaltsverhandlungen:</strong> Nach der Probezeit kann ein
            guter Zeitpunkt sein, über eine Gehaltsanpassung zu sprechen – vor
            allem, wenn du besondere Leistungen nachweisen kannst.
          </li>
        </ul>

        <H3>Homeoffice langfristig erfolgreich gestalten</H3>
        <p style={styles.content.paragraph}>
          Wenn Homeoffice auch nach der Probezeit ein dauerhafter Bestandteil
          deiner Arbeit sein soll, lohnt es sich, einige Aspekte langfristig zu
          optimieren:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Arbeitsplatzgestaltung:</strong> Investiere in einen
            ergonomischen Arbeitsplatz mit höhenverstellbarem Schreibtisch,
            gutem Bürostuhl und ausreichender Beleuchtung.
          </li>
          <li style={styles.content.listItem}>
            <strong>Klare Grenzen setzen:</strong> Etabliere feste
            Arbeitsroutinen und klare Grenzen zwischen Arbeits- und Privatleben,
            um langfristig produktiv und gesund zu bleiben.
          </li>
          <li style={styles.content.listItem}>
            <strong>Regelmäßiger persönlicher Austausch:</strong> Plane
            regelmäßige Präsenztage im Büro für wichtige Meetings, Teambuilding
            und informellen Austausch.
          </li>
          <li style={styles.content.listItem}>
            <strong>Homeoffice-Vereinbarung:</strong> Achte darauf, dass die
            Homeoffice-Regelung schriftlich festgehalten wird, inklusive Umfang,
            Erreichbarkeit und Arbeitszeiten.
          </li>
        </ul>

        <H3>Langfristige Karriereplanung im Unternehmen</H3>
        <p style={styles.content.paragraph}>
          Für deine weitere Entwicklung im Unternehmen ist eine strategische
          Planung hilfreich:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Entwicklungsgespräch führen:</strong> Bitte um ein
            Entwicklungsgespräch, um deine Karriereziele und
            Weiterbildungsmöglichkeiten zu besprechen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Mentor finden:</strong> Suche einen erfahrenen Kollegen oder
            Vorgesetzten, der dich als Mentor unterstützen kann.
          </li>
          <li style={styles.content.listItem}>
            <strong>Weiterbildungsangebote nutzen:</strong> Informiere dich über
            betriebliche Weiterbildungsangebote und externe
            Qualifizierungsmöglichkeiten.
          </li>
          <li style={styles.content.listItem}>
            <strong>Netzwerk ausbauen:</strong> Baue kontinuierlich dein
            Netzwerk innerhalb und außerhalb des Unternehmens aus.
          </li>
          <li style={styles.content.listItem}>
            <strong>Sichtbarkeit erhöhen:</strong> Übernimm Verantwortung für
            Projekte, die deine Fähigkeiten zeigen und zur Unternehmensstrategie
            beitragen.
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Der{" "}
            <a style={linkStyles} href="https://bewerbungshelfer.net">
              Bewerbungshelfer
            </a>{" "}
            kann dir nicht nur bei der erfolgreichen Bewerbung helfen, sondern
            auch beim Übergang in ein langfristiges Arbeitsverhältnis. Die
            Vorbereitung auf Entwicklungsgespräche oder die Erstellung eines
            persönlichen Entwicklungsplans sind wichtige Schritte für deine
            weitere Karriere – ob im jetzigen Unternehmen oder bei einem
            zukünftigen Arbeitgeber.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Fazit: Probearbeiten und Probezeit als Sprungbrett zum Erfolg</H2>
        <p style={styles.content.paragraph}>
          Probearbeiten und Probezeit sind wichtige Phasen am Beginn eines
          Arbeitsverhältnisses, die bei strategisch kluger Herangehensweise zum
          Sprungbrett für beruflichen Erfolg werden können. Die wichtigsten
          Erkenntnisse zusammengefasst:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Rechtliche Grundlagen kennen:</strong> Verstehe den
            Unterschied zwischen unverbindlichem Probearbeiten und der Probezeit
            als Teil des Arbeitsverhältnisses mit allen Rechten und Pflichten.
          </li>
          <li style={styles.content.listItem}>
            <strong>Homeoffice meistern:</strong> Im Homeoffice sind proaktive
            Kommunikation, regelmäßiges Feedback und strategische Präsenztage
            besonders wichtig für den Erfolg in der Probezeit.
          </li>
          <li style={styles.content.listItem}>
            <strong>Die ersten 100 Tage strategisch nutzen:</strong>{" "}
            Strukturiere die ersten drei Monate in Phasen (Orientierung, erste
            Erfolge, Mehrwert zeigen) und setze in jeder Phase die richtigen
            Prioritäten.
          </li>
          <li style={styles.content.listItem}>
            <strong>Probleme proaktiv lösen:</strong> Bei Schwierigkeiten oder
            unklaren Erwartungen ist es wichtig, früh das Gespräch zu suchen und
            konstruktive Lösungen anzubieten.
          </li>
          <li style={styles.content.listItem}>
            <strong>Probezeitgespräch als Chance:</strong> Nutze das
            Probezeitgespräch, um deine Erfolge zu präsentieren und die
            langfristige Entwicklung im Unternehmen zu planen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Nach der Probezeit weiterdenken:</strong> Entwickle nach
            erfolgreicher Probezeit eine langfristige Karrierestrategie,
            optimiere dein Homeoffice-Setup und nutze die neuen Möglichkeiten
            für deine berufliche Entwicklung.
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          In einer Zeit, in der Arbeitsverhältnisse zunehmend flexibler werden
          und Homeoffice für viele zum Arbeitsalltag gehört, ist ein
          strategischer Umgang mit Probearbeiten und Probezeit wichtiger denn
          je. Wer die rechtlichen Rahmenbedingungen kennt und die richtigen
          Strategien anwendet, kann diese Phasen erfolgreich meistern und den
          Grundstein für eine erfolgreiche berufliche Zukunft legen.
        </p>

        <p style={styles.content.paragraph}>
          Die Probezeit ist letztlich ein zweiseitiger Prozess: So wie das
          Unternehmen dich prüft, hast auch du die Gelegenheit zu beurteilen, ob
          der Job und die Unternehmenskultur zu dir passen. Mit der richtigen
          Einstellung und den richtigen Strategien kannst du die Probezeit nicht
          nur bestehen, sondern als Chance nutzen, dich von Beginn an positiv zu
          positionieren.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Der{" "}
            <a style={linkStyles} href="https://bewerbungshelfer.net">
              Bewerbungshelfer
            </a>{" "}
            unterstützt dich nicht nur bei der erfolgreichen Bewerbung, sondern
            kann dir auch helfen, die richtigen Fragen zu stellen, um
            herauszufinden, ob ein Job wirklich zu dir passt. Die KI-gestützte
            Analyse hilft dir, deine Stärken zu erkennen und zu kommunizieren –
            eine wichtige Grundlage für den erfolgreichen Start in ein neues
            Arbeitsverhältnis, sei es im Büro oder im Homeoffice.
          </p>
        </div>
      </section>
    </>
  );
}
