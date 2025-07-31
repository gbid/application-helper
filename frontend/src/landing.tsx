import "bootstrap/dist/css/bootstrap.css";
import "./landing.css";
import lebenslauf from "./media/wegener-lebenslauf.webp";
import anschreiben from "./media/wegener-anschreiben.webp";
import bewerbungsmappe from "./media/bewerbungsmappe-leder.webp";
import iconThumbsUp from "./media/icon-thumbs-up.svg";
import iconWrite from "./media/icon-write.svg";
import iconIndividual from "./media/icon-individual.svg";
import { Link } from "wouter";
import {
  RouteKind,
  serializeRoute,
  Route,
  ApplicationRouteKind,
} from "./route";
import { useEffect, useState } from "react";

const newApplicationRoute: Route = {
  kind: RouteKind.Application,
  applicationRoute: {
    kind: ApplicationRouteKind.New,
    tab: "controls",
  },
};

function Headline(): JSX.Element {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const singleColumn = width < 1200;
  const rootSize = singleColumn ? 50 : 80;
  const columnHeight = width * (singleColumn ? 0.6 : 0.35);
  const imageWidthScaling = 0.8;
  const lebenslaufWidthPercentage = imageWidthScaling * rootSize;
  const anschreibenWidthPercentage = imageWidthScaling * rootSize;
  const bewerbungsmappeWidthPercentage = 2.25 * imageWidthScaling * rootSize;
  // Shifts the sheets of paper along the slope
  // of the bewerbungsmappe image.
  // TODO: This should be parameterized by the transform
  // angle of the bewerbungsmappe image.
  const leftShiftSingleColumnFactor = 4;
  const leftShift = singleColumn
    ? 0.1 * rootSize * leftShiftSingleColumnFactor
    : 0.1 * rootSize;
  const leftShiftDelta = singleColumn ? 0.2 * rootSize : 0.2 * rootSize;
  const topMargin = 0.15 * rootSize;
  const topMarginDelta = 0.02 * rootSize;
  const topMarginSheets = singleColumn
    ? topMargin * (1 + leftShiftSingleColumnFactor / 12)
    : topMargin;

  return (
    <section
      className="masthead"
      style={{ paddingTop: "0", paddingBottom: "4rem" }}
    >
      <div className="container position-relative">
        <div className="row justify-content-center align-items-center">
          <div className="col-xl-6 col-md-12 d-flex flex-column align-items-center mb-4 mb-xl-0">
            <h1 className="mb-4 text-center">
              In Sekunden zu Ihrem professionellen Bewerbungsschreiben
            </h1>
            <p>
              <Link
                href={serializeRoute(newApplicationRoute)}
                className="btn btn-dark rounded-pill"
                style={{ fontSize: "2rem" }}
              >
                Kostenlos testen
              </Link>
            </p>
            <a
              href="#how-it-works"
              className="btn btn-dark rounded-pill"
              style={{ marginTop: "20px", fontSize: "1rem" }}
            >
              So funktioniert's
            </a>
          </div>
          <div
            // square aspect ratio, i.e. width = height
            className="col-xl-6 col-md-12 d-flex flex-column align-items-center"
            style={{ height: columnHeight }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                justifyContent: singleColumn ? "center" : undefined,
              }}
            >
              <img
                src={lebenslauf}
                alt="Lebenslauf"
                style={{
                  width: `${lebenslaufWidthPercentage}%`,
                  position: "absolute",
                  top: `${topMarginSheets}%`,
                  left: `${leftShift + leftShiftDelta}%`,
                  zIndex: 1,
                  transform: "rotate(13deg)",
                  boxShadow: "0 0 4px 2px rgba(0,0,0,5)",
                }}
              />
              <img
                src={anschreiben}
                alt="Bewerbungsanschreiben"
                style={{
                  width: `${anschreibenWidthPercentage}%`,
                  position: "absolute",
                  top: `${topMarginSheets + topMarginDelta}%`,
                  left: `${leftShift}%`,
                  zIndex: 2,
                  transform: "rotate(10deg)",
                  boxShadow: "0 0 2px 1px rgba(0,0,0,0.5)",
                }}
              />
              <img
                src={bewerbungsmappe}
                alt="Bewerbungsmappe"
                style={{
                  width: `${bewerbungsmappeWidthPercentage}%`,
                  position: "absolute",
                  top: `${topMargin}%`,
                  left: singleColumn ? "4%" : "0",
                  zIndex: 0,
                  transform: "rotate(10deg)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UserStory(): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // backgroundColor: "#f8f4ee",
        paddingTop: 32,
        paddingBottom: 32,
        paddingLeft: 8,
        paddingRight: 8,
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: 1024,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          fontSize: "1.5rem",
          alignItems: "center",
        }}
      >
        <p>
          Ihre Bewerbung entscheidet maßgeblich über Ihren beruflichen Erfolg
          und Ihre Zukunft. Daher sollte Ihr Bewerbungsschreiben individuell und
          auf Ihre Wunschstelle zugeschnitten sein, um Ihre Stärken und
          Motivation optimal hervorzuheben. Kreativität und Geschick sind
          gefragt, um aus der Masse herauszustechen - für den ungeübten Bewerber
          eine echte Herausforderung. Nicht umsonst gibt es zahlreiche Anbieter,
          die kostenpflichtig professionelle Bewerbungsschreiben verfassen. Dank
          moderner künstlicher Intelligenz können wir Ihnen diesen Service
          kostenlos und in Sekunden anbieten.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <div style={{ width: "40%" }}>
            <img
              src={anschreiben}
              width="100%"
              alt="Ein gutes Anschreiben für Ihre Bewerbung zu formulieren ist eine Herausforderung."
            />
          </div>
        </div>

        <p>
          Unser Service hilft Ihnen, professionelle und individuelle
          Bewerbungsschreiben zu verfassen, die perfekt auf die jeweilige
          Stellenanzeige abgestimmt sind und Ihre Stärken und Motivation
          eloquent hervorheben. Unsere künstliche Intelligenz ist speziell
          darauf trainiert, professionelle Anschreiben zu verfassen. So erhalten
          Sie kostenlos und in Sekunden ein individuelles Anschreiben, das Ihre
          Chancen auf die Wunschstelle maßgeblich erhöht.
        </p>
      </div>
    </div>
  );
}

