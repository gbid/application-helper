import React, { useState, CSSProperties } from "react";
import { useUserType } from "./use-user-type";
import { Link, useLocation } from "wouter";
import { serializeRoute, RouteKind, ApplicationRouteKind } from "./route";
import logoPencil from "./media/logo-pencil.svg"; // Adjust the path as necessary
import { Overlay } from "./overlay";
import { UserType } from "../../backend/cover-letter/bindings/UserType";
import { isSignedIn } from "./utils";

// Updated style objects
const containerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginLeft: "20px",
  marginRight: "20px",
};

const burgerButtonStyle: CSSProperties = {
  background: "none",
  // increase this for a thin border around the icon
  border: "0.0px solid #ccc",
  borderRadius: "4px", // Slightly rounded edges for a subtle effect, adjust as desired
  cursor: "pointer",
  fontSize: "24px",
  // padding: '0px', // Minimal padding to keep the icon centered
  width: "25px", // Square dimensions
  height: "25px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // put it on the same height as the brand link:
  marginTop: "12.5px",
  // Adjust as necessary
  // Ensure it's centered vertically with the brand link
  // Adjust as necessary
  // Ensure it's centered horizontally with the brand link
  // Adjust as necessary
};

const sidebarStyle = (isOpen: boolean): CSSProperties => ({
  position: "fixed",
  top: 0,
  left: isOpen ? 0 : "-100%",
  width: "300px",
  height: "100%",
  backgroundColor: "#ffffff",
  overflowX: "hidden",
  transition: "0.3s",
  paddingTop: "60px",
  paddingBottom: "20px",
  boxShadow: isOpen ? "0 0 15px rgba(0,0,0,0.1)" : "none",
  zIndex: 1052,
  display: "flex",
  flexDirection: "column",
});

const sidebarSectionStyle: CSSProperties = {
  borderTop: "1px solid #EDF2F7",
  margin: "12px 0",
  paddingTop: "12px",
};

const closeButtonStyle: CSSProperties = {
  position: "absolute",
  top: "12px",
  right: "20px",
  fontSize: "28px",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#718096",
  padding: "8px",
  borderRadius: "4px",
};

const linkStyle: CSSProperties = {
  textDecoration: "none",
  color: "#000",
  padding: "10px 15px",
  display: "block",
};

const buttonStyle: CSSProperties = {
  padding: "10px",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#000", // Adjust as necessary
  textDecoration: "none",
  display: "block", // Ensure it's block for full-width click area
  width: "100%", // Full width within sidebar
  textAlign: "left", // Align text to the left
};

const logoPencilStyle: CSSProperties = {
  width: "30px",
  height: "30px",
  marginRight: "10px",
};

