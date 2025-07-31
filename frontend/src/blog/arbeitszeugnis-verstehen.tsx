import { styles } from "./shared";
import { H2 } from "./shared";
import { H3 } from "./shared";
import { linkStyles } from "./shared";
import { serializeRoute } from "../route";
import { RouteKind } from "../route";

export function ArbeitszeugnisVerstehen() {
  return (
    <>
      <section style={styles.content.section}>
        <p style={styles.content.paragraph}>
          Das Arbeitszeugnis gehört zu den wichtigsten Dokumenten im Berufsleben
          – und gleichzeitig zu den missverständlichsten. Während ein{" "}
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
            individuelles Anschreiben
          </a>{" "}
          deine eigene Darstellung deiner Karriere sind, ist das Arbeitszeugnis
          die offizielle Beurteilung deiner Leistung durch den Arbeitgeber. Was
          auf den ersten Blick wie ein wohlwollendes Dokument wirkt, kann
          versteckte Botschaften enthalten, die deine Karrierechancen erheblich
          beeinflussen.
        </p>

        <p style={styles.content.paragraph}>
          Die besondere Herausforderung: In Deutschland haben sich im Laufe der
          Jahre spezielle Formulierungen etabliert – eine Art Geheimcode, den
          Personaler entschlüsseln können, während er für Bewerber oft
          undurchsichtig bleibt. Dieser Artikel hilft dir, die Geheimsprache der
          Arbeitszeugnisse zu verstehen und das Dokument optimal für deine
          Bewerbungen zu nutzen.
        </p>

        <div style={styles.content.note}>
          Kurz & Knapp: Ein Arbeitszeugnis muss laut Gesetz wohlwollend
          formuliert sein, enthält aber oft codierte Bewertungen. Die
          Standardformel "stets zu unserer vollsten Zufriedenheit" entspricht
          dabei einer Eins, während fehlende positive Attribute oder bestimmte
          Formulierungen als Kritik zu verstehen sind. Mit dem richtigen Wissen
          kannst du dein Zeugnis entschlüsseln und bei Bedarf Änderungen
          einfordern.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Die rechtliche Grundlage: Dein Anspruch auf ein Arbeitszeugnis</H2>
        <p style={styles.content.paragraph}>
          Zunächst das Wichtigste: Jeder Arbeitnehmer hat in Deutschland einen
          gesetzlichen Anspruch auf ein Arbeitszeugnis. Dieser Anspruch ist im §
          109 Gewerbeordnung (GewO) festgeschrieben und gilt für alle
          Beschäftigungsverhältnisse – vom Praktikum bis zur Führungsposition,
          von der Teilzeitstelle bis zur langjährigen Festanstellung.
        </p>

        <p style={styles.content.paragraph}>
          Zwei zentrale Prinzipien bestimmen dabei die Gestaltung des
          Arbeitszeugnisses:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Wahrheitspflicht:</strong> Das Zeugnis muss wahrheitsgemäß
            sein. Falsche Angaben können sowohl dem Arbeitnehmer schaden als
            auch den Arbeitgeber zu Schadensersatz verpflichten.
          </li>
          <li style={styles.content.listItem}>
            <strong>Wohlwollensprinzip:</strong> Das Zeugnis soll wohlwollend
            formuliert sein und das berufliche Fortkommen nicht ungerechtfertigt
            erschweren. Dies führt zu den typischen "positiven" Formulierungen,
            die jedoch abgestuft werden können.
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Diese beiden Prinzipien stehen in einem gewissen Spannungsverhältnis
          und haben zur Entwicklung einer speziellen Zeugnissprache geführt. Da
          ein Arbeitszeugnis nicht offen negativ formuliert werden darf, haben
          sich codierte Ausdrucksweisen entwickelt, um dennoch Kritik
          anzubringen. Diese Codes sind für Eingeweihte – insbesondere für
          Personaler – leicht zu entschlüsseln.
        </p>

        <H3>Einfaches vs. qualifiziertes Zeugnis</H3>
        <p style={styles.content.paragraph}>
          Es gibt zwei Hauptarten von Arbeitszeugnissen:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Einfaches Zeugnis:</strong> Enthält nur Angaben zur Person
            und Beschreibung der Tätigkeit ohne Leistungs- und
            Verhaltensbeurteilung
          </li>
          <li style={styles.content.listItem}>
            <strong>Qualifiziertes Zeugnis:</strong> Umfasst zusätzlich eine
            Beurteilung der Leistung und des Verhaltens des Arbeitnehmers
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          In den meisten Fällen hast du Anspruch auf ein qualifiziertes Zeugnis.
          Dieses ist für Bewerbungen deutlich aussagekräftiger und wird von
          potenziellen Arbeitgebern erwartet. Ein einfaches Zeugnis kann sogar
          Fragen aufwerfen, warum keine Beurteilung enthalten ist.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Wichtig: Der Anspruch auf ein Arbeitszeugnis verjährt nach drei
            Jahren zum Ende des Jahres, in dem der Anspruch entstanden ist. Wenn
            du dein Arbeitsverhältnis beispielsweise am 15. März 2022 beendet
            hast, kannst du bis zum 31. Dezember 2025 ein Zeugnis einfordern.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Die Geheimsprache der Arbeitszeugnisse entschlüsseln</H2>
        <p style={styles.content.paragraph}>
          Um dein Arbeitszeugnis richtig zu verstehen, musst du die speziellen
          Formulierungen und ihre tatsächliche Bedeutung kennen. Die Bewertung
          erfolgt dabei auf einer Skala, die – ähnlich den Schulnoten – von
          "sehr gut" bis "ungenügend" reicht, jedoch in wohlklingenden Phrasen
          verpackt ist.
        </p>

        <H3>Das Bewertungssystem: Von "sehr gut" bis "mangelhaft"</H3>
        <p style={styles.content.paragraph}>
          Die klassische Benotung im Arbeitszeugnis folgt diesem Schema:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Note 1 (sehr gut):</strong> "... stets zu unserer vollsten
            Zufriedenheit"
          </li>
          <li style={styles.content.listItem}>
            <strong>Note 2 (gut):</strong> "... stets zu unserer vollen
            Zufriedenheit"
          </li>
          <li style={styles.content.listItem}>
            <strong>Note 3 (befriedigend):</strong> "... zu unserer vollen
            Zufriedenheit"
          </li>
          <li style={styles.content.listItem}>
            <strong>Note 4 (ausreichend):</strong> "... zu unserer
            Zufriedenheit"
          </li>
          <li style={styles.content.listItem}>
            <strong>Note 5 (mangelhaft):</strong> "... insgesamt zu unserer
            Zufriedenheit" oder "... bemüht"
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Beachte die feinen Unterschiede: Die Begriffe "stets", "voll" und
          "vollste" sind entscheidend. Ihr Fehlen führt direkt zu einer
          schlechteren Bewertung. Besonders tückisch sind Formulierungen mit
          "bemüht", "versucht" oder Ähnlichem – sie deuten an, dass trotz
          Anstrengung kein Erfolg erzielt wurde.
        </p>

        <H3>Versteckte Kritik erkennen</H3>
        <p style={styles.content.paragraph}>
          Neben dem Standardschema gibt es zahlreiche Formulierungen, die auf
          den ersten Blick positiv oder neutral erscheinen, tatsächlich aber
          Kritik enthalten:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>"Er war mit Interesse bei der Sache"</strong> = mangelnde
            Leistungsbereitschaft
          </li>
          <li style={styles.content.listItem}>
            <strong>"Sie erledigte alle Aufgaben mit großem Fleiß"</strong> =
            hoher Arbeitsaufwand bei geringem Erfolg
          </li>
          <li style={styles.content.listItem}>
            <strong>"Er hatte Verständnis für seine Arbeit"</strong> = fehlende
            Kompetenz
          </li>
          <li style={styles.content.listItem}>
            <strong>"Sie war im Kollegenkreis anerkannt und beliebt"</strong> =
            beliebter bei Kollegen als bei Vorgesetzten
          </li>
          <li style={styles.content.listItem}>
            <strong>
              "Er trug durch seine gesellige Art zur Verbesserung des
              Betriebsklimas bei"
            </strong>{" "}
            = Hinweis auf Alkoholkonsum oder übermäßiges Privatgespräch
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Auch die Reihenfolge der genannten Tätigkeiten und Fertigkeiten ist
          aufschlussreich: Die wichtigsten Punkte werden üblicherweise zuerst
          genannt. Wenn weniger relevante Aspekte am Anfang stehen, kann dies
          ein Hinweis darauf sein, dass die Kernaufgaben nicht zufriedenstellend
          erfüllt wurden.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Achtung: Die Zeugnissprache entwickelt sich ständig weiter. Neben
            den klassischen Formulierungen gibt es branchenspezifische Varianten
            und neuere Entwicklungen. Im Zweifelsfall solltest du dein Zeugnis
            von einem Experten prüfen lassen oder die aktuelle Rechtsprechung
            konsultieren.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Dein Arbeitszeugnis Schritt für Schritt analysieren</H2>
        <p style={styles.content.paragraph}>
          Ein qualifiziertes Arbeitszeugnis folgt einem standardisierten Aufbau.
          Das erleichtert nicht nur das Schreiben, sondern auch das
          systematische Analysieren. Hier ist, worauf du in jedem Abschnitt
          achten solltest:
        </p>

        <H3>1. Einleitung und persönliche Angaben</H3>
        <p style={styles.content.paragraph}>
          Die ersten Absätze enthalten deine persönlichen Daten, Informationen
          zum Unternehmen und die Dauer deiner Beschäftigung. Prüfe hier:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Korrekte Schreibweise deines Namens und Geburtsdatums
          </li>
          <li style={styles.content.listItem}>
            Richtige Angaben zum Beginn und Ende des Arbeitsverhältnisses
          </li>
          <li style={styles.content.listItem}>
            Korrekte Bezeichnung deiner Position(en)
          </li>
        </ul>
        <p style={styles.content.paragraph}>
          Fehler in diesem Bereich können zwar unabsichtlich sein, manchmal sind
          sie aber auch ein Hinweis auf Nachlässigkeit bei der Zeugniserstellung
          – was deine Wertschätzung im Unternehmen reflektieren könnte.
        </p>

        <H3>2. Tätigkeitsbeschreibung</H3>
        <p style={styles.content.paragraph}>
          Dieser Abschnitt beschreibt deine Aufgaben und Verantwortlichkeiten.
          Achte auf:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Vollständigkeit: Sind alle wichtigen Tätigkeiten aufgeführt?
          </li>
          <li style={styles.content.listItem}>
            Gewichtung: Werden die zentralen Aufgaben angemessen hervorgehoben?
          </li>
          <li style={styles.content.listItem}>
            Verantwortungsgrad: Wird deine tatsächliche Verantwortung (Budget,
            Personalverantwortung, Entscheidungsbefugnisse) korrekt dargestellt?
          </li>
        </ul>
        <p style={styles.content.paragraph}>
          Die Tätigkeitsbeschreibung sollte deinen potenziellen neuen
          Arbeitgebern einen klaren Eindruck davon vermitteln, was du
          tatsächlich getan hast. Zu allgemeine Beschreibungen könnten
          problematisch sein, da sie deine spezifischen Kompetenzen nicht
          ausreichend herausstellen.
        </p>

        <H3>3. Leistungsbeurteilung</H3>
        <p style={styles.content.paragraph}>
          Dies ist der Kern des Zeugnisses und der Bereich, in dem die codierte
          Sprache am häufigsten zum Einsatz kommt. Hier wird bewertet, WIE du
          deine Arbeit erledigt hast. Prüfe:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Die Gesamtbeurteilung, meist am Ende des Abschnitts ("stets zu
            unserer vollsten Zufriedenheit" etc.)
          </li>
          <li style={styles.content.listItem}>
            Verwendung von Verstärkern wie "stets", "jederzeit", "äußerst"
          </li>
          <li style={styles.content.listItem}>
            Hinweise auf deine spezifischen Stärken (oder deren auffällige
            Abwesenheit)
          </li>
          <li style={styles.content.listItem}>
            Aussagen zu Arbeitstempo, Qualität, Selbstständigkeit, Kreativität
            und Fachwissen
          </li>
        </ul>

        <H3>4. Verhaltensbeurteilung</H3>
        <p style={styles.content.paragraph}>
          Dieser Teil beschreibt dein Verhalten gegenüber Vorgesetzten, Kollegen
          und ggf. Kunden. Achte auf:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Die Reihenfolge der genannten Personengruppen (Vorgesetzte sollten
            an erster Stelle stehen)
          </li>
          <li style={styles.content.listItem}>
            Verwendung positiver Attribute wie "vorbildlich", "respektvoll",
            "kooperativ"
          </li>
          <li style={styles.content.listItem}>
            Mögliche versteckte Hinweise auf Konflikte ("im Großen und Ganzen",
            "grundsätzlich gut")
          </li>
        </ul>

        <H3>5. Schlussformulierung</H3>
        <p style={styles.content.paragraph}>
          Der letzte Abschnitt enthält üblicherweise den Grund für das
          Ausscheiden, Bedauern über dein Gehen und Zukunftswünsche. Hier sind
          die wichtigsten Prüfpunkte:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Korrekte und neutrale Angabe des Beendigungsgrundes (eigene
            Kündigung, betriebsbedingt etc.)
          </li>
          <li style={styles.content.listItem}>
            Ausdruck des Bedauerns über dein Ausscheiden
          </li>
          <li style={styles.content.listItem}>Dank für deine Leistungen</li>
          <li style={styles.content.listItem}>Positive Zukunftswünsche</li>
        </ul>
        <p style={styles.content.paragraph}>
          Das Fehlen von Dank oder Bedauern kann als Hinweis darauf verstanden
          werden, dass das Unternehmen nicht unglücklich über deinen Weggang
          ist.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Die Unterschrift ist ein oft übersehener, aber wichtiger Aspekt: Sie
            sollte von einer Person mit entsprechender Autorität stammen,
            idealerweise von deinem direkten Vorgesetzten und einem Vertreter
            der Personalabteilung oder der Geschäftsführung. Eine Unterschrift
            auf zu niedriger Hierarchieebene kann den Wert des Zeugnisses
            mindern.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Die häufigsten Stolperfallen im Arbeitszeugnis</H2>
        <p style={styles.content.paragraph}>
          Neben den bereits besprochenen codierten Formulierungen gibt es
          weitere subtile Anzeichen für eine negative Bewertung. Diese
          versteckten Fallstricke können leicht übersehen werden:
        </p>

        <H3>Auslassungen und fehlende Inhalte</H3>
        <p style={styles.content.paragraph}>
          Was nicht gesagt wird, kann genauso bedeutsam sein wie das, was
          ausdrücklich erwähnt wird:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Fehlende Eigenschaften:</strong> Wenn in einem Abschnitt
            typische positive Eigenschaften (wie Zuverlässigkeit, Genauigkeit,
            Eigeninitiative) nicht erwähnt werden, kann dies als Hinweis
            verstanden werden, dass diese nicht vorhanden waren.
          </li>
          <li style={styles.content.listItem}>
            <strong>Unvollständige Tätigkeitsbeschreibung:</strong> Das
            Weglassen wichtiger Aufgabenbereiche kann andeuten, dass du in
            diesen Bereichen nicht erfolgreich warst.
          </li>
          <li style={styles.content.listItem}>
            <strong>Fehlende Entwicklung:</strong> Wenn bei längerer
            Betriebszugehörigkeit keine berufliche Entwicklung oder
            Weiterbildung erwähnt wird, kann dies auf Stagnation hindeuten.
          </li>
        </ul>

        <H3>Verdächtige Formulierungen</H3>
        <p style={styles.content.paragraph}>
          Einige Formulierungen sollten deine Alarmglocken läuten lassen:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>"Er gab sein Bestes"</strong> impliziert, dass trotz größter
            Anstrengung die Leistung nicht ausreichend war.
          </li>
          <li style={styles.content.listItem}>
            <strong>"Sie erledigte die übertragenen Aufgaben"</strong> deutet
            auf eine rein passive Arbeitsweise ohne Eigeninitiative hin.
          </li>
          <li style={styles.content.listItem}>
            <strong>"Er zeigte für unsere Belange Verständnis"</strong> ist eine
            Umschreibung für unkooperatives Verhalten.
          </li>
          <li style={styles.content.listItem}>
            <strong>
              "Wir wünschen ihr für ihre persönliche Zukunft alles Gute"
            </strong>{" "}
            (ohne Erwähnung der beruflichen Zukunft) kann als Rat interpretiert
            werden, die Branche zu wechseln.
          </li>
        </ul>

        <H3>Widersprüche und Inkonsistenzen</H3>
        <p style={styles.content.paragraph}>
          Achte auf widersprüchliche Aussagen im Zeugnis:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Eine detaillierte Beschreibung anspruchsvoller Tätigkeiten, gefolgt
            von einer mittelmäßigen Leistungsbeurteilung
          </li>
          <li style={styles.content.listItem}>
            Lob für Fachwissen, aber Kritik an der praktischen Umsetzung
          </li>
          <li style={styles.content.listItem}>
            Positive Bewertung der Teamfähigkeit, aber Hinweise auf Konflikte
            mit Vorgesetzten
          </li>
        </ul>
        <p style={styles.content.paragraph}>
          Solche Inkonsistenzen können auf einen Kompromiss bei der
          Zeugniserstellung hindeuten oder auf eine bewusst ambivalente
          Beurteilung.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Ein durchschnittliches Arbeitszeugnis ist in Deutschland tatsächlich
            bereits unterdurchschnittlich! Da die meisten Zeugnisse im guten bis
            sehr guten Bereich liegen, wird ein "befriedigendes" Zeugnis von
            Personalern oft als Warnsignal interpretiert. Je nach Branche und
            Position kann diese Wahrnehmung jedoch variieren.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Das Zwischenzeugnis: Ein unterschätztes Instrument</H2>
        <p style={styles.content.paragraph}>
          Während das Endzeugnis bei Beendigung eines Arbeitsverhältnisses
          ausgestellt wird, kannst du als Arbeitnehmer auch während der
          Beschäftigung ein Zwischenzeugnis beantragen. Dieses oft unterschätzte
          Instrument kann aus mehreren Gründen wertvoll sein:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Aktuelle Beurteilung sichern:</strong> Besonders nach
            erfolgreich abgeschlossenen Projekten oder bei positiver
            Leistungsbewertung
          </li>
          <li style={styles.content.listItem}>
            <strong>Wechsel des Vorgesetzten:</strong> Wenn dein direkter
            Vorgesetzter das Unternehmen verlässt
          </li>
          <li style={styles.content.listItem}>
            <strong>Organisatorische Veränderungen:</strong> Bei
            Umstrukturierungen, Fusionen oder Abteilungswechseln
          </li>
          <li style={styles.content.listItem}>
            <strong>Vorbereitung auf Bewerbungen:</strong> Wenn du dich auf
            andere Stellen bewerben möchtest
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Ein Zwischenzeugnis folgt denselben formalen und inhaltlichen Regeln
          wie ein Endzeugnis – mit dem Unterschied, dass es nicht auf das Ende
          des Arbeitsverhältnisses Bezug nimmt. Inhaltlich kann es als Referenz
          für das spätere Endzeugnis dienen: Gravierende Abweichungen zwischen
          Zwischen- und Endzeugnis ohne nachvollziehbare Gründe sind rechtlich
          angreifbar.
        </p>

        <p style={styles.content.paragraph}>
          Wichtig: Der Anspruch auf ein Zwischenzeugnis besteht bei berechtigtem
          Interesse. Dies ist in der Regel gegeben bei:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Längerer Beschäftigungsdauer ohne bisherige Beurteilung
          </li>
          <li style={styles.content.listItem}>
            Wesentlichen Veränderungen in der Tätigkeit oder Organisation
          </li>
          <li style={styles.content.listItem}>
            Längerer Abwesenheit (z.B. Elternzeit, längere Krankheit)
          </li>
          <li style={styles.content.listItem}>Wechsel der Vorgesetzten</li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Taktischer Tipp: Der beste Zeitpunkt für die Beantragung eines
            Zwischenzeugnisses ist oft nach einem erfolgreich abgeschlossenen
            Projekt oder einer positiven Leistungsbewertung. So kannst du deine
            Stärken dokumentieren lassen, wenn sie frisch im Gedächtnis deines
            Vorgesetzten sind.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Deine Rechte: Wenn das Arbeitszeugnis nicht passt</H2>
        <p style={styles.content.paragraph}>
          Was kannst du tun, wenn dein Arbeitszeugnis nicht deinen Erwartungen
          entspricht oder wenn du Formulierungen entdeckst, die deine berufliche
          Entwicklung beeinträchtigen könnten? Als Arbeitnehmer hast du
          rechtliche Möglichkeiten, ein angemessenes Zeugnis einzufordern.
        </p>

        <H3>Schritt 1: Das Gespräch suchen</H3>
        <p style={styles.content.paragraph}>
          Der erste Schritt ist immer das direkte Gespräch mit dem Arbeitgeber.
          Viele Probleme lassen sich auf diesem Weg unkompliziert lösen:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Bereite dich gut vor und notiere die konkreten Punkte, die du ändern
            möchtest
          </li>
          <li style={styles.content.listItem}>
            Bleibe sachlich und führe konkrete Begründungen an
          </li>
          <li style={styles.content.listItem}>
            Schlage alternative Formulierungen vor
          </li>
          <li style={styles.content.listItem}>
            Dokumentiere das Gespräch und die Vereinbarungen
          </li>
        </ul>

        <H3>Schritt 2: Schriftliche Aufforderung zur Korrektur</H3>
        <p style={styles.content.paragraph}>
          Führt das persönliche Gespräch nicht zum Erfolg, ist der nächste
          Schritt eine formelle schriftliche Aufforderung:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Formuliere ein sachliches Schreiben mit konkreten Änderungswünschen
          </li>
          <li style={styles.content.listItem}>
            Beziehe dich auf die gesetzlichen Grundlagen (Wahrheitspflicht und
            Wohlwollensprinzip)
          </li>
          <li style={styles.content.listItem}>
            Setze eine angemessene Frist (üblich sind 2-3 Wochen)
          </li>
          <li style={styles.content.listItem}>
            Sende das Schreiben per Einschreiben mit Rückschein
          </li>
        </ul>

        <H3>Schritt 3: Rechtliche Schritte</H3>
        <p style={styles.content.paragraph}>
          Wenn auch die schriftliche Aufforderung erfolglos bleibt, kannst du
          rechtliche Schritte einleiten:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Rechtsberatung einholen:</strong> Wende dich an einen
            Fachanwalt für Arbeitsrecht oder an deine Gewerkschaft
          </li>
          <li style={styles.content.listItem}>
            <strong>Zeugnisprüfung durch Experten:</strong> Spezialisierte
            Dienstleister können die Erfolgsaussichten deines Anliegens
            einschätzen
          </li>
          <li style={styles.content.listItem}>
            <strong>Klage vor dem Arbeitsgericht:</strong> Als letztes Mittel
            kann eine Klage auf Zeugnisberichtigung eingereicht werden
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Die häufigsten berechtigten Gründe für eine Zeugniskorrektur sind:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Faktische Fehler (falsche Daten, falsche Tätigkeitsbeschreibung)
          </li>
          <li style={styles.content.listItem}>
            Unvollständigkeit (fehlende wesentliche Tätigkeiten)
          </li>
          <li style={styles.content.listItem}>
            Missverständliche oder mehrdeutige Formulierungen
          </li>
          <li style={styles.content.listItem}>
            Versteckte negative Beurteilungen, die nicht der tatsächlichen
            Leistung entsprechen
          </li>
          <li style={styles.content.listItem}>
            Formfehler (fehlende Unterschrift, ungeeignetes Briefpapier)
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Wichtig: Für die Durchsetzung deines Anspruchs auf Zeugniskorrektur
            gilt eine Verjährungsfrist von drei Jahren zum Ende des Jahres, in
            dem der Anspruch entstanden ist. Handle also nicht zu spät,
            besonders wenn du das Zeugnis aktuell für Bewerbungen benötigst.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Das Arbeitszeugnis optimal in Bewerbungen einsetzen</H2>
        <p style={styles.content.paragraph}>
          Nachdem du dein Arbeitszeugnis gründlich analysiert und gegebenenfalls
          korrigieren lassen hast, stellt sich die Frage: Wie setzt du es am
          besten in deinen Bewerbungen ein? Hier einige strategische
          Überlegungen:
        </p>

        <H3>Wann solltest du das Arbeitszeugnis beilegen?</H3>
        <p style={styles.content.paragraph}>
          In Deutschland ist es üblich, Arbeitszeugnisse den
          Bewerbungsunterlagen beizufügen. Dennoch gibt es strategische
          Überlegungen:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Sehr gute Zeugnisse:</strong> Unbedingt beilegen und ggf. im{" "}
            <a
              href={serializeRoute({
                kind: RouteKind.Blog,
                blogRoute: { kind: "anschreiben-guide" },
              })}
              style={linkStyles}
            >
              Anschreiben
            </a>{" "}
            darauf verweisen
          </li>
          <li style={styles.content.listItem}>
            <strong>Gute bis befriedigende Zeugnisse:</strong> Beilegen, ohne
            besonders darauf hinzuweisen
          </li>
          <li style={styles.content.listItem}>
            <strong>Problematische Zeugnisse:</strong> Abwägen, ob das Fehlen
            des Zeugnisses weniger negativ wirkt als dessen Inhalt
          </li>
          <li style={styles.content.listItem}>
            <strong>Sehr alte Zeugnisse:</strong> Nur beilegen, wenn sie
            relevant für die aktuelle Bewerbung sind oder einen wichtigen
            Karriereabschnitt dokumentieren
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Beachte dabei branchenspezifische Erwartungen: In konservativen
          Branchen wie Banken oder Versicherungen werden vollständige Zeugnisse
          oft erwartet, während in der{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "bewerbung-bei-startups" },
            })}
            style={linkStyles}
          >
            Start-up-Szene
          </a>{" "}
          oder Kreativbranchen andere Qualifikationsnachweise wichtiger sein
          können.
        </p>

        <H3>Positive Aspekte hervorheben</H3>
        <p style={styles.content.paragraph}>
          Die Stärken aus deinem Zeugnis kannst du aktiv in deiner Bewerbung
          nutzen:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Zitiere besonders positive Bewertungen im Anschreiben ("Wie mein
            ehemaliger Arbeitgeber bestätigt, konnte ich 'komplexe Projekte
            selbstständig und termingerecht umsetzen'")
          </li>
          <li style={styles.content.listItem}>
            Greife besonders relevante Kompetenzen auf, die sowohl im Zeugnis
            dokumentiert als auch für die neue Stelle wichtig sind
          </li>
          <li style={styles.content.listItem}>
            Nutze die im Zeugnis beschriebenen Erfolge und Projekte, um deine
            Erfahrungen im{" "}
            <a
              href={serializeRoute({
                kind: RouteKind.Blog,
                blogRoute: { kind: "lebenslauf-guide" },
              })}
              style={linkStyles}
            >
              Lebenslauf
            </a>{" "}
            zu konkretisieren
          </li>
        </ul>

        <H3>Mit negativen Aspekten umgehen</H3>
        <p style={styles.content.paragraph}>
          Wenn dein Zeugnis problematische Formulierungen enthält, solltest du
          eine Strategie entwickeln:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Proaktive Erklärung:</strong> Bei offensichtlichen Problemen
            kannst du im{" "}
            <a
              href={serializeRoute({
                kind: RouteKind.Blog,
                blogRoute: { kind: "vorstellungsgespraech-haeufige-fragen" },
              })}
              style={linkStyles}
            >
              Vorstellungsgespräch
            </a>{" "}
            die Situation erklären, bevor du danach gefragt wirst
          </li>
          <li style={styles.content.listItem}>
            <strong>Ehrliche Reflexion:</strong> Zeige, dass du aus schwierigen
            Situationen gelernt hast
          </li>
          <li style={styles.content.listItem}>
            <strong>Alternative Referenzen:</strong> Wenn möglich, füge andere
            positive Referenzen bei, z.B. von Kunden, Projektpartnern oder
            früheren Vorgesetzten
          </li>
          <li style={styles.content.listItem}>
            <strong>Fokus auf die Zukunft:</strong> Lenke den Schwerpunkt auf
            deine aktuellen Fähigkeiten und die Motivation für die neue Position
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Der{" "}
            <a style={linkStyles} href="https://bewerbungshelfer.net">
              Bewerbungshelfer
            </a>{" "}
            kann dir dabei helfen, die positiven Aspekte deines
            Arbeitszeugnisses gezielt in dein Anschreiben und deinen Lebenslauf
            zu integrieren. Die KI-Unterstützung analysiert, welche Stärken aus
            deinem Zeugnis besonders relevant für die angestrebte Position sind,
            und hilft dir, diese überzeugend in deinen Bewerbungsunterlagen
            darzustellen.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>
          Internationale Bewerbungen: Arbeitszeugnisse im globalen Kontext
        </H2>
        <p style={styles.content.paragraph}>
          Das deutsche Arbeitszeugnis mit seiner codierten Sprache und dem
          rechtlich verankerten Wohlwollensprinzip ist international eine
          Besonderheit. Bei Bewerbungen im Ausland oder bei internationalen
          Unternehmen in Deutschland solltest du daher einige Besonderheiten
          beachten:
        </p>

        <H3>Kulturelle Unterschiede verstehen</H3>
        <p style={styles.content.paragraph}>
          In vielen Ländern existiert kein vergleichbares System von umfassenden
          Arbeitszeugnissen:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Angelsächsischer Raum (USA, UK):</strong> Hier sind kurze
            Bestätigungsschreiben üblich, ergänzt durch persönliche Referenzen,
            die direkt kontaktiert werden können
          </li>
          <li style={styles.content.listItem}>
            <strong>Frankreich:</strong> "Certificat de travail" bestätigt
            lediglich die Art und Dauer der Beschäftigung ohne Bewertung
          </li>
          <li style={styles.content.listItem}>
            <strong>Skandinavien:</strong> Ähnlich wie in Deutschland
            detaillierte Zeugnisse, jedoch ohne die codierte Sprache
          </li>
          <li style={styles.content.listItem}>
            <strong>Asiatischer Raum:</strong> Stark formalisierte
            Bestätigungen, persönliche Netzwerke und Empfehlungen sind wichtiger
          </li>
        </ul>

        <H3>Strategien für internationale Bewerbungen</H3>
        <p style={styles.content.paragraph}>
          Um dein deutsches Arbeitszeugnis international nutzbar zu machen,
          kannst du folgende Ansätze verfolgen:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Übersetzung mit Erläuterung:</strong> Lass dein Zeugnis
            professionell übersetzen und füge eine kurze Erklärung zum deutschen
            Zeugnissystem bei
          </li>
          <li style={styles.content.listItem}>
            <strong>Referenzschreiben anfordern:</strong> Bitte deinen
            ehemaligen Arbeitgeber um ein zusätzliches, international übliches
            Referenzschreiben
          </li>
          <li style={styles.content.listItem}>
            <strong>Executive Summary erstellen:</strong> Fasse die wichtigsten
            positiven Punkte deines Zeugnisses in einem kurzen, klaren Statement
            zusammen
          </li>
          <li style={styles.content.listItem}>
            <strong>Persönliche Referenzen anbieten:</strong> Gib Kontaktdaten
            von früheren Vorgesetzten an, die bereit sind, direkt Auskunft zu
            geben (mit deren Einverständnis)
          </li>
        </ul>

        <H3>Deutsche Besonderheiten erklären</H3>
        <p style={styles.content.paragraph}>
          Bei Bewerbungsgesprächen mit internationalen Unternehmen kann es
          hilfreich sein, das deutsche Zeugnissystem kurz zu erläutern:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Erkläre den rechtlichen Rahmen und das Wohlwollensprinzip
          </li>
          <li style={styles.content.listItem}>
            Übersetze die Bewertungsskala in international verständliche
            Begriffe
          </li>
          <li style={styles.content.listItem}>
            Hebe konkrete Erfolge und Verantwortlichkeiten hervor, die im
            Zeugnis dokumentiert sind
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Für internationale Bewerbungen kann es sinnvoll sein, einen{" "}
            <a
              href={serializeRoute({
                kind: RouteKind.Blog,
                blogRoute: { kind: "lebenslauf-englisch" },
              })}
              style={linkStyles}
            >
              englischen Lebenslauf
            </a>{" "}
            nach internationalen Standards zu erstellen, der die relevanten
            Informationen aus deinem Arbeitszeugnis bereits integriert.
            Besonders für{" "}
            <a
              href={serializeRoute({
                kind: RouteKind.Blog,
                blogRoute: { kind: "remote-jobs-bewerbung" },
              })}
              style={linkStyles}
            >
              Remote-Jobs bei internationalen Unternehmen
            </a>{" "}
            ist dies unerlässlich.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Proaktiv handeln: Dein nächstes Arbeitszeugnis beeinflussen</H2>
        <p style={styles.content.paragraph}>
          Während es wichtig ist, ein bestehendes Arbeitszeugnis richtig zu
          verstehen und einzusetzen, solltest du auch vorausschauend denken. Du
          kannst aktiv Einfluss darauf nehmen, wie dein nächstes Zeugnis
          aussehen wird.
        </p>

        <H3>Kontinuierliche Dokumentation deiner Erfolge</H3>
        <p style={styles.content.paragraph}>
          Eine systematische Erfassung deiner Leistungen hilft dir nicht nur bei
          der Zeugniserstellung, sondern auch bei{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "gehaltsverhandlung-meistern" },
            })}
            style={linkStyles}
          >
            Gehaltsverhandlungen
          </a>{" "}
          und Bewerbungsgesprächen:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Führe ein "Erfolgsjournal" mit abgeschlossenen Projekten, erreichten
            Zielen und positiven Rückmeldungen
          </li>
          <li style={styles.content.listItem}>
            Sammle konkrete Zahlen und Daten: Umsatzsteigerungen,
            Kosteneinsparungen, Kundenfeedback
          </li>
          <li style={styles.content.listItem}>
            Bewahre Lob und Anerkennungen (E-Mails, Mitteilungen) auf
          </li>
          <li style={styles.content.listItem}>
            Dokumentiere absolvierte Weiterbildungen und erworbene
            Qualifikationen
          </li>
        </ul>

        <H3>Strategischer Einsatz von Zwischenzeugnissen</H3>
        <p style={styles.content.paragraph}>
          Wie bereits erwähnt, kann ein Zwischenzeugnis ein wertvolles
          Instrument sein:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Beantrage ein Zwischenzeugnis nach erfolgreichen Projekten oder
            positiven Beurteilungsgesprächen
          </li>
          <li style={styles.content.listItem}>
            Verwende das Zwischenzeugnis als Referenz für das spätere Endzeugnis
          </li>
          <li style={styles.content.listItem}>
            Bei Wechsel des Vorgesetzten sichert ein Zwischenzeugnis die
            Beurteilung durch jemanden, der deine Arbeit gut kennt
          </li>
        </ul>

        <H3>Aktive Mitgestaltung beim Ausscheiden</H3>
        <p style={styles.content.paragraph}>
          Beim Verlassen eines Unternehmens hast du verschiedene Möglichkeiten,
          auf dein Zeugnis Einfluss zu nehmen:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Selbst einen Entwurf vorschlagen:</strong> In vielen
            Unternehmen ist es akzeptiert oder sogar erwünscht, wenn Mitarbeiter
            einen Entwurf ihres Zeugnisses einreichen
          </li>
          <li style={styles.content.listItem}>
            <strong>Exitgespräch nutzen:</strong> Sprich das Thema
            Arbeitszeugnis im Abschlussgespräch proaktiv an
          </li>
          <li style={styles.content.listItem}>
            <strong>Wichtige Projekte hervorheben:</strong> Erinnere an deine
            Erfolge und besonderen Beiträge
          </li>
          <li style={styles.content.listItem}>
            <strong>Vorschläge für Formulierungen machen:</strong> Wenn du die
            Zeugnissprache kennst, kannst du bestimmte Formulierungen
            diplomatisch anregen
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Bei der Erstellung eines eigenen Zeugnisvorschlags kann dich der{" "}
            <a style={linkStyles} href="https://bewerbungshelfer.net">
              Bewerbungshelfer
            </a>{" "}
            unterstützen. Die KI kann dir helfen, deine Erfolge und Kompetenzen
            in der richtigen Zeugnissprache zu formulieren und so einen
            professionellen Entwurf zu erstellen, den dein Arbeitgeber als Basis
            verwenden kann.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Digitalisierung und moderne Trends bei Arbeitszeugnissen</H2>
        <p style={styles.content.paragraph}>
          Auch das traditionelle Arbeitszeugnis wird von der digitalen
          Transformation beeinflusst. Neue Formate und Ansätze ergänzen oder
          ersetzen teilweise das klassische Dokument:
        </p>

        <H3>Digitale Zeugnisse und Verifizierungsplattformen</H3>
        <p style={styles.content.paragraph}>
          Zunehmend werden Arbeitszeugnisse digital erstellt und geteilt:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Digitale Signatur:</strong> Rechtsgültig signierte
            PDF-Dokumente ersetzen zunehmend Papierdokumente
          </li>
          <li style={styles.content.listItem}>
            <strong>Verifizierungsplattformen:</strong> Dienste wie LinkedIn,
            XING oder spezialisierte Plattformen bieten Möglichkeiten zur
            Verifizierung von Qualifikationen und Arbeitsverhältnissen
          </li>
          <li style={styles.content.listItem}>
            <strong>Blockchain-basierte Lösungen:</strong> Erste Ansätze zur
            fälschungssicheren Dokumentation von Qualifikationen und
            Arbeitszeugnissen
          </li>
        </ul>

        <H3>Skill-basierte Bewertungen und Referenzsysteme</H3>
        <p style={styles.content.paragraph}>
          Ergänzend zum klassischen Zeugnis entwickeln sich neue
          Bewertungsformen:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Skill-Endorsements:</strong> Plattformen wie LinkedIn
            ermöglichen Bestätigungen spezifischer Fähigkeiten durch Kollegen
          </li>
          <li style={styles.content.listItem}>
            <strong>Peer-Reviews:</strong> Bewertungen durch Kollegen, nicht nur
            durch Vorgesetzte
          </li>
          <li style={styles.content.listItem}>
            <strong>Projekt-Portfolios:</strong> Dokumentation konkreter
            Projektergebnisse statt allgemeiner Bewertungen
          </li>
          <li style={styles.content.listItem}>
            <strong>Open Badges:</strong> Digitale Abzeichen für spezifische
            Kompetenzen und Erfahrungen
          </li>
        </ul>

        <H3>Branchenspezifische Entwicklungen</H3>
        <p style={styles.content.paragraph}>
          Verschiedene Branchen entwickeln eigene Ansätze:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>IT und Tech:</strong> GitHub-Profil, Stack
            Overflow-Reputation oder Beiträge zu Open-Source-Projekten als
            Referenz
          </li>
          <li style={styles.content.listItem}>
            <strong>Kreativbranche:</strong> Digitale Portfolios mit
            Kundenbewertungen statt klassischer Zeugnisse
          </li>
          <li style={styles.content.listItem}>
            <strong>Freelancer und Gig-Economy:</strong> Plattform-Ratings und
            Kundenbewertungen als primäre Referenz
          </li>
          <li style={styles.content.listItem}>
            <strong>Akademischer Bereich:</strong> Publikationen,
            Zitationsindizes und Projekterfolge neben klassischen Referenzen
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Trotz dieser Entwicklungen bleibt das klassische Arbeitszeugnis in
          Deutschland rechtlich und kulturell fest verankert. Für die meisten
          Branchen und Positionen ist es nach wie vor ein zentrales Element im
          Bewerbungsprozess. Die neuen Formate und Plattformen sind daher eher
          als Ergänzung zu verstehen, die zusätzliche Perspektiven auf deine
          beruflichen Qualifikationen bieten.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Um dein digitales Profil optimal mit deinem klassischen
            Arbeitszeugnis zu verbinden, achte auf Konsistenz: Die Kompetenzen
            und Erfolge, die im Zeugnis hervorgehoben werden, sollten sich auch
            in deinen Online-Profilen und digitalen Portfolios widerspiegeln. So
            entsteht ein stimmiges Gesamtbild, das deine Karriere authentisch
            dokumentiert.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Fazit: Dein Arbeitszeugnis als Karriereinstrument nutzen</H2>
        <p style={styles.content.paragraph}>
          Das Arbeitszeugnis ist weit mehr als nur ein formaler Abschluss eines
          Beschäftigungsverhältnisses. Richtig verstanden und eingesetzt, kann
          es ein wertvolles Instrument für deine Karriereentwicklung sein. Die
          wichtigsten Erkenntnisse zusammengefasst:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Verstehen:</strong> Die codierte Sprache der
            Arbeitszeugnisse zu kennen ist der erste Schritt, um ihren wahren
            Wert zu erkennen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Prüfen:</strong> Eine systematische Analyse deines
            Zeugnisses hilft dir, Stärken zu identifizieren und mögliche
            Schwachstellen zu erkennen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Handeln:</strong> Bei Problemen kannst du – und solltest du
            – dein Recht auf ein korrektes und wohlwollendes Zeugnis einfordern.
          </li>
          <li style={styles.content.listItem}>
            <strong>Nutzen:</strong> Die positiven Aspekte deines Zeugnisses
            sollten gezielt in deine Bewerbungsunterlagen und
            Vorstellungsgespräche einfließen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Vorausdenken:</strong> Durch proaktives Handeln kannst du
            bereits während deiner Beschäftigung die Weichen für ein gutes
            zukünftiges Zeugnis stellen.
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          In einer Zeit, in der Arbeitsbiografien zunehmend dynamischer werden
          und Jobwechsel häufiger stattfinden, gewinnt die richtige Handhabung
          von Arbeitszeugnissen weiter an Bedeutung. Wer die Regeln und Codes
          kennt, kann dieses Instrument strategisch für die eigene
          Karriereentwicklung nutzen.
        </p>

        <p style={styles.content.paragraph}>
          Denk daran: Ein Arbeitszeugnis ist nur ein Teil deines professionellen
          Profils. In Kombination mit einem überzeugenden{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "lebenslauf-guide" },
            })}
            style={linkStyles}
          >
            Lebenslauf
          </a>{" "}
          und einem auf die Stelle zugeschnittenen{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "anschreiben-guide" },
            })}
            style={linkStyles}
          >
            Anschreiben
          </a>{" "}
          bildet es die Grundlage für deinen nächsten Karriereschritt.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Der{" "}
            <a style={linkStyles} href="https://bewerbungshelfer.net">
              Bewerbungshelfer
            </a>{" "}
            unterstützt dich dabei, die Stärken aus deinem Arbeitszeugnis
            optimal in deine Bewerbungsunterlagen zu integrieren. Die
            KI-gestützte Analyse hilft dir, die relevanten Aspekte deines
            Zeugnisses zu identifizieren und gezielt in deinem Lebenslauf und
            Anschreiben hervorzuheben. So entsteht ein überzeugendes Gesamtbild,
            das deine Qualifikationen und Erfolge optimal präsentiert – der
            Schlüssel zu deinem nächsten Karriereschritt.
          </p>
        </div>
      </section>
    </>
  );
}
