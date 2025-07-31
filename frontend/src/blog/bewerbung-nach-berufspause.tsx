import { styles } from "./shared";
import { H2 } from "./shared";
import { H3 } from "./shared";
import { linkStyles } from "./shared";
import { serializeRoute } from "../route";
import { RouteKind } from "../route";

export function BewerbungNachBerufspause() {
  return (
    <>
      <section style={styles.content.section}>
        <p style={styles.content.paragraph}>
          Eine Lücke im Lebenslauf – für viele Bewerber ein Grund zur Sorge. Ob
          Elternzeit, gesundheitliche Auszeit, Pflege von Angehörigen oder eine
          bewusste Karrierepause: Unterbrechungen im Berufsleben sind heute
          keine Seltenheit mehr. Dennoch fragen sich viele, wie potenzielle
          Arbeitgeber auf diese Lücken reagieren werden und wie man sie am
          besten darstellt, ohne die eigenen Chancen zu mindern.
        </p>

        <p style={styles.content.paragraph}>
          Die gute Nachricht: Mit der richtigen Strategie können Lücken im
          Lebenslauf nicht nur erklärt, sondern sogar als Stärke präsentiert
          werden. Besonders in Zeiten von verbreiteter Homeoffice-Arbeit und
          flexiblen Arbeitsmodellen hat sich die Einstellung zu beruflichen
          Auszeiten grundlegend gewandelt.
        </p>

        <div style={styles.content.note}>
          Kurz & Knapp: Berufliche Auszeiten sind heute normal und müssen kein
          Hindernis bei der Jobsuche sein. Mit der richtigen Darstellung im
          Lebenslauf, einem selbstbewussten Anschreiben und guter Vorbereitung
          auf Nachfragen im Gespräch kannst du deine Berufspause sogar als
          Vorteil präsentieren. Besonders die wachsende Homeoffice-Kultur bietet
          Wiedereinsteigern neue Chancen und Flexibilität.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Warum Lücken im Lebenslauf heute anders bewertet werden</H2>
        <p style={styles.content.paragraph}>
          Die Arbeitswelt hat sich verändert: Lebenslange Beschäftigung beim
          selben Arbeitgeber ist längst nicht mehr die Norm. Stattdessen prägen
          berufliche Neuorientierungen, Weiterbildungsphasen und bewusste
          Auszeiten moderne Karrierewege. Personaler wissen das – und bewerten
          Lücken im Lebenslauf heute differenzierter als noch vor einigen
          Jahren.
        </p>

        <p style={styles.content.paragraph}>
          Besonders die Covid-19-Pandemie hat zu einem Umdenken geführt. Die
          massive Verbreitung von Homeoffice hat gezeigt, dass Arbeit flexibler
          gestaltet werden kann und nicht an starre Präsenzzeiten gebunden sein
          muss. Davon profitieren auch Bewerber mit Lücken im Lebenslauf, denn:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Selbstorganisation und eigenverantwortliches Arbeiten – Fähigkeiten,
            die viele während einer Auszeit vertiefen – sind im Homeoffice
            besonders gefragt
          </li>
          <li style={styles.content.listItem}>
            Flexible Arbeitsmodelle und Remote-Arbeit erleichtern den
            schrittweisen Wiedereinstieg
          </li>
          <li style={styles.content.listItem}>
            Unternehmen suchen verstärkt nach Mitarbeitern mit vielfältigen
            Lebenserfahrungen und Perspektiven
          </li>
        </ul>

        <H3>Die häufigsten Gründe für Lücken im Lebenslauf</H3>
        <p style={styles.content.paragraph}>
          Berufliche Auszeiten entstehen aus verschiedensten Gründen. Die
          häufigsten sind:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Elternzeit und Familienphase:</strong> Die klassische
            Auszeit zur Betreuung von Kindern
          </li>
          <li style={styles.content.listItem}>
            <strong>Pflege von Angehörigen:</strong> Eine oft unterschätzte,
            aber zunehmend relevante Form der Berufspause
          </li>
          <li style={styles.content.listItem}>
            <strong>Gesundheitliche Gründe:</strong> Von Burnout-Prävention bis
            zur Genesung nach Erkrankungen
          </li>
          <li style={styles.content.listItem}>
            <strong>Weiterbildung und Studium:</strong> Investition in die
            eigene Qualifikation
          </li>
          <li style={styles.content.listItem}>
            <strong>Sabbatical und Auslandsaufenthalt:</strong> Bewusste
            Auszeiten zur persönlichen Weiterentwicklung
          </li>
          <li style={styles.content.listItem}>
            <strong>Arbeitslosigkeit:</strong> Auch unfreiwillige Pausen können
            konstruktiv genutzt werden
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Egal welcher Grund hinter deiner Berufspause steht – entscheidend ist
          nicht die Lücke selbst, sondern wie du sie kommunizierst und welche
          Kompetenzen du während dieser Zeit entwickelt hast.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Heute gilt: Eine Berufspause ist kein Makel, sondern Teil einer
            individuellen Berufsbiografie. Besonders im Zeitalter von Homeoffice
            und New Work zählt weniger die lückenlose Karriere als vielmehr,
            welche Fähigkeiten und Perspektiven du mitbringst.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Lücken im Lebenslauf richtig darstellen</H2>
        <p style={styles.content.paragraph}>
          Bei der Darstellung von Berufspausen im Lebenslauf gibt es
          verschiedene Strategien. Welche für dich die richtige ist, hängt von
          der Art und Dauer deiner Auszeit ab. Grundsätzlich gilt jedoch:
          Transparenz ist besser als Verschleierung, und aktive Formulierungen
          sind stärker als passive.
        </p>

        <H3>Die Chronologie wählen</H3>
        <p style={styles.content.paragraph}>
          Für den Lebenslauf stehen dir grundsätzlich zwei Formate zur
          Verfügung:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Chronologischer Lebenslauf:</strong> Die klassische Form mit
            zeitlicher Abfolge der Stationen
          </li>
          <li style={styles.content.listItem}>
            <strong>Funktionaler Lebenslauf:</strong> Fokus auf Kompetenzen und
            Fähigkeiten statt auf den zeitlichen Verlauf
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Bei längeren oder mehrfachen Lücken kann der funktionale Lebenslauf
          Vorteile bieten, da er den Schwerpunkt auf deine Qualifikationen legt.
          In den meisten Fällen ist jedoch der chronologische Lebenslauf
          üblicher und wird von Personalern bevorzugt, da er einen klaren
          Überblick gibt.
        </p>

        <H3>Berufspausen aktiv benennen</H3>
        <p style={styles.content.paragraph}>
          Statt Lücken einfach zu ignorieren, solltest du sie als eigenständige
          Stationen in deinem Lebenslauf aufführen. Dabei gilt:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Gib einen präzisen Zeitraum an, genau wie bei beruflichen Stationen
          </li>
          <li style={styles.content.listItem}>
            Wähle eine klare, positive Bezeichnung für die Auszeit
          </li>
          <li style={styles.content.listItem}>
            Hebe relevante Aktivitäten und erworbene Kompetenzen hervor
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Beispiele für positive Formulierungen je nach Art der Berufspause:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Bei Elternzeit:</strong> "Familienphase: Betreuung und
            Erziehung meiner Kinder, parallel Freiberufliche Tätigkeit im
            Bereich Webdesign"
          </li>
          <li style={styles.content.listItem}>
            <strong>Bei Weiterbildung:</strong> "Berufliche Neuorientierung:
            Weiterbildung zum Wirtschaftsfachwirt (IHK), berufsbegleitendes
            Studium"
          </li>
          <li style={styles.content.listItem}>
            <strong>Bei gesundheitlicher Auszeit:</strong> "Sabbatical:
            Regeneration und persönliche Weiterentwicklung, Ehrenamtliches
            Engagement bei [Organisation]"
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Wichtig ist, den Fokus auf die aktive Gestaltung der Zeit zu legen und
          nicht auf den Grund der Unterbrechung. Besonders wertvoll sind
          Aktivitäten, die einen Bezug zur angestrebten Position haben.
        </p>

        <H3>Homeoffice-relevante Kompetenzen hervorheben</H3>
        <p style={styles.content.paragraph}>
          Da immer mehr Positionen zumindest teilweise im Homeoffice ausgeübt
          werden können, lohnt es sich, speziell solche Erfahrungen und
          Kompetenzen zu betonen, die für erfolgreiches Arbeiten im heimischen
          Büro relevant sind:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Selbstorganisation und Zeitmanagement
          </li>
          <li style={styles.content.listItem}>
            Digitale Kommunikationsfähigkeiten
          </li>
          <li style={styles.content.listItem}>
            Eigenverantwortliches Arbeiten
          </li>
          <li style={styles.content.listItem}>
            IT-Kenntnisse und Erfahrung mit Collaboration-Tools
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Gerade Bewerber, die während ihrer Berufspause etwa als Freiberufler,
          durch ehrenamtliches Engagement oder private Projekte diese
          Fähigkeiten gestärkt haben, können dies als besonderen Vorteil für
          Homeoffice-Positionen präsentieren.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Ein professionell gestalteter Lebenslauf ist besonders wichtig, wenn
            du Lücken erklären musst. Der{" "}
            <a style={linkStyles} href="https://bewerbungshelfer.net">
              Bewerbungshelfer
            </a>{" "}
            kann dir dabei helfen, deine Berufspause optimal zu formulieren und
            in einen überzeugenden{" "}
            <a
              href={serializeRoute({
                kind: RouteKind.Blog,
                blogRoute: { kind: "lebenslauf-guide" },
              })}
              style={linkStyles}
            >
              Lebenslauf
            </a>{" "}
            zu integrieren.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Das Anschreiben: Selbstbewusst Lücken thematisieren</H2>
        <p style={styles.content.paragraph}>
          Während der Lebenslauf deine Berufspause neutral dokumentiert, bietet
          das{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "anschreiben-guide" },
            })}
            style={linkStyles}
          >
            Anschreiben
          </a>{" "}
          die Chance, diese proaktiv und positiv zu erklären. Dabei solltest du
          selbstbewusst, aber nicht defensiv vorgehen.
        </p>

        <H3>Wann Lücken ansprechen?</H3>
        <p style={styles.content.paragraph}>
          Es gibt keine allgemeingültige Regel, ob du deine Berufspause im
          Anschreiben thematisieren solltest. Als Faustregel gilt:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Bei aktuellen oder längeren Lücken (über 6 Monate) ist eine kurze
            Erklärung sinnvoll
          </li>
          <li style={styles.content.listItem}>
            Bei bereits länger zurückliegenden oder kurzen Pausen kann ein
            Hinweis im Anschreiben unnötig sein
          </li>
          <li style={styles.content.listItem}>
            Wenn die Stelle besondere Kontinuität erfordert, solltest du das
            Thema proaktiv ansprechen
          </li>
        </ul>

        <H3>Die richtige Formulierung finden</H3>
        <p style={styles.content.paragraph}>
          Wenn du dich entscheidest, die Berufspause im Anschreiben zu erwähnen,
          konzentriere dich auf diese Aspekte:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Positive Formulierung:</strong> Betone den Wert der
            Erfahrung statt dich zu entschuldigen
          </li>
          <li style={styles.content.listItem}>
            <strong>Gewonnene Kompetenzen:</strong> Stelle einen Bezug zur
            angestrebten Position her
          </li>
          <li style={styles.content.listItem}>
            <strong>Motivation für den Wiedereinstieg:</strong> Erkläre, warum
            jetzt der richtige Zeitpunkt ist
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Ein Beispiel für eine gelungene Formulierung nach einer Elternzeit
          könnte sein:
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            "Nach einer bewusst gestalteten Familienphase, in der ich neben der
            Betreuung meiner Kinder meine Kenntnisse im Bereich Online-Marketing
            durch Weiterbildungen aktuell gehalten habe, freue ich mich nun auf
            neue berufliche Herausforderungen. Die in dieser Zeit verstärkte
            Fähigkeit zum Multitasking, effizientem Zeitmanagement und
            lösungsorientiertem Handeln möchte ich gerne in Ihr Team
            einbringen."
          </p>
        </div>

        <H3>Homeoffice als Brücke zum Wiedereinstieg</H3>
        <p style={styles.content.paragraph}>
          Falls die ausgeschriebene Stelle Homeoffice-Möglichkeiten bietet, kann
          es strategisch klug sein, diesen Aspekt in Verbindung mit deinem
          Wiedereinstieg zu thematisieren:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Betone deine Erfahrung mit selbstständigem Arbeiten
          </li>
          <li style={styles.content.listItem}>
            Hebe deine digitalen Kompetenzen hervor
          </li>
          <li style={styles.content.listItem}>
            Erkläre, wie Homeoffice dir einen optimalen Wiedereinstieg
            ermöglicht
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Ein Beispielabschnitt könnte lauten:
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            "Die in Ihrer Stellenausschreibung angebotene Homeoffice-Option
            entspricht ideal meiner Arbeitsweise. Während meiner
            Selbstständigkeit habe ich meine Projekte eigenverantwortlich aus
            dem Home-Office geführt und dabei alle relevanten digitalen
            Kollaborationstools wie Microsoft Teams, Slack und Asana effizient
            eingesetzt. Diese Erfahrung ermöglicht mir einen nahtlosen Einstieg
            in Ihr virtuelles Teamumfeld."
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Auf Nachfragen im Vorstellungsgespräch vorbereitet sein</H2>
        <p style={styles.content.paragraph}>
          Auch bei optimaler Darstellung im Lebenslauf und Anschreiben ist es
          wahrscheinlich, dass deine Berufspause im Vorstellungsgespräch
          thematisiert wird. Mit der richtigen Vorbereitung kannst du diese
          Fragen souverän meistern.
        </p>

        <H3>Typische Fragen und starke Antworten</H3>
        <p style={styles.content.paragraph}>
          Hier sind einige häufige Fragen und Ansätze für überzeugende
          Antworten:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>
              Frage: "Wie haben Sie die Zeit Ihrer Berufspause genutzt?"
            </strong>
            <br />
            Antwort: Konkrete Aktivitäten nennen, die Selbstdisziplin,
            Lernbereitschaft oder andere beruflich relevante Eigenschaften
            zeigen.
          </li>
          <li style={styles.content.listItem}>
            <strong>
              Frage: "Warum möchten Sie gerade jetzt wieder einsteigen?"
            </strong>
            <br />
            Antwort: Positiven Grund für den Zeitpunkt nennen und Begeisterung
            für die neue Aufgabe ausdrücken.
          </li>
          <li style={styles.content.listItem}>
            <strong>
              Frage: "Sind Sie auf dem aktuellen Stand in Ihrem Fachgebiet?"
            </strong>
            <br />
            Antwort: Auf Weiterbildungen, Fachliteratur oder andere Aktivitäten
            verweisen, die deine Fachkenntnisse aktuell gehalten haben.
          </li>
          <li style={styles.content.listItem}>
            <strong>
              Frage: "Wie stellen Sie sich den Wiedereinstieg vor?"
            </strong>
            <br />
            Antwort: Realistische Erwartungen zeigen, aber auch Selbstvertrauen
            und Lernbereitschaft signalisieren.
          </li>
        </ul>

        <H3>Die Homeoffice-Kompetenz unterstreichen</H3>
        <p style={styles.content.paragraph}>
          Viele Unternehmen prüfen heute, ob Bewerber die nötigen
          Voraussetzungen für effizientes Arbeiten im Homeoffice mitbringen.
          Bereite dich auf entsprechende Fragen vor:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>
              Frage: "Wie organisieren Sie Ihren Arbeitstag im Homeoffice?"
            </strong>
            <br />
            Antwort: Konkrete Routinen und Strategien beschreiben, die deine
            Selbstorganisation zeigen.
          </li>
          <li style={styles.content.listItem}>
            <strong>
              Frage: "Wie bleiben Sie mit Kollegen in Kontakt, wenn Sie remote
              arbeiten?"
            </strong>
            <br />
            Antwort: Deine Kommunikationsstrategien und Erfahrungen mit
            verschiedenen Tools erläutern.
          </li>
          <li style={styles.content.listItem}>
            <strong>
              Frage: "Welche Herausforderungen sehen Sie beim Arbeiten im
              Homeoffice?"
            </strong>
            <br />
            Antwort: Ehrlich Herausforderungen benennen, aber vor allem die
            Lösungen betonen, die du gefunden hast.
          </li>
        </ul>

        <H3>Authentisch bleiben</H3>
        <p style={styles.content.paragraph}>
          Bei allen Vorbereitungen ist Authentizität entscheidend. Versuche
          nicht, deine Berufspause als etwas darzustellen, was sie nicht war.
          Personaler schätzen ehrliche Selbstreflexion mehr als glatte,
          offensichtlich einstudierte Antworten.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Ein guter Tipp: Übe das Gespräch über deine Berufspause mit Freunden
            oder Familie. So gewinnst du Sicherheit und findest die für dich
            passenden Formulierungen. Denke daran: Die meisten Personaler
            interessieren sich weniger für die Lücke selbst als vielmehr dafür,
            wie du mit dieser Situation umgegangen bist und was du daraus
            mitgenommen hast.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Homeoffice als Chance für den Wiedereinstieg</H2>
        <p style={styles.content.paragraph}>
          Die zunehmende Verbreitung von Homeoffice und hybriden Arbeitsmodellen
          bietet besondere Chancen für Bewerber nach einer Berufspause. Diese
          Flexibilität kann den Wiedereinstieg erheblich erleichtern und sollte
          in deiner Bewerbungsstrategie berücksichtigt werden.
        </p>

        <H3>Vorteile des Homeoffice für Wiedereinsteiger</H3>
        <p style={styles.content.paragraph}>
          Remote-Arbeit bietet mehrere Vorteile, die besonders für Bewerber nach
          einer Berufspause relevant sind:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Schrittweiser Wiedereinstieg:</strong> Homeoffice-Tage
            lassen sich oft leichter mit anderen Verpflichtungen vereinbaren
          </li>
          <li style={styles.content.listItem}>
            <strong>Reduzierte Pendelzeiten:</strong> Mehr Energie für die
            eigentliche Arbeit und bessere Work-Life-Balance
          </li>
          <li style={styles.content.listItem}>
            <strong>Fokussiertes Arbeiten:</strong> Im eigenen Umfeld kannst du
            oft konzentrierter arbeiten und dich leichter wieder einarbeiten
          </li>
          <li style={styles.content.listItem}>
            <strong>Technische Einarbeitung:</strong> Zeit, sich mit neuen Tools
            und Technologien vertraut zu machen
          </li>
        </ul>

        <H3>Nach Homeoffice-Möglichkeiten gezielt suchen</H3>
        <p style={styles.content.paragraph}>
          Bei der Jobsuche lohnt es sich, gezielt nach Positionen mit
          Homeoffice-Option zu suchen:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Nutze Suchfilter auf Jobportalen, die "Homeoffice", "Remote" oder
            "Hybrid" als Optionen anbieten
          </li>
          <li style={styles.content.listItem}>
            Recherchiere die Homeoffice-Politik von Unternehmen, die dich
            interessieren
          </li>
          <li style={styles.content.listItem}>
            Erwäge auch Positionen mit 100% Remote-Arbeit, die oft besonders
            familienfreundlich sind
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Achtung: Auch wenn eine Stelle Homeoffice-Optionen bietet, solltest du
          im Bewerbungsprozess Flexibilität signalisieren. Zeige, dass du bereit
          bist, für wichtige Meetings oder Einarbeitungsphasen vor Ort zu sein.
        </p>

        <H3>Homeoffice-Erfahrung als Pluspunkt darstellen</H3>
        <p style={styles.content.paragraph}>
          Wenn du während deiner Berufspause bereits Erfahrungen mit Heimarbeit
          gesammelt hast – etwa durch freiberufliche Projekte, ehrenamtliches
          Engagement oder Weiterbildungen – solltest du dies als besonderen
          Vorteil hervorheben:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Betone deine Erfahrung mit virtueller Zusammenarbeit
          </li>
          <li style={styles.content.listItem}>
            Erwähne spezifische Tools und Plattformen, mit denen du bereits
            gearbeitet hast
          </li>
          <li style={styles.content.listItem}>
            Beschreibe, wie du deinen Arbeitsplatz zuhause professionell
            eingerichtet hast
          </li>
          <li style={styles.content.listItem}>
            Stelle dar, wie du die Herausforderungen des Homeoffice erfolgreich
            gemeistert hast
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Studien zeigen, dass Unternehmen zunehmend die Vorteile flexibler
            Arbeitsmodelle erkennen. Nach einer Erhebung des Digitalverbands
            Bitkom bieten inzwischen 70% der Unternehmen in Deutschland
            Homeoffice-Möglichkeiten an. Für Bewerber nach einer Berufspause
            eröffnet dies neue Wege für einen sanfteren Wiedereinstieg ins
            Berufsleben.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Spezialfall: Bewerbung nach Elternzeit</H2>
        <p style={styles.content.paragraph}>
          Elternzeit ist eine der häufigsten und gesellschaftlich
          akzeptiertesten Formen der Berufspause. Dennoch gibt es einige
          spezifische Aspekte, die du bei deiner Bewerbung nach der
          Familienphase beachten solltest.
        </p>

        <H3>Rechtlicher Rahmen und Ansprüche</H3>
        <p style={styles.content.paragraph}>
          Wichtig zu wissen: Nach der Elternzeit hast du einen rechtlichen
          Anspruch auf Rückkehr zu deinem früheren Arbeitgeber. Falls du dich
          dennoch neu bewerben möchtest oder musst, beachte folgende Punkte:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Die Elternzeit darf vom potenziellen Arbeitgeber nicht negativ
            bewertet werden (AGG)
          </li>
          <li style={styles.content.listItem}>
            Fragen nach Familienplanung im Vorstellungsgespräch sind unzulässig
          </li>
          <li style={styles.content.listItem}>
            Teilzeitwünsche sollten idealerweise erst nach einer Zusage
            thematisiert werden
          </li>
        </ul>

        <H3>In Lebenslauf und Anschreiben</H3>
        <p style={styles.content.paragraph}>
          Bei der Darstellung der Elternzeit in den Bewerbungsunterlagen gilt:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Im Lebenslauf:</strong> Nutze Begriffe wie "Familienphase"
            oder "Elternzeit" mit konkreten Zeitangaben
          </li>
          <li style={styles.content.listItem}>
            <strong>Im Anschreiben:</strong> Erwähne nebenbei absolvierte
            Weiterbildungen oder freiberufliche Tätigkeiten
          </li>
          <li style={styles.content.listItem}>
            <strong>Kompetenzen betonen:</strong> Organisationsfähigkeit,
            Multitasking, Stressresistenz und Verantwortungsbewusstsein sind
            während der Elternzeit geschärfte Fähigkeiten
          </li>
        </ul>

        <H3>Homeoffice und Vereinbarkeit</H3>
        <p style={styles.content.paragraph}>
          Besonders für Eltern bietet Homeoffice Vorteile bei der Vereinbarkeit
          von Familie und Beruf:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Zeitersparnnis:</strong> Wegfallende Pendelzeiten schenken
            mehr Familienzeit
          </li>
          <li style={styles.content.listItem}>
            <strong>Flexibilität bei Notfällen:</strong> Bei Krankheit des
            Kindes schneller reaktionsfähig
          </li>
          <li style={styles.content.listItem}>
            <strong>Bessere Übergänge:</strong> Sanfterer Einstieg in die
            Betreuungssituation für Kinder
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Wichtig: Trotz dieser Vorteile solltest du in der Bewerbung
          vermitteln, dass deine Kinderbetreuung auch während der Arbeitszeit
          zuverlässig geregelt ist. Homeoffice bedeutet nicht, parallel Kinder
          zu betreuen und zu arbeiten.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Ein Tipp aus der Praxis: Nenne in deinen Bewerbungsunterlagen auch
            ehrenamtliches Engagement während der Elternzeit, etwa im
            Elternbeirat oder bei der Organisation von Veranstaltungen. Dies
            zeigt, dass du auch in dieser Phase aktiv geblieben bist und
            Verantwortung übernommen hast – Eigenschaften, die im Berufsleben
            gefragt sind.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Nach längerer Arbeitslosigkeit zurück ins Berufsleben</H2>
        <p style={styles.content.paragraph}>
          Arbeitslosigkeit ist eine besondere Form der Berufspause, die viele
          Bewerber als besonders erklärungsbedürftig empfinden. Doch auch hier
          gibt es Strategien, um diese Zeit positiv darzustellen und den
          Wiedereinstieg erfolgreich zu gestalten.
        </p>

        <H3>Ehrlich, aber strategisch kommunizieren</H3>
        <p style={styles.content.paragraph}>
          Bei Arbeitslosigkeit ist ein ausgewogener Kommunikationsansatz
          wichtig:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Verschleierung vermeiden:</strong> Versuche nicht, die
            Arbeitslosigkeit zu verstecken – dies kann später zu
            Vertrauensverlust führen
          </li>
          <li style={styles.content.listItem}>
            <strong>Neutraler Begriff:</strong> Verwende im Lebenslauf neutrale
            Begriffe wie "Berufliche Neuorientierung" oder "Aktive Arbeitssuche"
          </li>
          <li style={styles.content.listItem}>
            <strong>Aktivitäten betonen:</strong> Füge hinzu, wie du die Zeit
            genutzt hast (Weiterbildung, Projekte, Ehrenamt)
          </li>
        </ul>

        <H3>Qualifikationen erhalten und ausbauen</H3>
        <p style={styles.content.paragraph}>
          Besonders nach längerer Arbeitslosigkeit ist es wichtig zu zeigen,
          dass du fachlich auf dem aktuellen Stand bist:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Weiterbildungen:</strong> Erwähne auch kürzere Online-Kurse,
            Webinare oder Zertifikate
          </li>
          <li style={styles.content.listItem}>
            <strong>Selbststudium:</strong> Nenne Fachliteratur, Blogs oder
            Podcasts, mit denen du dich auf dem Laufenden gehalten hast
          </li>
          <li style={styles.content.listItem}>
            <strong>Digitale Fähigkeiten:</strong> Betone besonders den Umgang
            mit neuen Tools und Technologien, die im Homeoffice relevant sind
          </li>
        </ul>

        <H3>Homeoffice als Einstiegschance nutzen</H3>
        <p style={styles.content.paragraph}>
          Remote-Positionen können nach längerer Arbeitslosigkeit besondere
          Vorteile bieten:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Größerer Stellenmarkt:</strong> Du kannst dich auch auf
            entfernte Standorte bewerben
          </li>
          <li style={styles.content.listItem}>
            <strong>Fokus auf Leistung:</strong> Im Homeoffice zählen oft mehr
            die Ergebnisse als der Weg dorthin
          </li>
          <li style={styles.content.listItem}>
            <strong>Selbstorganisation beweisen:</strong> Die Zeit der
            Arbeitslosigkeit kannst du nutzen, um Homeoffice-Routinen zu
            entwickeln
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Tipp für Vorstellungsgespräche: Bereite dich besonders gut auf die
            Frage vor, warum deine Arbeitssuche länger gedauert hat. Betone
            deine selektive Herangehensweise bei der Jobsuche und dein Interesse
            an einer langfristigen Position, statt den erstbesten Job
            anzunehmen. Dies zeigt Qualitätsbewusstsein und strategisches
            Denken.
          </p>
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Fazit: Lücken im Lebenslauf souverän meistern</H2>
        <p style={styles.content.paragraph}>
          Eine Berufspause ist in der heutigen Arbeitswelt kein
          Karrierehindernis mehr – wenn du sie richtig darstellst. Die
          zunehmende Akzeptanz flexibler Arbeitsmodelle und besonders die
          Verbreitung von Homeoffice bieten Wiedereinsteigern neue Chancen und
          Möglichkeiten.
        </p>

        <p style={styles.content.paragraph}>
          Die wichtigsten Punkte zusammengefasst:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Ehrlich, aber positiv:</strong> Stehe zu deiner Berufspause
            und zeige, wie du diese Zeit aktiv und sinnvoll genutzt hast
          </li>
          <li style={styles.content.listItem}>
            <strong>Gewonnene Kompetenzen:</strong> Mache deutlich, welche
            Fähigkeiten du während der Auszeit entwickelt oder vertieft hast
          </li>
          <li style={styles.content.listItem}>
            <strong>Homeoffice als Chance:</strong> Nutze die wachsenden
            Remote-Arbeitsmöglichkeiten als sanfte Brücke zurück ins Berufsleben
          </li>
          <li style={styles.content.listItem}>
            <strong>Gut vorbereitet:</strong> Sei auf Nachfragen vorbereitet und
            nutze sie als Gelegenheit, deine Motivation zu zeigen
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Denke daran: Viele der während einer Berufspause entwickelten
          Fähigkeiten – von Selbstorganisation bis Resilienz – sind im modernen
          Arbeitsalltag und besonders im Homeoffice hoch geschätzt. Mit der
          richtigen Darstellung kannst du diese Erfahrungen von einer
          vermeintlichen Schwäche in eine echte Stärke verwandeln.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Der{" "}
            <a style={linkStyles} href="https://bewerbungshelfer.net">
              Bewerbungshelfer
            </a>{" "}
            unterstützt dich dabei, deine Berufspause optimal in deinen
            Bewerbungsunterlagen darzustellen. Mit KI-gestützter Analyse deiner
            individuellen Situation und personalisierter Formulierungshilfe
            maximierst du deine Chancen auf einen erfolgreichen Wiedereinstieg –
            ob im Büro oder im Homeoffice.
          </p>
        </div>
      </section>
    </>
  );
}
