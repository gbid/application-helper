import { styles } from "./shared";
import { H2 } from "./shared";
import { H3 } from "./shared";
import { linkStyles } from "./shared";
import { serializeRoute } from "../route";
import { RouteKind } from "../route";

export function BoreoutAmArbeitsplatz() {
  return (
    <>
      <section style={styles.content.section}>
        <p style={styles.content.paragraph}>
          Während Burnout als Folge von Überlastung weithin bekannt ist, bleibt
          ein anderes berufliches Phänomen oft im Verborgenen: das
          Boreout-Syndrom. Paradoxerweise leiden immer mehr Menschen nicht unter
          zu viel, sondern unter zu wenig Arbeit – oder besser gesagt, unter
          Arbeit, die sie nicht fordert, nicht erfüllt und keinen Sinn stiftet.
          Diese chronische Unterforderung kann ebenso belastend sein wie
          Überarbeitung und ähnlich schwerwiegende Folgen haben.
        </p>

        <p style={styles.content.paragraph}>
          Vielleicht kennst du das Gefühl: Der Arbeitstag kriecht dahin, du hast
          deine wenigen Aufgaben längst erledigt, scrollst zum dritten Mal durch
          dieselben Nachrichten und wartest nur darauf, dass endlich Feierabend
          ist. Was anfangs als angenehme Entlastung erscheinen mag, entwickelt
          sich schleichend zu einem Zustand der Leere, Frustration und
          beruflichen Sinnkrise.
        </p>

        <div style={styles.content.note}>
          Kurz & Knapp: Boreout ist ein Syndrom beruflicher Unterforderung, das
          durch Langeweile, Desinteresse und fehlenden Sinn gekennzeichnet ist.
          Im Gegensatz zum Burnout entstehen die psychischen Belastungen nicht
          durch Überforderung, sondern durch qualitative und quantitative
          Unterforderung. Die Folgen können ebenso gravierend sein wie beim
          Burnout und reichen von Konzentrationsproblemen über Schlafstörungen
          bis hin zu Depressionen.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Was ist Boreout? Definition und Abgrenzung</H2>
        <p style={styles.content.paragraph}>
          Der Begriff "Boreout" wurde 2007 von den Schweizer
          Unternehmensberatern Philippe Rothlin und Peter Werder geprägt. Sie
          beschrieben damit ein Syndrom, das durch drei Hauptelemente
          gekennzeichnet ist: Langeweile, Desinteresse und Unterforderung am
          Arbeitsplatz. Anders als beim Burnout, wo Menschen unter der Last
          ihrer Aufgaben zusammenbrechen, leiden Betroffene eines Boreouts unter
          einem Mangel an herausfordernden und sinnstiftenden Tätigkeiten.
        </p>

        <H3>Die drei Kernelemente des Boreout-Syndroms</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Unterforderung:</strong> Die beruflichen Anforderungen
            liegen deutlich unter den Fähigkeiten und Potenzialen des
            Mitarbeiters – sowohl quantitativ (zu wenig Arbeit) als auch
            qualitativ (zu einfache Aufgaben).
          </li>
          <li style={styles.content.listItem}>
            <strong>Langeweile:</strong> Ein Zustand der Monotonie und des
            Desinteresses, der durch fehlende Stimulation und Herausforderung
            entsteht.
          </li>
          <li style={styles.content.listItem}>
            <strong>Desinteresse:</strong> Die Identifikation mit der eigenen
            Arbeit und deren Inhalten geht verloren, was zu innerer Kündigung
            und Gleichgültigkeit führt.
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Als viertes Element wird oft der fehlende berufliche Sinn genannt.
          Wenn die eigene Tätigkeit als bedeutungslos empfunden wird, verstärkt
          dies die Symptome des Boreouts erheblich. Die Betroffenen fragen sich
          zunehmend: "Warum mache ich das überhaupt?" – eine Frage, die im
          heutigen Arbeitsumfeld, in dem Sinnhaftigkeit einen hohen Stellenwert
          hat, besonders belastend sein kann.
        </p>

        <H3>Boreout vs. Burnout: Zwei Seiten derselben Medaille</H3>
        <p style={styles.content.paragraph}>
          Boreout und Burnout erscheinen zunächst als Gegensätze: zu wenig
          versus zu viel Arbeit. In Wirklichkeit sind sie jedoch eng verwandt
          und teilen viele Symptome:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Beide führen zu Erschöpfung – beim Burnout durch Überanstrengung,
            beim Boreout durch die Anstrengung, Untätigkeit zu ertragen oder zu
            verbergen
          </li>
          <li style={styles.content.listItem}>
            Beide können Depressionen, Angstzustände und psychosomatische
            Beschwerden verursachen
          </li>
          <li style={styles.content.listItem}>
            Beide resultieren in verminderter Leistungsfähigkeit und Motivation
          </li>
          <li style={styles.content.listItem}>
            Beide entstehen oft in einem problematischen Arbeitsumfeld mit
            mangelhafter Führung
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Der entscheidende Unterschied liegt in der Ursache: Während Burnout
          aus der Überlastung entsteht, entwickelt sich Boreout aus der
          Unterforderung. Interessanterweise können beide Zustände sogar
          parallel auftreten – etwa wenn jemand quantitativ überlastet ist, aber
          qualitativ unterfordert wird.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Die Symptome von Boreout und Burnout sind für Außenstehende oft
            schwer zu unterscheiden. In beiden Fällen ziehen sich Betroffene
            zurück, wirken erschöpft und unzufrieden. Ein wichtiger Hinweis auf
            Boreout ist jedoch, wenn Menschen nach der Arbeit plötzlich wieder
            energiegeladen sind – während Burnout-Betroffene auch in der
            Freizeit erschöpft bleiben.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Die Symptome des Boreouts erkennen</H2>
        <p style={styles.content.paragraph}>
          Ein Boreout entwickelt sich typischerweise schleichend und wird von
          den Betroffenen selbst und ihrem Umfeld oft lange nicht erkannt. Die
          Symptome lassen sich in verschiedene Bereiche unterteilen:
        </p>

        <H3>Emotionale und psychische Anzeichen</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Lustlosigkeit und Apathie:</strong> Ein grundlegendes
            Desinteresse an der eigenen Arbeit
          </li>
          <li style={styles.content.listItem}>
            <strong>Innere Leere:</strong> Das Gefühl, beruflich auf der Stelle
            zu treten oder sogar zu verkümmern
          </li>
          <li style={styles.content.listItem}>
            <strong>Frustration und Reizbarkeit:</strong> Wachsender Ärger über
            die mangelnde Herausforderung oder Wertschätzung
          </li>
          <li style={styles.content.listItem}>
            <strong>Selbstzweifel:</strong> Sinkender Selbstwert durch das
            Gefühl, nicht gebraucht zu werden
          </li>
          <li style={styles.content.listItem}>
            <strong>Scham:</strong> Viele Betroffene schämen sich für ihre
            Situation und halten sie geheim
          </li>
        </ul>

        <H3>Körperliche Symptome</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Chronische Müdigkeit:</strong> Paradoxerweise führt
            Unterforderung zu Erschöpfung
          </li>
          <li style={styles.content.listItem}>
            <strong>Schlafstörungen:</strong> Einschlaf- oder
            Durchschlafprobleme trotz Müdigkeit
          </li>
          <li style={styles.content.listItem}>
            <strong>Psychosomatische Beschwerden:</strong> Kopfschmerzen,
            Rückenschmerzen, Verdauungsprobleme
          </li>
          <li style={styles.content.listItem}>
            <strong>Geschwächtes Immunsystem:</strong> Erhöhte Anfälligkeit für
            Infekte und Krankheiten
          </li>
        </ul>

        <H3>Verhaltensänderungen am Arbeitsplatz</H3>
        <p style={styles.content.paragraph}>
          Besonders charakteristisch für Boreout sind bestimmte Strategien, die
          Betroffene entwickeln, um mit ihrer Situation umzugehen:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Beschäftigungsstrategie:</strong> Das aktive Bemühen,
            beschäftigt zu wirken, obwohl keine Aufgaben anstehen (z.B. durch
            hektisches Tippen, wenn der Chef vorbeikommt)
          </li>
          <li style={styles.content.listItem}>
            <strong>Komprimierungsstrategie:</strong> Aufgaben werden bewusst in
            die Länge gezogen, um die Arbeitszeit zu füllen
          </li>
          <li style={styles.content.listItem}>
            <strong>Vermeidungsstrategie:</strong> Neue Aufgaben werden
            abgelehnt oder vermieden, um nicht aufzufallen
          </li>
          <li style={styles.content.listItem}>
            <strong>Pseudo-Burnout:</strong> Einige stellen Stress und
            Überlastung dar, um ihre tatsächliche Unterforderung zu verbergen
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Der Selbsttest: Wenn du regelmäßig die Zeit bis zum Feierabend
            zählst, mehr als 2 Stunden täglich mit privaten Dingen verbringst,
            ohne dass es auffällt, oder dir regelmäßig Ausreden einfallen lassen
            musst, um zu erklären, warum du noch nicht fertig bist – könntest du
            von Boreout betroffen sein.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Die Ursachen: Warum entsteht Boreout?</H2>
        <p style={styles.content.paragraph}>
          Boreout ist selten auf einen einzelnen Faktor zurückzuführen, sondern
          entsteht aus einem Zusammenspiel verschiedener Umstände. Die Ursachen
          lassen sich in drei Hauptbereiche unterteilen:
        </p>

        <H3>Strukturelle und organisatorische Faktoren</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Ineffiziente Arbeitsverteilung:</strong> Ungleiche
            Verteilung von Aufgaben innerhalb eines Teams
          </li>
          <li style={styles.content.listItem}>
            <strong>Überbesetzung:</strong> Zu viele Mitarbeiter für die
            vorhandenen Aufgaben
          </li>
          <li style={styles.content.listItem}>
            <strong>Bürokratie und starre Prozesse:</strong> Behindern
            eigenverantwortliches und sinnstiftendes Arbeiten
          </li>
          <li style={styles.content.listItem}>
            <strong>Fehlende Entwicklungsmöglichkeiten:</strong> Wenn
            berufliches Wachstum und Lernen nicht gefördert werden
          </li>
          <li style={styles.content.listItem}>
            <strong>Mangelndes Feedback:</strong> Ohne Rückmeldung verlieren
            viele Menschen die Orientierung und Motivation
          </li>
        </ul>

        <H3>Führungsbedingte Ursachen</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Fehlende Wahrnehmung der Mitarbeiter:</strong>{" "}
            Führungskräfte, die die Fähigkeiten und Bedürfnisse ihrer
            Mitarbeiter nicht kennen
          </li>
          <li style={styles.content.listItem}>
            <strong>Mikromanagement:</strong> Übermäßige Kontrolle, die
            eigenständiges Arbeiten verhindert
          </li>
          <li style={styles.content.listItem}>
            <strong>Mangelnde Delegation:</strong> Wenn Führungskräfte nicht
            angemessen Verantwortung abgeben
          </li>
          <li style={styles.content.listItem}>
            <strong>Fehlende Anerkennung:</strong> Mangel an Wertschätzung für
            geleistete Arbeit
          </li>
        </ul>

        <H3>Persönliche Faktoren</H3>
        <p style={styles.content.paragraph}>
          Auch individuelle Eigenschaften und Lebenssituationen spielen eine
          Rolle:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Überqualifikation:</strong> Wenn die eigenen Fähigkeiten
            weit über die Anforderungen hinausgehen
          </li>
          <li style={styles.content.listItem}>
            <strong>Falsche Berufswahl:</strong> Arbeit in einem Bereich, der
            nicht den eigenen Interessen entspricht
          </li>
          <li style={styles.content.listItem}>
            <strong>Veränderte Lebensumstände:</strong> Wer außerhalb der Arbeit
            stark gefordert wird (z.B. durch Familie oder Weiterbildung),
            braucht möglicherweise auch beruflich mehr Herausforderung für ein
            ausgewogenes Leben
          </li>
          <li style={styles.content.listItem}>
            <strong>Persönlichkeitsmerkmale:</strong> Menschen mit hohem Antrieb
            und Leistungsorientierung leiden besonders unter Unterforderung
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Interessanterweise findet sich Boreout oft in vermeintlich
          attraktiven, gut bezahlten Jobs. Gerade in großen Unternehmen mit
          komplexen Strukturen können Mitarbeiter "übersehen" werden oder in
          Positionen geraten, die auf dem Papier anspruchsvoll klingen, aber in
          der Praxis wenig Herausforderung bieten.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Studien zeigen, dass besonders die "Sandwich-Generation" – gut
            ausgebildete Fachkräfte zwischen 30 und 40 Jahren – von Boreout
            betroffen ist. Oft haben diese Menschen bereits einige
            Berufserfahrung, finden sich aber in Positionen wieder, die ihre
            Fähigkeiten nicht ausschöpfen oder keine klaren
            Aufstiegsperspektiven bieten.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Die Folgen von chronischer Unterforderung</H2>
        <p style={styles.content.paragraph}>
          Ein Boreout ist weit mehr als nur ein unangenehmes Gefühl. Wenn der
          Zustand chronisch wird, kann er erhebliche Auswirkungen auf
          verschiedene Lebensbereiche haben:
        </p>

        <H3>Folgen für die psychische Gesundheit</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Depressionen:</strong> Anhaltende Unterforderung kann zu
            depressiven Verstimmungen bis hin zu klinischen Depressionen führen
          </li>
          <li style={styles.content.listItem}>
            <strong>Angststörungen:</strong> Insbesondere soziale Ängste und
            Versagensängste können zunehmen
          </li>
          <li style={styles.content.listItem}>
            <strong>Verlust des Selbstwertgefühls:</strong> Die eigenen
            Fähigkeiten werden infrage gestellt
          </li>
          <li style={styles.content.listItem}>
            <strong>Identitätskrisen:</strong> Wenn die berufliche Identität
            wegbricht, kann dies fundamentale Fragen zum eigenen Leben aufwerfen
          </li>
        </ul>

        <H3>Beeinträchtigung der physischen Gesundheit</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Chronische Erschöpfung:</strong> Paradoxerweise kann
            Unterforderung ähnlich erschöpfend sein wie Überforderung
          </li>
          <li style={styles.content.listItem}>
            <strong>Geschwächtes Immunsystem:</strong> Psychische Belastung kann
            die körperliche Abwehr schwächen
          </li>
          <li style={styles.content.listItem}>
            <strong>Somatische Beschwerden:</strong> Kopf- und Rückenschmerzen,
            Verdauungsprobleme, Herz-Kreislauf-Belastungen
          </li>
          <li style={styles.content.listItem}>
            <strong>Suchtverhalten:</strong> Erhöhtes Risiko für übermäßigen
            Alkoholkonsum oder andere Suchtmittel als "Selbstmedikation"
          </li>
        </ul>

        <H3>Auswirkungen auf Karriere und Privatleben</H3>
        <p style={styles.content.paragraph}>
          Die Konsequenzen reichen weit über das aktuelle Befinden hinaus:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Kompetenzverlust:</strong> Fähigkeiten, die nicht genutzt
            werden, verkümmern – ein "Deskilling" findet statt
          </li>
          <li style={styles.content.listItem}>
            <strong>Karrierestagnation:</strong> Fehlende Entwicklung führt zu
            Lücken im Lebenslauf und erschwert berufliche Veränderungen
          </li>
          <li style={styles.content.listItem}>
            <strong>Work-Life-Konflikte:</strong> Die Unzufriedenheit im Job
            belastet oft auch Partnerschaften und Familienleben
          </li>
          <li style={styles.content.listItem}>
            <strong>Finanzielle Konsequenzen:</strong> Längerfristig können
            Gehaltseinbußen durch fehlende Entwicklung oder krankheitsbedingte
            Ausfälle entstehen
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Besonders problematisch: Viele Betroffene trauen sich nicht, ihre
          Situation anzusprechen. Sie befürchten, als undankbar oder inkompetent
          zu gelten, wenn sie zugeben, dass sie sich langweilen oder mehr
          Herausforderung brauchen. Diese "stille Krise" kann jahrelang andauern
          und erheblichen Schaden anrichten – sowohl für den Einzelnen als auch
          für das Unternehmen.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Eine besondere Herausforderung stellt die Bewerbung nach einer
            längeren Boreout-Phase dar. In unserem Artikel zum{" "}
            <a
              href={serializeRoute({
                kind: RouteKind.Blog,
                blogRoute: { kind: "anschreiben-guide" },
              })}
              style={linkStyles}
            >
              perfekten Anschreiben
            </a>{" "}
            findest du Tipps, wie du auch nach einer Phase beruflicher
            Stagnation überzeugen kannst.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Boreout überwinden: Strategien für Betroffene</H2>
        <p style={styles.content.paragraph}>
          Wenn du merkst, dass du von Boreout betroffen bist, gibt es
          verschiedene Wege, die Situation zu verbessern. Die folgenden
          Strategien können dir helfen, wieder mehr Erfüllung im Beruf zu
          finden:
        </p>

        <H3>Selbstreflexion und Bestandsaufnahme</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Analyse der Situation:</strong> Identifiziere genau, was
            dich unterfordert. Ist es die Menge der Arbeit, ihre Qualität oder
            fehlt dir die Sinnhaftigkeit?
          </li>
          <li style={styles.content.listItem}>
            <strong>Stärken und Interessen reflektieren:</strong> Welche deiner
            Fähigkeiten werden nicht genutzt? Welche Aufgaben würdest du dir
            wünschen?
          </li>
          <li style={styles.content.listItem}>
            <strong>Berufliche Ziele definieren:</strong> Wohin möchtest du dich
            entwickeln? Welche Kompetenzen aufbauen?
          </li>
          <li style={styles.content.listItem}>
            <strong>Werteklärung:</strong> Was ist dir im Beruf wirklich
            wichtig? Status, Sicherheit, Kreativität, Autonomie, soziale
            Bedeutung?
          </li>
        </ul>

        <H3>Aktive Veränderung der aktuellen Position</H3>
        <p style={styles.content.paragraph}>
          Bevor du gleich kündigst, lohnt es sich oft, die bestehende Stelle zu
          modifizieren:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Job Crafting:</strong> Gestalte deinen Job aktiv um, indem
            du neue Aufgabenbereiche übernimmst oder Prozesse verbesserst
          </li>
          <li style={styles.content.listItem}>
            <strong>Gespräch mit Vorgesetzten:</strong> Kommuniziere deine
            Situation konstruktiv – nicht als Beschwerde, sondern als Wunsch
            nach mehr Verantwortung
          </li>
          <li style={styles.content.listItem}>
            <strong>Projektarbeit anbieten:</strong> Schlage konkrete Projekte
            vor, die dich interessieren und dem Unternehmen nutzen
          </li>
          <li style={styles.content.listItem}>
            <strong>Weiterbildung einfordern:</strong> Bitte um Fortbildungen,
            die deine Fähigkeiten erweitern und dich für anspruchsvollere
            Aufgaben qualifizieren
          </li>
          <li style={styles.content.listItem}>
            <strong>Mentoring oder Coaching:</strong> Suche nach internen oder
            externen Mentoren, die dich in deiner Entwicklung unterstützen
          </li>
        </ul>

        <H3>Strategien zur Selbsthilfe</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Mikro-Herausforderungen schaffen:</strong> Setze dir selbst
            kleine Ziele, um den Arbeitsalltag interessanter zu gestalten
          </li>
          <li style={styles.content.listItem}>
            <strong>Wissensaufbau:</strong> Nutze freie Kapazitäten für
            selbstgesteuertes Lernen, das dir später nutzen kann
          </li>
          <li style={styles.content.listItem}>
            <strong>Netzwerken:</strong> Knüpfe Kontakte in anderen Abteilungen,
            um Einblicke in neue Bereiche zu bekommen
          </li>
          <li style={styles.content.listItem}>
            <strong>Nebenprojekte:</strong> Engagiere dich in
            unternehmensinternen Initiativen, Arbeitsgruppen oder sozialen
            Projekten
          </li>
          <li style={styles.content.listItem}>
            <strong>Work-Life-Balance neu denken:</strong> Suche vorübergehend
            mehr Erfüllung in Hobbys oder ehrenamtlichen Tätigkeiten, während du
            berufliche Veränderungen vorbereitest
          </li>
        </ul>

        <H3>Die Option Jobwechsel</H3>
        <p style={styles.content.paragraph}>
          Wenn alle Versuche zur Verbesserung der aktuellen Situation scheitern,
          kann ein Stellenwechsel nötig sein:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Strategische Bewerbung:</strong> Suche gezielt nach Stellen,
            die deinen Fähigkeiten und Bedürfnissen besser entsprechen
          </li>
          <li style={styles.content.listItem}>
            <strong>Eigeninitiative zeigen:</strong> Bereite dich auf einen
            Wechsel vor, indem du deinen{" "}
            <a
              href={serializeRoute({
                kind: RouteKind.Blog,
                blogRoute: { kind: "lebenslauf-guide" },
              })}
              style={linkStyles}
            >
              Lebenslauf optimierst
            </a>{" "}
            und deine Fähigkeiten auffrischst
          </li>
          <li style={styles.content.listItem}>
            <strong>In Vorstellungsgesprächen nachfragen:</strong> Erkundige
            dich gezielt nach Entwicklungsmöglichkeiten, Herausforderungen und
            Arbeitskultur
          </li>
          <li style={styles.content.listItem}>
            <strong>Berufliche Neuorientierung:</strong> Manchmal ist ein
            kompletter Berufswechsel sinnvoll – besonders wenn die
            Unterforderung mit dem Berufsfeld zusammenhängt
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Bei der Suche nach einer neuen Stelle kann dir der{" "}
            <a style={linkStyles} href="https://bewerbungshelfer.net">
              Bewerbungshelfer
            </a>{" "}
            dabei unterstützen, deine bisher nicht genutzten Fähigkeiten und
            Potenziale überzeugend darzustellen. Die KI hilft dir, auch
            verborgene Kompetenzen zu identifizieren und in deinen
            Bewerbungsunterlagen hervorzuheben.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>
          Boreout aus Arbeitgeberperspektive: Prävention und Gegenmaßnahmen
        </H2>
        <p style={styles.content.paragraph}>
          Boreout ist nicht nur ein individuelles Problem, sondern auch eine
          Herausforderung für Unternehmen. Unterforderte Mitarbeiter sind
          weniger produktiv, innovativ und loyal. Studien zeigen, dass
          Unternehmen durch Boreout erhebliche wirtschaftliche Einbußen erleiden
          können – durch Präsentismus (körperliche Anwesenheit bei geistiger
          Abwesenheit), erhöhte Fluktuation und Krankheitsausfälle.
        </p>

        <H3>Früherkennung von Boreout-Symptomen</H3>
        <p style={styles.content.paragraph}>
          Führungskräfte sollten auf folgende Warnsignale achten:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Verhaltensänderungen:</strong> Bisher engagierte Mitarbeiter
            werden passiv oder vermeiden Verantwortung
          </li>
          <li style={styles.content.listItem}>
            <strong>Präsentismus:</strong> Mitarbeiter sind anwesend, aber
            unproduktiv oder abgelenkt
          </li>
          <li style={styles.content.listItem}>
            <strong>"Busy-Show":</strong> Übertriebene Darstellung von
            Geschäftigkeit ohne entsprechende Ergebnisse
          </li>
          <li style={styles.content.listItem}>
            <strong>Rückgang der Arbeitsqualität:</strong> Nachlässigkeitsfehler
            oder mangelnde Sorgfalt bei sonst kompetenten Mitarbeitern
          </li>
          <li style={styles.content.listItem}>
            <strong>Häufige Kurzabwesenheiten:</strong> Zunehmende kurze
            Krankschreibungen können auf psychische Belastung hindeuten
          </li>
        </ul>

        <H3>Strategien zur Boreout-Prävention</H3>
        <p style={styles.content.paragraph}>
          Unternehmen können verschiedene Maßnahmen ergreifen, um Boreout
          vorzubeugen:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Passende Stellenbesetzung:</strong> Bereits im Recruiting
            auf die Übereinstimmung von Anforderungen und Qualifikationen achten
          </li>
          <li style={styles.content.listItem}>
            <strong>Regelmäßige Entwicklungsgespräche:</strong> Nicht nur
            Leistung bewerten, sondern auch Zufriedenheit und
            Entwicklungswünsche thematisieren
          </li>
          <li style={styles.content.listItem}>
            <strong>Job Enlargement und Enrichment:</strong> Aufgabenbereiche
            horizontal und vertikal erweitern
          </li>
          <li style={styles.content.listItem}>
            <strong>Rotationsprinzip:</strong> Regelmäßiger Wechsel zwischen
            verschiedenen Aufgabenbereichen
          </li>
          <li style={styles.content.listItem}>
            <strong>Autonomie fördern:</strong> Mitarbeitern mehr
            Entscheidungsfreiheit und Verantwortung übertragen
          </li>
          <li style={styles.content.listItem}>
            <strong>Weiterbildungskultur:</strong> Kontinuierliches Lernen und
            Entwicklung als Teil der Unternehmenskultur etablieren
          </li>
          <li style={styles.content.listItem}>
            <strong>Sinnstiftung:</strong> Den größeren Zusammenhang und die
            Bedeutung auch kleiner Aufgaben verdeutlichen
          </li>
        </ul>

        <H3>Führungsverantwortung bei bestehendem Boreout</H3>
        <p style={styles.content.paragraph}>
          Wenn Mitarbeiter bereits Anzeichen von Boreout zeigen, können
          Führungskräfte so reagieren:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Offene Gesprächskultur schaffen:</strong> Ein Umfeld, in dem
            Unterforderung ohne Scham angesprochen werden kann
          </li>
          <li style={styles.content.listItem}>
            <strong>Individuelle Lösungen entwickeln:</strong> Gemeinsam mit dem
            Mitarbeiter nach Wegen suchen, die Position anzupassen
          </li>
          <li style={styles.content.listItem}>
            <strong>Potenziale erkennen und fördern:</strong> Verborgene Talente
            und Interessen identifizieren und nutzen
          </li>
          <li style={styles.content.listItem}>
            <strong>Mentoring-Programme:</strong> Erfahrene Mitarbeiter mit
            Nachwuchskräften zusammenbringen
          </li>
          <li style={styles.content.listItem}>
            <strong>Interne Mobilität fördern:</strong> Wechsel zwischen
            Abteilungen oder Standorten erleichtern
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            In einer Zeit des Fachkräftemangels ist es besonders wichtig,
            qualifizierte Mitarbeiter nicht durch vermeidbare Unterforderung zu
            verlieren. Investitionen in die Prävention von Boreout zahlen sich
            durch höhere Mitarbeiterbindung, gesteigerte Produktivität und
            reduzierte Fehlzeiten aus.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Rechtliche Aspekte und Boreout als Krankheit</H2>
        <p style={styles.content.paragraph}>
          Obwohl Boreout als Begriff noch nicht so etabliert ist wie Burnout,
          gewinnt er auch in rechtlicher und medizinischer Hinsicht zunehmend an
          Bedeutung.
        </p>

        <H3>Arbeitsrechtliche Perspektive</H3>
        <p style={styles.content.paragraph}>
          In Deutschland gibt es verschiedene rechtliche Aspekte, die bei
          Boreout relevant sein können:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Beschäftigungspflicht:</strong> Arbeitgeber sind
            grundsätzlich verpflichtet, Arbeitnehmer entsprechend ihrer
            vertraglich vereinbarten Tätigkeit zu beschäftigen
          </li>
          <li style={styles.content.listItem}>
            <strong>Fürsorgepflicht:</strong> Der Arbeitgeber muss die
            Gesundheit seiner Mitarbeiter schützen – auch vor psychischen
            Belastungen durch Unterforderung
          </li>
          <li style={styles.content.listItem}>
            <strong>Arbeitsschutzgesetz:</strong> Verpflichtet Arbeitgeber, auch
            psychische Belastungen am Arbeitsplatz zu erfassen und zu minimieren
          </li>
          <li style={styles.content.listItem}>
            <strong>Kündigungsschutz:</strong> Eine Kündigung wegen
            Leistungsdefiziten, die auf Boreout zurückzuführen sind, kann unter
            Umständen unwirksam sein
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          In einzelnen Fällen haben Gerichte bereits Entschädigungen für durch
          Unterforderung verursachte psychische Leiden zugesprochen. Die
          Rechtsprechung entwickelt sich in diesem Bereich jedoch noch und ist
          nicht einheitlich.
        </p>

        <H3>Boreout als medizinische Diagnose</H3>
        <p style={styles.content.paragraph}>
          Im Gegensatz zum Burnout ist Boreout noch keine eigenständige
          diagnostische Kategorie in den gängigen Klassifikationssystemen
          (ICD-10/11 oder DSM-5). Die Symptome werden jedoch zunehmend ernst
          genommen:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Diagnose-Einordnung:</strong> Symptome eines Boreouts werden
            oft unter Anpassungsstörungen, depressiven Episoden oder
            arbeitsplatzbezogenen Neurasthenie-Diagnosen erfasst
          </li>
          <li style={styles.content.listItem}>
            <strong>Krankschreibung:</strong> Bei entsprechender Symptomschwere
            können Ärzte Boreout-Betroffene krankschreiben
          </li>
          <li style={styles.content.listItem}>
            <strong>Therapiemöglichkeiten:</strong> Psychotherapie, Coaching und
            arbeitsbezogene Beratung können bei der Bewältigung helfen
          </li>
          <li style={styles.content.listItem}>
            <strong>Rehabilitation:</strong> In schweren Fällen können
            Rehabilitationsmaßnahmen indiziert sein
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Wichtig: Auch wenn Boreout keine offizielle Diagnose ist, sind die
            dadurch verursachten psychischen und körperlichen Leiden real und
            behandlungsbedürftig. Zögere nicht, ärztliche oder therapeutische
            Hilfe in Anspruch zu nehmen, wenn du unter den Folgen chronischer
            Unterforderung leidest.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Boreout im Kontext moderner Arbeitswelten</H2>
        <p style={styles.content.paragraph}>
          Die Arbeitswelt befindet sich im Wandel – und damit verändern sich
          auch die Risikofaktoren und Erscheinungsformen von Boreout. Besonders
          in der Post-Corona-Ära und mit zunehmender Digitalisierung entstehen
          neue Herausforderungen.
        </p>

        <H3>Boreout im Home-Office und bei Remote-Arbeit</H3>
        <p style={styles.content.paragraph}>
          Die Flexibilisierung der Arbeitswelt bringt eigene Boreout-Risiken mit
          sich:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Isolationseffekte:</strong> Fehlender direkter Austausch
            kann Monotonie verstärken
          </li>
          <li style={styles.content.listItem}>
            <strong>Digitale Präsenz:</strong> Der Druck, ständig online und
            ansprechbar zu sein, kann zu einer neuen Form der
            "Beschäftigungsstrategie" führen
          </li>
          <li style={styles.content.listItem}>
            <strong>Wahrnehmungsproblem:</strong> Im Home-Office bemerken
            Führungskräfte Unterforderung oft später
          </li>
          <li style={styles.content.listItem}>
            <strong>Work-Life-Blending:</strong> Die Grenzen zwischen Arbeit und
            Privatleben verschwimmen, was die Kompensation von Boreout
            erschweren kann
          </li>
        </ul>

        <H3>Generationenspezifische Aspekte</H3>
        <p style={styles.content.paragraph}>
          Die verschiedenen Generationen am Arbeitsmarkt haben unterschiedliche
          Erwartungen und Boreout-Risiken:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Generation Z:</strong> Legt besonderen Wert auf
            Sinnhaftigkeit und persönliche Entwicklung – Boreout-Risiko bei
            standardisierten Einstiegspositionen
          </li>
          <li style={styles.content.listItem}>
            <strong>Millennials:</strong> Oft gut ausgebildet, aber in
            Positionen mit geringem Entscheidungsspielraum – Diskrepanz zwischen
            Erwartung und Realität
          </li>
          <li style={styles.content.listItem}>
            <strong>Generation X:</strong> Risiko der "Mid-Career-Crisis" –
            festgefahren in Positionen ohne neue Herausforderungen
          </li>
          <li style={styles.content.listItem}>
            <strong>Babyboomer:</strong> Gefahr der Unterforderung in den
            letzten Berufsjahren, wenn jüngere Kollegen vorgezogen werden
          </li>
        </ul>

        <H3>Entwicklungstrends und Zukunftsperspektiven</H3>
        <p style={styles.content.paragraph}>
          Verschiedene Trends deuten darauf hin, wie sich Boreout und der Umgang
          damit entwickeln könnten:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>New Work-Konzepte:</strong> Flexiblere Arbeitsmodelle, die
            mehr Selbstbestimmung ermöglichen, können Boreout reduzieren
          </li>
          <li style={styles.content.listItem}>
            <strong>Automatisierung:</strong> Routineaufgaben werden zunehmend
            automatisiert, was Freiräume für kreativere Tätigkeiten schaffen
            kann
          </li>
          <li style={styles.content.listItem}>
            <strong>Lebenslanges Lernen:</strong> Kontinuierliche Weiterbildung
            wird zur Norm und kann Unterforderung vorbeugen
          </li>
          <li style={styles.content.listItem}>
            <strong>Work-Life-Integration:</strong> Statt strikter Trennung eine
            bessere Integration von beruflichen und privaten Interessen
          </li>
          <li style={styles.content.listItem}>
            <strong>Multiprofessionalität:</strong> Flexible Karrierewege mit
            verschiedenen Tätigkeitsfeldern statt linearer Laufbahnen
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Die Pandemie hat viele Menschen zum Nachdenken über ihre berufliche
            Situation gebracht. Die sogenannte "Great Resignation" zeigt, dass
            immer mehr Menschen nicht bereit sind, in unbefriedigenden Jobs zu
            verharren. Diese neue Selbstreflexion kann langfristig zu besseren
            Job-Matches und weniger Boreout führen.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Fazit: Den Weg aus der Unterforderung finden</H2>
        <p style={styles.content.paragraph}>
          Boreout ist ein ernstzunehmendes Problem der modernen Arbeitswelt, das
          lange im Schatten des besser bekannten Burnouts stand. Die chronische
          Unterforderung kann ebenso belastend sein wie Überlastung und ähnlich
          schwerwiegende gesundheitliche und berufliche Folgen haben.
        </p>

        <p style={styles.content.paragraph}>
          Der erste Schritt zur Überwindung eines Boreouts ist das Erkennen und
          Anerkennen des Problems. Viele Betroffene leiden still, weil sie sich
          schämen oder fürchten, als undankbar zu gelten. Doch berufliche
          Erfüllung ist kein Luxus, sondern ein berechtigtes Bedürfnis – und
          letztlich auch im Interesse des Arbeitgebers.
        </p>

        <p style={styles.content.paragraph}>
          Die gute Nachricht: Es gibt viele Wege aus der Unterforderungsfalle.
          Von der aktiven Umgestaltung der eigenen Position über gezielte
          Weiterbildung bis hin zum wohlüberlegten Jobwechsel – mit der
          richtigen Strategie lässt sich berufliche Erfüllung zurückgewinnen.
        </p>

        <p style={styles.content.paragraph}>
          Für Unternehmen ist das Thema Boreout eine Chance, die eigene
          Arbeitskultur zu reflektieren und weiterzuentwickeln. Organisationen,
          die ihre Mitarbeiter weder über- noch unterfordern, sondern ihnen
          passende Herausforderungen und Entwicklungsmöglichkeiten bieten,
          werden im Wettbewerb um qualifizierte Fachkräfte klar im Vorteil sein.
        </p>

        <p style={styles.content.paragraph}>
          Letztendlich geht es um die Frage, wie wir arbeiten wollen – und wie
          Arbeit so gestaltet werden kann, dass sie nicht nur wirtschaftlich
          produktiv ist, sondern auch persönlich bereichernd. In einer Zeit, in
          der wir einen großen Teil unseres Lebens bei der Arbeit verbringen,
          ist diese Frage wichtiger denn je.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Wenn du nach einer Phase des Boreouts einen Neuanfang wagst, kann
            dir der{" "}
            <a style={linkStyles} href="https://bewerbungshelfer.net">
              Bewerbungshelfer
            </a>{" "}
            dabei helfen, deine Bewerbungsunterlagen so zu gestalten, dass sie
            deine tatsächlichen Fähigkeiten und Potenziale optimal darstellen.
            Die KI-gestützte Analyse hilft dir, die richtigen Stärken
            hervorzuheben und zeigt dir, wie du auch in einer Phase beruflicher
            Unterforderung erworbene Kompetenzen überzeugend präsentieren
            kannst.
          </p>
        </div>
      </section>
    </>
  );
}
