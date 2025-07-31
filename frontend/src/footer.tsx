import { Link } from "wouter";
import { serializeRoute, RouteKind } from "./route";
import { useDeviceType } from "./use-device-type";

function Footer() {
  const isMobile = useDeviceType();

  return isMobile ? <MobileFooter /> : <DesktopFooter />;
}

function MobileFooter() {
  return (
    <footer
      style={{
        padding: "12px 16px",
        borderTop: "1px solid #E0E0E0",
        background: "white",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "8px",
          textAlign: "center",
          fontSize: "0.9em",
        }}
      >
        <Link href={serializeRoute({ kind: RouteKind.Impressum })}>
          Impressum
        </Link>
        <Link href={serializeRoute({ kind: RouteKind.Datenschutz })}>
          Datenschutz
        </Link>
        <Link href={"mailto:kontakt@bewerbungshelfer.net"}>Kontakt</Link>
      </div>
    </footer>
  );
}

function DesktopFooter() {
  return (
    <footer
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderTop: "1px solid #E0E0E0",
        paddingTop: 24,
        paddingBottom: 24,
        paddingLeft: 8,
        paddingRight: 8,
        minHeight: 250,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          height: "100%",
          width: "min(1280px, 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <h4 style={{ fontWeight: 700, margin: 0 }}>Bewerbungshelfer</h4>
          {/* TODO: Come up  with a good subtitle
          <p className="text-muted" style={{ margin: 0 }}>
          </p>
          */}
        </div>
        <div
          className="text-muted"
          style={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: 24,
            gap: 8,
          }}
        >
          <div>
            <Link
              className="text-muted"
              href={serializeRoute({ kind: RouteKind.AboutUs })}
              style={{ textDecoration: "none" }}
            >
              Über uns
            </Link>
          </div>
          <div>
            <Link
              className="text-muted"
              style={{ textDecoration: "none" }}
              href={serializeRoute({ kind: RouteKind.Impressum })}
            >
              Impressum
            </Link>
          </div>
          <div>
            <Link
              className="text-muted"
              style={{ textDecoration: "none" }}
              href={serializeRoute({ kind: RouteKind.Datenschutz })}
            >
              Datenschutz
            </Link>
          </div>
          <div>
            <Link
              className="text-muted"
              style={{ textDecoration: "none" }}
              href={serializeRoute({ kind: RouteKind.Agb })}
            >
              Geschäftsbedingungen
            </Link>
          </div>
          <a
            href={"mailto:kontakt@bewerbungshelfer.net"}
            className="btn rounded-pill"
            style={{
              fontSize: "1rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              borderColor: "#B0B0B0",
            }}
          >
            ✉ Kontakt
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
