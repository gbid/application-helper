import "bootstrap/dist/css/bootstrap.css";

export function AboutUs() {
  return (
    <main className="row justify-content-center">
      <div className="container position-relative">
        <div className="row justify-content-center">
          <div className="col-xl-7">
            <h1 className="mb-5 text-center">Bewerbungshelfer</h1>
            <section className="mb-4">
              <h2 className="h4">Unsere Mission</h2>
              <p>
                Bei Bewerbungshelfer ist es unsere Mission, den
                Bewerbungsprozess so einfach und effizient wie möglich zu
                gestalten. Wir verstehen, dass die Jobsuche stressig und
                zeitaufwendig sein kann. Deshalb haben wir eine innovative
                Lösung entwickelt, die Dir hilft, professionelle und
                individuelle Bewerbungen in kürzester Zeit zu erstellen.
              </p>
            </section>

            <section className="mb-4">
              <h2 className="h4">Wer wir sind</h2>
              <p>
                Wir sind ein engagiertes Team von Fachleuten mit umfassender
                Erfahrung in den Bereichen Personalwesen, Softwareentwicklung
                und künstliche Intelligenz. Unsere Expertise ermöglicht es uns,
                modernste Technologien zu nutzen, um Dir einen herausragenden
                Service zu bieten. Mit unserer Unterstützung kannst Du Dich voll
                und ganz auf das Wesentliche konzentrieren: den nächsten Schritt
                in Deiner Karriere.
              </p>
            </section>

            <section className="mb-4">
              <h2 className="h4">Unsere Technologie</h2>
              <p>
                Unsere Anwendung basiert auf leistungsstarken Large Language
                Modellen. Diese fortschrittliche KI ermöglicht es uns, Deine
                Bewerbungen schnell und präzise zu erstellen, genau auf Deine
                Bedürfnisse und die Anforderungen der gewünschten Position
                zugeschnitten. Unsere Technologie ist nicht nur effizient,
                sondern auch sicher. Deine Daten sind bei uns in guten Händen.
              </p>
            </section>

            <section className="mb-4">
              <h2 className="h4">Warum wir?</h2>
              <ul>
                <li>
                  <strong>Erfahrung und Fachwissen:</strong> Unser Team verfügt
                  über tiefgehendes Wissen und langjährige Erfahrung in
                  verschiedenen Branchen.
                </li>
                <li>
                  <strong>Innovative Technologie:</strong> Wir setzen auf die
                  neuesten Entwicklungen im Bereich der künstlichen Intelligenz,
                  um Dir den besten Service zu bieten.
                </li>
                <li>
                  <strong>Kundenzufriedenheit:</strong> Die Zufriedenheit
                  unserer Nutzer steht bei uns an erster Stelle. Wir arbeiten
                  kontinuierlich daran, unsere Dienstleistungen zu verbessern
                  und auf Deine Bedürfnisse abzustimmen.
                </li>
              </ul>
            </section>

            <section className="mb-4">
              <h2 className="h4">Unsere Vision</h2>
              <p>
                Wir glauben an eine Zukunft, in der der Bewerbungsprozess nicht
                länger eine Hürde, sondern eine Chance ist. Eine Chance, sich
                selbst bestmöglich zu präsentieren und die eigene Karriere
                voranzutreiben. Mit unserer Hilfe wird diese Vision zur
                Realität.
              </p>
            </section>

            <section>
              <h2 className="h4">Kontakt</h2>
              <p>
                Bei Fragen oder Anregungen kannst Du uns jederzeit kontaktieren.
                Wir freuen uns darauf, von Dir zu hören!
              </p>
              <p>
                Email:{" "}
                <a href="mailto:kontakt@bewerbungshelfer.net">
                  kontakt@bewerbungshelfer.net
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AboutUs;
