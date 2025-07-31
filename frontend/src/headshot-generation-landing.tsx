import "bootstrap/dist/css/bootstrap.css";
import "./landing.css";
import { Link } from "wouter";
import { RouteKind } from "./route";
import { serializeRoute } from "./route";
import { Route } from "./route";
import { TransformingHeadshots } from "./transforming-headshots";

const newHeadshotRoute: Route = {
  kind: RouteKind.HeadshotGeneration,
  headshotGenerationRoute: { kind: "new" },
};

function Headline(): JSX.Element {
  return (
    <section
      className="masthead"
      style={{ paddingTop: "0", paddingBottom: "4rem" }}
    >
      <div className="container position-relative">
        <div
          className="text-center"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          <h1 className="mb-4">
            Professionelle Bewerbungsfotos mit KI generiert
          </h1>
          <p className="mb-4">
            Verwandeln Sie Ihre Alltagsfotos in professionelle Bewerbungsfotos.
            Sparen Sie Zeit und mehrere hundert Euro im Vergleich zu einem
            herkömmlichen Fotostudio.
          </p>
          <p>
            <Link
              href={serializeRoute(newHeadshotRoute)}
              className="btn btn-dark rounded-pill"
              style={{ fontSize: "2rem" }}
            >
              Zu Ihrem Bewerbungsfoto
            </Link>
          </p>
        </div>
      </div>
    </section>
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
        padding: "32px 8px",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: 1024,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <h2>
          In drei einfachen Schritten zu Ihrem professionellen Bewerbungsfoto
        </h2>

        <div
          className="steps-container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
            width: "100%",
            marginTop: "2rem",
          }}
        >
          {[
            {
              title: "Fotos hochladen",
              description:
                "Laden Sie 6-15 normale Fotos von sich hoch. Selfies sind perfekt geeignet!",
            },
            {
              title: "KI Training",
              description:
                "Wir trainieren eine KI speziell mit Ihren Fotos, um realistische Bewerbungsfotos von Ihnen zu generieren.",
            },
            {
              title: "Auswählen",
              description:
                "Wählen Sie Ihre Favoriten aus bis zu 100 generierten Bewerbungsfotos.",
            },
          ].map((step, index) => (
            <div
              key={index}
              className="step-card"
              style={{
                padding: "1.5rem",
                backgroundColor: "#f8f4ee",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <div
                className="step-number"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#000",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                }}
              >
                {index + 1}
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
                {step.title}
              </h3>
              <p style={{ fontSize: "1rem", margin: 0 }}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Pricing(): JSX.Element {
  const plans = [
    {
      name: "Basis",
      price: "15",
      features: ["20 Bewerbungsfotos", "60 Minuten Generierungszeit"],
      popular: false,
    },
    {
      name: "Professional",
      price: "20",
      features: ["80 Bewerbungsfotos", "30 Minuten Generierungszeit"],
      popular: true,
    },
    {
      name: "Premium",
      price: "35",
      features: ["200 Bewerbungsfotos", "30 Minuten Generierungszeit"],
      popular: false,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px 8px",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: 1024,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        <h2>Unsere Preise</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            width: "100%",
          }}
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              style={{
                padding: "2rem",
                backgroundColor: plan.popular ? "#f8f4ee" : "white",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                position: "relative",
              }}
            >
              {plan.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    right: "20px",
                    backgroundColor: "#000",
                    color: "#fff",
                    padding: "4px 12px",
                    borderRadius: "12px",
                    fontSize: "0.875rem",
                  }}
                >
                  Beliebt
                </div>
              )}
              <h3>{plan.name}</h3>
              <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
                {plan.price}€
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  flex: 1,
                }}
              >
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} style={{ marginBottom: "0.5rem" }}>
                    ✓ {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={serializeRoute(newHeadshotRoute)}
                className="btn btn-dark rounded-pill"
                style={{ width: "100%" }}
              >
                Auswählen
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CallToAction(): JSX.Element {
  return (
    <div
      style={{
        fontSize: "1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f8f4ee",
        padding: "32px 8px",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: 1024,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <h2>Erstellen Sie jetzt Ihr professionelles Bewerbungsfoto</h2>
        <p className="lead mb-0">
          Schnell, einfach und kostengünstig zu Ihrem perfekten Bewerbungsfoto.
        </p>
        <Link
          href={serializeRoute(newHeadshotRoute)}
          className="btn btn-dark rounded-pill"
          style={{
            fontSize: "2rem",
            padding: "0.5rem 2rem",
            marginTop: "1rem",
          }}
        >
          Jetzt starten
        </Link>
        <TransformingHeadshots />
      </div>
    </div>
  );
}

export function HeadshotGenerationLanding() {
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
      <TransformingHeadshots />
      <HowItWorks />
      <Pricing />
      <CallToAction />
    </main>
  );
}