function HowItWorks(): JSX.Element {
  return (
    <div
      id="how-it-works"
      style={{
        fontSize: "1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f8f4ee",
        paddingTop: 32,
        paddingBottom: 32,
        paddingLeft: 8,
        paddingRight: 8,
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: 1024,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          fontSize: "1.5rem",
          alignItems: "center",
        }}
      >
        <h2>So funktioniert unser Bewerbungsservice</h2>

        <ol>
          <li>
            <strong>Stellenausschreibung:</strong> Sie kopieren einfach den Text
            der Stellenausschreibung, auf die Sie sich bewerben möchten, und
            fügen ihn in unser Formular ein.
          </li>
          <li>
            <strong>Lebenslauf:</strong> Laden Sie Ihren Lebenslauf hoch, damit
            wir in Ihrem Anschreiben auf Ihre Stärken und Erfahrungen eingehen
            können. Wir liefern Ihnen Vorschläge, wie Sie Ihren Lebenslauf
            speziell für Ihre Wunschposition zuschneiden können.
          </li>
          <li>
            <strong>Anschreiben:</strong> Unsere künstliche Intelligenz ist
            darauf spezialisiert, professionelle Anschreiben zu verfassen. Daher
            können wir Ihnen in Sekunden ein individuelles Anschreiben
            erstellen, das eloquent Ihre Stärken und Erfahrungen für die Stelle
            hervorhebt.
          </li>
        </ol>
      </div>
    </div>
  );
}

