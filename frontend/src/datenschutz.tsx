export function Datenschutz() {
  return (
    <main className="row justify-content-center">
      <div className="col-xl-6">
        <h1>Datenschutzerklärung</h1>

        <h2>Allgemeines</h2>
        <p>
          Diese Datenschutzerklärung gilt für den Service bewerbungshelfer.net,
          der Nutzern die Möglichkeit bietet, persönliche Dokumente zu
          automatischer Rechnungsanalyse hochzuladen.
        </p>

        <h2>Datenerfassung und -verarbeitung</h2>
        <ol>
          <li>
            <b>Erhebung persönlicher Daten:</b> Bei der Nutzung unseres Services
            können persönliche Daten erfasst werden, die in hochgeladenen
            Dokumenten enthalten sind. Diese Daten können persönliche
            Identifikationsmerkmale und andere sensible Informationen enthalten.
          </li>
          <li>
            <b>Zweck der Datenverarbeitung:</b> Die erhobenen Daten werden
            ausschließlich zum Zweck der Analyse und Bereitstellung des Services
            verwendet.
          </li>
        </ol>

        <h2>Datenübertragung</h2>
        <ol>
          <li>
            <b>Speicherung und Verarbeitung:</b> Die Dokumente werden auf
            Servern in Deutschland gespeichert. Für die Analyse werden die Daten
            an die OpenAI-API gesendet, die in den USA betrieben wird.
          </li>
          <li>
            <b>OpenAI-Datenspeicherung:</b> Gemäß den Richtlinien von OpenAI
            werden die Daten von OpenAI für einen Zeitraum von maximal 30 Tagen
            gespeichert.
          </li>
        </ol>

        <h2>Datensicherheit</h2>
        <p>
          Wir verpflichten uns, die Sicherheit Ihrer Daten zu gewährleisten und
          angemessene technische und organisatorische Maßnahmen zu ergreifen, um
          Ihre Daten vor unbefugtem Zugriff oder unrechtmäßiger Verarbeitung zu
          schützen.
        </p>

        <h2>Rechte der Nutzer</h2>
        <p>
          Sie haben das Recht, Auskunft über die von uns gespeicherten
          persönlichen Daten zu verlangen, eine Berichtigung unrichtiger Daten
          zu verlangen, die Löschung Ihrer Daten zu beantragen oder der
          Verarbeitung Ihrer Daten zu widersprechen.
        </p>

        <h2>Änderungen der Datenschutzerklärung</h2>
        <p>
          Diese Datenschutzerklärung kann von Zeit zu Zeit aktualisiert werden,
          um Änderungen in unserer Praxis oder aus rechtlichen Gründen
          widerzuspiegeln.
        </p>

        <h2>Kontakt</h2>
        <p>
          Bei Fragen zur Verarbeitung Ihrer persönlichen Daten können Sie uns
          über{" "}
          <a href="mailto:kontakt@bewerbungshelfer.net">
            kontakt@bewerbungshelfer.net
          </a>{" "}
          kontaktieren.
        </p>
      </div>
    </main>
  );
}
