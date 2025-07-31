import { styles } from "./shared";
import { H2 } from "./shared";
import { H3 } from "./shared";
import { linkStyles } from "./shared";
import { serializeRoute } from "../route";
import { RouteKind } from "../route";

export function LebenslaufGuide() {
  return (
    <>
      <section style={styles.content.section}>
        <p style={styles.content.paragraph}>
          Der Lebenslauf ist das Herzstück jeder Bewerbung. Während das
          Anschreiben deine Motivation vermittelt, ist der Lebenslauf der
          faktenbasierte Beleg deiner Qualifikationen. In den letzten Jahren hat
          sich die Art, wie Lebensläufe gelesen und ausgewertet werden,
          grundlegend verändert: Automated Tracking Systems (ATS) scannen
          Bewerbungen nach relevanten Keywords, bevor sie überhaupt auf dem
          Schreibtisch eines Personalers landen. Gleichzeitig werden Lebensläufe
          heute meist am Bildschirm gelesen - oft sogar auf dem Smartphone.
        </p>

        <p style={styles.content.paragraph}>
          Diese digitale Transformation stellt neue Anforderungen an Format und
          Inhalt. Der perfekte Lebenslauf muss heute sowohl für Menschen als
          auch für Algorithmen optimiert sein. Er muss auf den ersten Blick
          überzeugen, die wichtigsten Informationen sofort erkennbar
          präsentieren und gleichzeitig alle relevanten Keywords für ATS-Systeme
          enthalten. Daher reicht heute das oberflächliche Ausfüllen einer{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "lebenslauf-vorlagen" },
            })}
            style={linkStyles}
          >
            Standard-Vorlage nicht mehr aus
          </a>
          .
        </p>

        <div style={styles.content.note}>
          Kurz & Knapp: Ein erfolgreicher Lebenslauf ist übersichtlich
          strukturiert, relevant für die angestrebte Position und sowohl für
          Menschen als auch ATS-Systeme optimiert. Die durchschnittliche
          Lesezeit eines Lebenslaufs beträgt dabei nur 60-90 Sekunden - in
          dieser Zeit musst du überzeugen.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Grundlegende Anforderungen an deinen Lebenslauf</H2>
        <p style={styles.content.paragraph}>
          Bevor wir ins Detail gehen, lass uns die wichtigsten Grundregeln für
          einen erfolgreichen Lebenslauf betrachten. Diese Basis-Anforderungen
          gelten unabhängig von Branche und Position.
        </p>

        <H3>Format und Layout</H3>
        <p style={styles.content.paragraph}>
          In Deutschland ist der tabellarische Lebenslauf Standard. Anders als
          der amerikanische Lebenslauf (Resume) oder der britische CV enthält er
          bestimmte Formalien. Wenn du dich international bewirbst, lies
          unbedingt unseren Artikel zum{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "lebenslauf-englisch" },
            })}
            style={linkStyles}
          >
            englischen Lebenslauf
          </a>
          . Für deutsche Bewerbungen solltest du folgende Punkte beachten:
        </p>

        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Umfang:</strong> Maximal zwei Seiten, bei Berufseinsteigern
            oft auch eine Seite. Lieber relevante Informationen prägnant
            darstellen als mit unwichtigen Details auffüllen.
          </li>
          <li style={styles.content.listItem}>
            <strong>Chronologie:</strong> In Deutschland ist die
            antichronologische Reihenfolge üblich - die aktuellste Station kommt
            zuerst. Das entspricht auch der Lesegewohnheit der Personaler, die
            sich besonders für deine jüngste Entwicklung interessieren.
          </li>
          <li style={styles.content.listItem}>
            <strong>Bewerbungsfoto:</strong> In Deutschland ist ein
            professionelles Bewerbungsfoto noch immer üblich, auch wenn es
            rechtlich nicht gefordert werden darf. Das Foto sollte aktuell
            (nicht älter als ein Jahr) und von einem professionellen Fotografen
            aufgenommen sein.
          </li>
          <li style={styles.content.listItem}>
            <strong>Digitale Lesbarkeit:</strong> Klare Schriftarten wie Arial,
            Helvetica oder Calibri in Größe 11-12pt. Überschriften können etwas
            größer sein. Wichtig: Der Lebenslauf muss auch auf mobilen Geräten
            gut lesbar sein.
          </li>
        </ul>

        <div style={styles.content.note}>
          Ein moderner Trend sind zweispaltige Layouts, bei denen die linke,
          schmalere Spalte Kontaktdaten, Skills und weitere Kurzinfos enthält,
          während die breite rechte Spalte für den Hauptinhalt genutzt wird.
          Diese Layouts sind besonders übersichtlich und ermöglichen eine
          effiziente Nutzung des verfügbaren Platzes.
        </div>

        <H3>Die richtige Struktur</H3>
        <p style={styles.content.paragraph}>
          Ein überzeugender Lebenslauf folgt einer klaren, logischen Struktur.
          Die wichtigsten Abschnitte sind:
        </p>

        <ol style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Kopfzeile:</strong> Enthält deinen Namen, Kontaktdaten und
            optional das Bewerbungsfoto. Der Name sollte dabei als größtes
            Element hervorstechen - er ist deine persönliche Marke.
          </li>
          <li style={styles.content.listItem}>
            <strong>Beruflicher Werdegang:</strong> Deine Arbeitserfahrung mit
            Zeiträumen (Monat/Jahr), Unternehmen, Position und den wichtigsten
            Erfolgen und Verantwortlichkeiten.
          </li>
          <li style={styles.content.listItem}>
            <strong>Ausbildung:</strong> Akademische und berufliche
            Qualifikationen, ebenfalls mit Zeiträumen. Bei Berufseinsteigern
            steht dieser Abschnitt oft vor der Berufserfahrung.
          </li>
          <li style={styles.content.listItem}>
            <strong>Zusatzqualifikationen:</strong> Relevante Weiterbildungen,
            Zertifikate und besondere Kenntnisse.
          </li>
          <li style={styles.content.listItem}>
            <strong>Skills:</strong> Sprachkenntnisse, IT-Kenntnisse und andere
            relevante Fähigkeiten - idealerweise mit Niveauangaben.
          </li>
        </ol>

        <p style={styles.content.paragraph}>
          Optional, aber oft sinnvoll sind weitere Abschnitte wie
          "Ehrenamtliches Engagement" oder "Interessen & Hobbys". Wie du{" "}
          <a
            href={serializeRoute({
              kind: RouteKind.Blog,
              blogRoute: { kind: "hobbys-lebenslauf" },
            })}
            style={linkStyles}
          >
            Hobbys clever im Lebenslauf einsetzt
          </a>
          , kann besonders bei Berufseinsteigern wichtige Soft Skills belegen.
        </p>
      </section>
      <section style={styles.content.section}>
        <H2>Die wichtigsten Bestandteile im Detail</H2>
        <p style={styles.content.paragraph}>
          Jeder Abschnitt deines Lebenslaufs erfüllt eine spezifische Funktion
          und sollte entsprechend sorgfältig gestaltet werden. Dabei gilt: Je
          näher eine Information an der angestrebten Position ist, desto
          ausführlicher sollte sie behandelt werden.
        </p>

        <H3>Persönliche Daten</H3>
        <p style={styles.content.paragraph}>
          Dieser Abschnitt enthält die grundlegenden Kontaktinformationen.
          Pflichtangaben sind:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>Vor- und Nachname</li>
          <li style={styles.content.listItem}>
            Professionelle E-Mail-Adresse (keine Spaß-Adressen!)
          </li>
          <li style={styles.content.listItem}>Telefonnummer für Rückfragen</li>
          <li style={styles.content.listItem}>Vollständige Postanschrift</li>
        </ul>
        <p style={styles.content.paragraph}>
          Optional, aber oft sinnvoll sind Links zu professionellen
          Online-Profilen (LinkedIn, XING) oder einem Portfolio. Nicht mehr
          üblich sind dagegen Angaben zu Familienstand, Religion oder
          Staatsangehörigkeit.
        </p>

        <H3>Berufserfahrung</H3>
        <p style={styles.content.paragraph}>
          Dies ist meist der wichtigste Teil deines Lebenslaufs. Für jede
          Position solltest du folgende Informationen angeben:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Zeitraum:</strong> Monat und Jahr von Start und Ende
          </li>
          <li style={styles.content.listItem}>
            <strong>Unternehmen:</strong> Name und optional Branche/Größe
          </li>
          <li style={styles.content.listItem}>
            <strong>Position:</strong> Deine offizielle Stellenbezeichnung
          </li>
          <li style={styles.content.listItem}>
            <strong>Hauptverantwortlichkeiten und Erfolge:</strong> 3-5
            Bullet-Points mit konkreten Leistungen
          </li>
        </ul>

        <div style={styles.content.note}>
          Besonders wichtig: Verwende aktive Verben und quantifiziere deine
          Erfolge wo möglich. Statt "War zuständig für Kundenbetreuung" besser:
          "Betreute eigenverantwortlich 10 Schlüsselkunden mit einem jährlichen
          Umsatzvolumen von 500.000€". Statt "Organisierte Events" besser:
          "Konzipierte und organisierte 5 Firmenevents mit insgesamt 500
          Teilnehmern".
        </div>

        <H3>Ausbildung und Qualifikationen</H3>
        <p style={styles.content.paragraph}>
          Auch hier gilt das antichronologische Prinzip. Nenne bei allen
          Abschlüssen:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Art des Abschlusses (B.Sc., M.A., Ausbildung, Meister etc.)
          </li>
          <li style={styles.content.listItem}>
            Studienfach und Spezialisierung
          </li>
          <li style={styles.content.listItem}>
            Name der Hochschule oder des Ausbildungsbetriebs
          </li>
          <li style={styles.content.listItem}>
            Abschlussnote (wenn 2,5 oder besser)
          </li>
          <li style={styles.content.listItem}>
            Relevante Inhalte, Schwerpunkte oder Thesis-Thema
          </li>
        </ul>
        <H3>Skills und Kompetenzen</H3>
        <p style={styles.content.paragraph}>
          Fachliche Kompetenzen sollten primär im Kontext deiner beruflichen
          Stationen erwähnt werden, da dies ihre praktische Anwendung belegt.
          Zum Beispiel: "Tägliche Kundenbetreuung und Terminkoordination mit MS
          Office" oder "Wartung und Reparatur von Klimaanlagen verschiedener
          Hersteller". Zusätzlich kannst du wichtige Kernkompetenzen in einem
          separaten Abschnitt zusammenfassen:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Sprachkenntnisse:</strong> Mit ehrlichen Niveauangaben (B2,
            C1, verhandlungssicher etc.)
          </li>
          <li style={styles.content.listItem}>
            <strong>Fachspezifische Software:</strong> z.B. SAP für Buchhalter,
            CAD-Programme für Techniker
          </li>
          <li style={styles.content.listItem}>
            <strong>Zusatzqualifikationen:</strong> Relevant für die Position,
            z.B. Gabelstaplerschein oder Erste-Hilfe-Ausbilder
          </li>
        </ul>
      </section>

      <section style={styles.content.section}>
        <H2>Häufige Fehler vermeiden</H2>
        <p style={styles.content.paragraph}>
          Selbst erfahrene Bewerber machen immer wieder bestimmte Fehler, die
          ihre Chancen unnötig schmälern. Hier sind die häufigsten Stolperfallen
          und wie du sie vermeidest:
        </p>

        <H3>Lücken im Lebenslauf</H3>
        <p style={styles.content.paragraph}>
          Unerklärte Lücken sind eine der größten Red Flags für Personaler.
          Dabei lassen sich die meisten Lücken positiv darstellen:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Arbeitssuche:</strong> Zeige Aktivität durch Weiterbildungen
            oder Freelance-Projekte
          </li>
          <li style={styles.content.listItem}>
            <strong>Auslandsaufenthalte:</strong> Als interkulturelle Erfahrung
            und Sprachentwicklung präsentieren
          </li>
          <li style={styles.content.listItem}>
            <strong>Familienzeit:</strong> Betone entwickelte Kompetenzen wie
            Organisationsfähigkeit und Multitasking
          </li>
        </ul>

        <H3>Unspezifische Tätigkeitsbeschreibungen</H3>
        <p style={styles.content.paragraph}>
          Vage Formulierungen wie "War zuständig für diverse Projekte" oder
          "Verschiedene Aufgaben im Marketing" sind wertlos. Stattdessen:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Konkrete Projektnamen und -größen nennen
          </li>
          <li style={styles.content.listItem}>
            Messbare Erfolge und Ergebnisse aufführen
          </li>
          <li style={styles.content.listItem}>
            Spezifische Tools und Methoden erwähnen
          </li>
          <li style={styles.content.listItem}>
            Größe der betreuten Teams/Budgets angeben
          </li>
        </ul>

        <div style={styles.content.note}>
          Ein guter Test: Könnte die Beschreibung auch auf viele andere
          Positionen zutreffen? Dann ist sie zu unspezifisch. Jeder Bullet Point
          sollte einen konkreten, für die angestrebte Position relevanten Erfolg
          oder eine spezifische Verantwortlichkeit beschreiben.
        </div>

        <H3>Formatierungsfehler und Inkonsistenzen</H3>
        <p style={styles.content.paragraph}>
          Nichts wirkt unprofessioneller als ein uneinheitlich formatierter
          Lebenslauf. Achte besonders auf:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Einheitliche Datumsformate:</strong> Entweder durchgehend
            "03/2024" oder "März 2024"
          </li>
          <li style={styles.content.listItem}>
            <strong>Konsistente Aufzählungszeichen:</strong> Gleiche Symbole und
            Einrückungen verwenden
          </li>
          <li style={styles.content.listItem}>
            <strong>Gleichmäßige Abstände:</strong> Zwischen Abschnitten und
            Einträgen
          </li>
          <li style={styles.content.listItem}>
            <strong>Einheitliche Schriftarten und -größen:</strong> Maximal zwei
            verschiedene Schriftarten verwenden
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Ein häufiges Problem ist auch die Überfrachtung mit Design-Elementen.
          Grafiken, Diagramme und Symbole können deinen Lebenslauf optisch
          aufwerten, sollten aber sparsam und gezielt eingesetzt werden. Die
          Lesbarkeit - sowohl für Menschen als auch für ATS-Systeme - hat immer
          Vorrang vor dem Design.
        </p>
      </section>
      <section style={styles.content.section}>
        <H2>Branchenspezifische Besonderheiten</H2>
        <p style={styles.content.paragraph}>
          Während die grundlegende Struktur des Lebenslaufs branchenübergreifend
          ähnlich ist, gibt es wichtige Unterschiede in der Gewichtung und
          Präsentation der Informationen. Ein Lebenslauf, der in der IT-Branche
          überzeugt, könnte im Bankwesen deplatziert wirken - und umgekehrt.
        </p>

        <H3>IT & Tech</H3>
        <p style={styles.content.paragraph}>
          In der Tech-Branche steht deine technische Expertise im Vordergrund:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Skills-Sektion prominent platzieren:</strong> Technische
            Fähigkeiten sollten sofort ins Auge fallen, idealerweise im oberen
            Drittel der ersten Seite
          </li>
          <li style={styles.content.listItem}>
            <strong>Detaillierte Tech-Stack-Auflistung:</strong>{" "}
            Programmiersprachen, Frameworks, Tools mit Erfahrungsgrad
          </li>
          <li style={styles.content.listItem}>
            <strong>GitHub/Portfolio-Links:</strong> Verweise auf eigene
            Projekte und Code-Beispiele
          </li>
          <li style={styles.content.listItem}>
            <strong>Zertifizierungen hervorheben:</strong> aktuelle
            Technologie-Zertifikate von Plattformen wie{" "}
            <a style={linkStyles} href="https://www.udemy.com">
              Udemy
            </a>
            ,{" "}
            <a style={linkStyles} href="https://www.edx.org">
              edX
            </a>{" "}
            oder{" "}
            <a style={linkStyles} href="https://www.coursera.org">
              Coursera
            </a>{" "}
            helfen nicht nur, deine Skills zu belegen, sondern zeigen auch
            Eigeninitiative und Lernbereitschaft.
          </li>
        </ul>

        <H3>Kreativbranche</H3>
        <p style={styles.content.paragraph}>
          Für Designer, Marketing-Experten und andere Kreative gilt:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Innovatives Layout:</strong> Zeige deine Design-Fähigkeiten
            durch ein kreatives, aber professionelles Layout
          </li>
          <li style={styles.content.listItem}>
            <strong>Portfolio-Integration:</strong> QR-Code oder Link zu deinen
            Arbeitsproben
          </li>
          <li style={styles.content.listItem}>
            <strong>Erfolge visualisieren:</strong> Infografiken für
            Kampagnenergebnisse oder Reichweiten
          </li>
          <li style={styles.content.listItem}>
            <strong>Software-Kenntnisse:</strong> Adobe Creative Suite,
            Prototyping-Tools etc. mit Erfahrungslevel
          </li>
        </ul>

        <H3>Traditionelle Branchen</H3>
        <p style={styles.content.paragraph}>
          Für Banken, Versicherungen und große Konzerne empfiehlt sich:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Konservatives Layout:</strong> Klare Struktur, dezente
            Farben, klassische Schriftarten
          </li>
          <li style={styles.content.listItem}>
            <strong>Lückenlose Chronologie:</strong> Besonders wichtig ist die
            präzise Dokumentation aller Stationen
          </li>
          <li style={styles.content.listItem}>
            <strong>Formale Qualifikationen:</strong> Akademische Abschlüsse und
            relevante Zertifizierungen hervorheben
          </li>
          <li style={styles.content.listItem}>
            <strong>Verantwortungsbereiche:</strong> Führungserfahrung,
            Budgetverantwortung und Teamgrößen betonen
          </li>
        </ul>

        <div style={styles.content.note}>
          Unabhängig von der Branche gilt: Der Lebenslauf muss immer
          professionell wirken. Auch in kreativen Branchen darf das Design nie
          auf Kosten der Lesbarkeit und Übersichtlichkeit gehen.
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Digitale Tools und moderne Unterstützung</H2>
        <p style={styles.content.paragraph}>
          Die Digitalisierung hat auch die Art, wie wir Lebensläufe erstellen,
          grundlegend verändert. Moderne Tools können dir dabei helfen, einen
          professionellen und ATS-optimierten Lebenslauf zu erstellen.
        </p>

        <H3>Online Lebenslauf Vorlagen</H3>
        <p style={styles.content.paragraph}>
          Plattformen wie Canva oder Novoresume bieten vorgefertigte Templates
          und intuitive Editoren. Die Vor- und Nachteile:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Vorteile:</strong>
            <ul>
              <li>Professionelles Design ohne Designkenntnisse</li>
              <li>Konsistente Formatierung</li>
              <li>Viele Vorlagen zur Auswahl</li>
            </ul>
          </li>
          <li style={styles.content.listItem}>
            <strong>Nachteile:</strong>
            <ul>
              <li>Oft kostenpflichtig für alle Funktionen</li>
              <li>Eingeschränkte Anpassungsmöglichkeiten</li>
              <li>Häufig nicht ATS-optimiert</li>
            </ul>
          </li>
        </ul>

        <H3>KI-gestützte Lebenslaufoptimierung</H3>
        <p style={styles.content.paragraph}>
          Der{" "}
          <a style={linkStyles} href="https://bewerbungshelfer.net">
            Bewerbungshelfer
          </a>{" "}
          wurde speziell entwickelt, um dich durch den gesamten Prozess der
          Lebenslauferstellung zu begleiten:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Interaktive Unterstützung:</strong> Die KI fungiert als
            erfahrener Bewerbungsprofi, der alle Stolperfallen kennt und dir
            konkrete Verbesserungsvorschläge macht
          </li>
          <li style={styles.content.listItem}>
            <strong>Ganzheitlicher Ansatz:</strong> Von der Strukturierung bis
            zum professionellen Design - die KI hilft bei der kompletten
            Erstellung oder Optimierung deines Lebenslaufs
          </li>
          <li style={styles.content.listItem}>
            <strong>Intelligente Analyse:</strong> Automatische Prüfung auf
            Relevanz, Vollständigkeit und optimale Formulierungen
          </li>
          <li style={styles.content.listItem}>
            <strong>Professionelles Design:</strong> Moderne, ATS-optimierte
            Vorlagen für verschiedene Branchen
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Für eine noch persönlichere Betreuung bieten Dienstleister wie{" "}
          <a style={linkStyles} href="https://www.die-bewerbungsschreiber.de/">
            Die Bewerbungsschreiber
          </a>{" "}
          individuelle Beratung und Unterstützung an, was besonders bei
          komplexeren Situationen wie Karrierewechseln hilfreich sein kann.
        </p>

        <H3>ATS-Scanning Tools</H3>
        <p style={styles.content.paragraph}>
          Diese Tools simulieren die Analyse durch Bewerbungsmanagementsysteme:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            Prüfung der Lesbarkeit für ATS-Systeme
          </li>
          <li style={styles.content.listItem}>
            Analyse der Keyword-Übereinstimmung mit der Stellenanzeige
          </li>
          <li style={styles.content.listItem}>
            Formatierungscheck für optimale Kompatibilität
          </li>
        </ul>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Wichtig: Tools sind Hilfsmittel, keine Komplettlösung. KI-Tools wie
            der Bewerbungshelfer helfen dir zu entscheiden, welche deiner
            Erfahrungen und Kompetenzen für eine Position besonders relevant
            sind. Dennoch ist dein eigenes kritisches Denken unerlässlich: Die
            finale Entscheidung, wie du dich präsentierst, liegt bei dir. Nutze
            die Technologie als Unterstützung, nicht als Ersatz für deine eigene
            Urteilskraft.
          </p>
        </div>
      </section>
      <section style={styles.content.section}>
        <H2>Checkliste vor dem Absenden</H2>
        <p style={styles.content.paragraph}>
          Bevor du deinen Lebenslauf abschickst, solltest du ihn sorgfältig
          prüfen. Diese umfassende Checkliste hilft dir dabei, nichts Wichtiges
          zu übersehen:
        </p>

        <H3>Inhaltliche Prüfung</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Vollständigkeit:</strong>
            <ul>
              <li>Alle relevanten Stationen aufgeführt?</li>
              <li>Zeiträume lückenlos und korrekt?</li>
              <li>Kontaktdaten aktuell?</li>
              <li>Foto professionell und aktuell?</li>
            </ul>
          </li>
          <li style={styles.content.listItem}>
            <strong>Relevanz:</strong>
            <ul>
              <li>Inhalte auf die Stelle zugeschnitten?</li>
              <li>Wichtige Keywords aus der Stellenanzeige enthalten?</li>
              <li>Erfolge und Verantwortlichkeiten quantifiziert?</li>
              <li>Unnötige Informationen entfernt?</li>
            </ul>
          </li>
        </ul>

        <H3>Formale Prüfung</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Layout & Design:</strong>
            <ul>
              <li>Einheitliche Formatierung?</li>
              <li>Übersichtliche Gliederung?</li>
              <li>Ausreichend Weißraum?</li>
              <li>Maximal zwei Seiten?</li>
            </ul>
          </li>
          <li style={styles.content.listItem}>
            <strong>Technische Aspekte:</strong>
            <ul>
              <li>Als PDF gespeichert?</li>
              <li>Dateigröße optimiert? (max. 2-3 MB)</li>
              <li>Sinnvolle Dateibezeichnung?</li>
              <li>Links funktionieren?</li>
            </ul>
          </li>
        </ul>

        <H3>Qualitätssicherung</H3>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Rechtschreibung & Grammatik:</strong>
            <ul>
              <li>Rechtschreibprüfung durchgeführt?</li>
              <li>Von einer zweiten Person gegengelesen?</li>
              <li>Einheitliche Zeitformen?</li>
              <li>Keine Tippfehler in wichtigen Namen?</li>
            </ul>
          </li>
          <li style={styles.content.listItem}>
            <strong>ATS-Optimierung:</strong>
            <ul>
              <li>Standardschriftarten verwendet?</li>
              <li>Keine komplexen Tabellen oder Grafiken?</li>
              <li>Wichtige Keywords eingebaut?</li>
              <li>Einfache Formatierung gewählt?</li>
            </ul>
          </li>
        </ul>

        <div style={styles.content.note}>
          Tipp: Lies deinen Lebenslauf aus der Perspektive eines Personalers,
          der täglich Dutzende Bewerbungen sichtet. Sind die wichtigsten
          Informationen sofort erkennbar? Wird deine Eignung für die Position
          auf den ersten Blick deutlich?
        </div>
      </section>

      <section style={styles.content.section}>
        <H2>Fazit: Der moderne Lebenslauf</H2>
        <p style={styles.content.paragraph}>
          Die Anforderungen an einen erfolgreichen Lebenslauf haben sich in den
          letzten Jahren deutlich gewandelt. Während früher oft ein
          standardisierter Lebenslauf für alle Bewerbungen verwendet wurde, ist
          heute eine individuelle Anpassung auf jede Stelle der Schlüssel zum
          Erfolg. Dabei gilt es, die Balance zwischen menschlicher Lesbarkeit
          und ATS-Optimierung zu finden.
        </p>

        <p style={styles.content.paragraph}>
          Drei zentrale Trends zeichnen sich dabei ab:
        </p>
        <ul style={styles.content.list}>
          <li style={styles.content.listItem}>
            <strong>Digitale Optimierung:</strong> Der Lebenslauf muss sowohl
            für Menschen als auch Algorithmen optimiert sein. Die richtige
            Verwendung von Keywords und eine ATS-freundliche Formatierung sind
            keine Option mehr, sondern Pflicht.
          </li>
          <li style={styles.content.listItem}>
            <strong>Fokus auf Resultate:</strong> Statt reiner
            Tätigkeitsbeschreibungen werden messbare Erfolge und konkrete
            Projektergebnisse immer wichtiger. Personaler wollen sehen, welchen
            Mehrwert du in deinen bisherigen Positionen geschaffen hast.
          </li>
          <li style={styles.content.listItem}>
            <strong>Individualität:</strong> Ein überzeugender Lebenslauf muss
            gezielt auf die angestrebte Position zugeschnitten sein. Das
            bedeutet nicht nur die Anpassung der Inhalte, sondern auch der
            Gewichtung und Präsentation der Informationen.
          </li>
        </ul>

        <p style={styles.content.paragraph}>
          Die gute Nachricht ist: Du musst diesen Prozess nicht alleine
          bewältigen. Moderne Tools wie der{" "}
          <a style={linkStyles} href="https://bewerbungshelfer.net">
            Bewerbungshelfer
          </a>{" "}
          unterstützen dich dabei, deinen Lebenslauf zu optimieren und auf jede
          Stelle perfekt anzupassen. Die KI-gestützte Analyse hilft dir, die
          relevanten Aspekte deines Werdegangs hervorzuheben und optimal zu
          präsentieren.
        </p>

        <div style={styles.content.note}>
          <p style={styles.content.paragraph}>
            Denk daran: Dein Lebenslauf ist oft der erste und wichtigste
            Eindruck, den ein potenzieller Arbeitgeber von dir erhält. Die Zeit
            und Mühe, die du in seine Optimierung investierst, zahlt sich durch
            mehr Einladungen zu Vorstellungsgesprächen direkt aus. Nutze die
            verfügbaren Tools und Ressourcen, aber behalte dabei immer die
            Kontrolle über deine persönliche berufliche Geschichte.
          </p>
        </div>
      </section>
    </>
  );
}