function Conclusion(): JSX.Element {
  return (
    <div
      style={{
        fontSize: "1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // backgroundColor: "#f8f4ee",
        paddingTop: 32,
        paddingBottom: 32,
        paddingLeft: 8,
        paddingRight: 8,
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: 1024,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          fontSize: "1.5rem",
          alignItems: "center",
        }}
      >
        <h2>Professionelle Anschreiben für Ihre Bewerbung</h2>

        <p className="lead mb-0">
          Unkompliziert und schnell zu Ihrem individuellen Anschreiben.
        </p>
        <Link
          href={serializeRoute(newApplicationRoute)}
          className="btn btn-dark rounded-pill"
          style={{
            fontSize: "2rem",
            paddingLeft: "2rem",
            paddingRight: "2rem",
          }}
        >
          Kostenlos testen
        </Link>
      </div>
    </div>
  );
}

function ImageShowcases(): JSX.Element {
  return (
    <div
      id="image-showcases"
      style={{
        fontSize: "1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f8f4ee",
        paddingTop: 32,
        paddingBottom: 32,
        paddingLeft: 8,
        paddingRight: 8,
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: 1024,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          fontSize: "1.5rem",
          alignItems: "center",
        }}
      >
        <div
          className="container-fluid p-0"
          style={{ display: "flex", flexDirection: "column", gap: 32 }}
        >
          <div className="row g-0">
            <div
              className="col-lg-6 order-lg-2"
              style={{
                paddingLeft: 8,
                paddingRight: 8,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 16,
              }}
            >
              <h2>Professionell und schnell</h2>
              <p className="lead mb-0">
                Unsere künstliche Intelligenz hilft Ihnen, in wenigen Sekunden
                ein perfektes Bewerbungsschreiben zu verfassen.
              </p>
            </div>
            <div
              className="col-lg-6 order-lg-1"
              style={{ paddingLeft: 8, paddingRight: 8, textAlign: "center" }}
            >
              <img
                src={iconWrite}
                alt="Einfach zum perfekten Bewerbungsschreiben"
                style={{ width: "40%", height: "auto" }}
              />
            </div>
          </div>
          <div className="row g-0">
            <div
              className="col-lg-6 order-lg-1"
              style={{
                paddingLeft: 8,
                paddingRight: 8,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 16,
              }}
            >
              <h2>Individuell angepasst</h2>
              <p className="lead mb-0">
                Ihre Bewerbung wird passgenau auf Ihre persönlichen Stärken und
                die Stellenausschreibung abgestimmt.
              </p>
            </div>
            <div
              className="col-lg-6 order-lg-2"
              style={{ paddingLeft: 8, paddingRight: 8, textAlign: "center" }}
            >
              <img
                src={iconIndividual}
                alt="Individuell angepasste Anschreiben Bewerbung"
                style={{ width: "40%", height: "auto" }}
              />
            </div>
          </div>
          <div className="row g-0">
            <div
              className="col-lg-6 order-lg-2"
              style={{
                paddingLeft: 8,
                paddingRight: 8,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 16,
              }}
            >
              <h2>Kostenlos testen</h2>
              <p className="lead mb-0">
                Sie können unseren Service kostenlos testen und sich von der
                Qualität überzeugen.
              </p>
            </div>
            <div
              className="col-lg-6 order-lg-1"
              style={{ paddingLeft: 8, paddingRight: 8, textAlign: "center" }}
            >
              <img
                src={iconThumbsUp}
                alt="Einfach zur erfolgreichen Bewerbung"
                style={{ width: "40%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Landing() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "32px",
        paddingTop: "32px",
        paddingBottom: "16px",
        fontFamily: '"Source Serif 4", serif',
      }}
    >
      <Headline />
      <ImageShowcases />
      <UserStory />
      <HowItWorks />
      <Conclusion />
    </main>
  );
}

export default Landing;