function Navbar() {
  const userType: UserType | null = useUserType();
  const signedIn = isSignedIn(userType);
  const [, setLocation] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function signout() {
    let response = await fetch("/api/signout", {
      method: "POST",
    });
    if (response.status !== 200) {
      throw new Error(`Signout failed: ${response}`);
    }
    setLocation(serializeRoute({ kind: RouteKind.Home }));
  }

  const sign_in_out = isSignedIn(userType) ? (
    <button onClick={signout} style={{ ...buttonStyle, ...linkStyle }}>
      Abmelden
    </button>
  ) : (
    <Link
      href={serializeRoute({ kind: RouteKind.Signin })}
      style={{ ...buttonStyle, ...linkStyle }}
    >
      Anmelden
    </Link>
  );

  // Toggle function for burger menu and close button
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const burgerButton = (
    <button onClick={toggleMenu} style={burgerButtonStyle}>
      &#9776;
    </button>
  );
  const brandLink = (
    <Link
      href={serializeRoute({ kind: RouteKind.Home })}
      style={{ ...linkStyle, display: "flex", alignItems: "center" }}
    >
      <img src={logoPencil} style={logoPencilStyle} alt={""} />
      Bewerbungshelfer
    </Link>
  );
  const blogHomeLink = (
    <Link
      href={serializeRoute({
        kind: RouteKind.Blog,
        blogRoute: { kind: "home" },
      })}
      style={linkStyle}
      onClick={toggleMenu}
    >
      Bewerbungs-Guide
    </Link>
  );

  const sidebar = (() => {
    const closeButton = (
      <button onClick={toggleMenu} style={closeButtonStyle}>
        &times;
      </button>
    );
    const brandLink = (
      <Link
        href={serializeRoute({ kind: RouteKind.Home })}
        style={{ ...linkStyle, display: "flex", alignItems: "center" }}
        onClick={toggleMenu}
      >
        <img src={logoPencil} style={logoPencilStyle} alt={""} />
        Bewerbungshelfer
      </Link>
    );

    const cancelSubscriptionLink = userType === "subscribed" && (
      <Link
        href={serializeRoute({ kind: RouteKind.CancelSubscription })}
        style={linkStyle}
        onClick={toggleMenu}
      >
        Abo kündigen
      </Link>
    );

    const sign_in_out = signedIn ? (
      <button
        onClick={() => {
          signout();
          toggleMenu();
        }}
        style={{ ...buttonStyle, ...linkStyle }}
      >
        Abmelden
      </button>
    ) : (
      <Link
        href={serializeRoute({ kind: RouteKind.Signin })}
        style={{ ...buttonStyle, ...linkStyle }}
        onClick={toggleMenu}
      >
        Anmelden
      </Link>
    );
    // const coverLetterGenerationsLink = (
    //   <Link
    //     href={serializeRoute({ kind: RouteKind.CoverLetterGenerations })}
    //     style={linkStyle}
    //   >
    //     Generierte Anschreiben
    //   </Link>
    // );
    const newApplicationRoute = serializeRoute({
      kind: RouteKind.Application,
      applicationRoute: {
        kind: ApplicationRouteKind.New,
        tab: "controls",
      },
    });
    const newApplicationLink = (
      <Link href={newApplicationRoute} style={linkStyle} onClick={toggleMenu}>
        Neue Bewerbung
      </Link>
    );

    const applicationsRoute = serializeRoute({
      kind: RouteKind.Applications,
    });
    const applicationsLink = (
      <Link href={applicationsRoute} style={linkStyle} onClick={toggleMenu}>
        Meine Bewerbungen
      </Link>
    );
    const pricingPlansRoute = serializeRoute({
      kind: RouteKind.PricingPlans,
    });
    const pricingPlansLink = (
      <Link href={pricingPlansRoute} style={linkStyle} onClick={toggleMenu}>
        Preise
      </Link>
    );
    // const interviewPreparationLink = (
    // 	<Link href={serializeRoute({ kind: RouteKind.InterviewPreparation })} style={linkStyle}>
    // 		Interviewvorbereitung
    // 	</Link>
    // );
    //
    const registerLink = (
      <Link
        href={serializeRoute({
          kind: RouteKind.Signup,
          query: {},
        })}
        style={linkStyle}
        onClick={toggleMenu}
      >
        Registrieren
      </Link>
    );

    const signedInLinks = <>{cancelSubscriptionLink}</>;

    const signedOutLinks = <>{registerLink}</>;
    return (
      <>
        {isMenuOpen === true ? (
          <Overlay onClick={() => setIsMenuOpen(false)} />
        ) : null}
        <div style={sidebarStyle(isMenuOpen)}>
          {closeButton}

          <div style={{ padding: "0 12px", marginBottom: "24px" }}>
            {brandLink}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: "24px" }}>
              {newApplicationLink}
              {applicationsLink}
            </div>

            <div style={sidebarSectionStyle}>
              {blogHomeLink}
              {pricingPlansLink}
            </div>

            <div style={sidebarSectionStyle}>
              {signedIn ? signedInLinks : signedOutLinks}
              {sign_in_out}
            </div>
          </div>

          <div
            style={{
              padding: "12px 24px",
              fontSize: "0.9rem",
              color: "#718096",
              borderTop: "1px solid #EDF2F7",
            }}
          >
            © 2024 Bewerbungshelfer
          </div>
        </div>
      </>
    );
  })();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid" style={containerStyle}>
        <div style={{ display: "flex", alignItems: "left" }}>
          {burgerButton}
          {brandLink}
        </div>
        <div style={{ display: "flex", alignItems: "right" }}>
          {sign_in_out}
        </div>
        {sidebar}
        {/* </div> */}
      </div>
    </nav>
  );
}

export default Navbar;
