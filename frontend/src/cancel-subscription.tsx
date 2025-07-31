import React from "react";
import { CREATE_CUSTOMER_PORTAL_SESSION_ROUTE } from "./api/stripe";

const containerStyle: React.CSSProperties = {
  maxWidth: "600px",
  margin: "40px auto",
  padding: "20px",
};

const cardStyle: React.CSSProperties = {
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  padding: "20px",
  backgroundColor: "#ffffff",
};

const buttonStyle: React.CSSProperties = {
  marginTop: "20px",
};

export function CancelSubscription() {
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>Bewerbungshelfer Professional kündigen</h2>
        <p>
          Sie können Ihr Abonnement jederzeit kündigen. Nach der Kündigung
          können Sie Bewerbungshelfer Professional noch bis zum Ende des von
          Ihnen bereits bezahlten Zeitraums nutzen.
        </p>
        <p>
          Die Kündigung erfolgt über das Stripe Kundenportal, über das Sie
          bereits den Kauf von Bewerbungshelfer Professional abgeschlossen
          haben. Sie werden mit dem Klick auf den untenstehenden Button zum
          Stripe Kundenportal weitergeleitet und können die Kündigung dort
          durchführen.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <a
            href={CREATE_CUSTOMER_PORTAL_SESSION_ROUTE}
            className="btn btn-dark"
            style={buttonStyle}
          >
            Jetzt kündigen
          </a>
        </div>
      </div>
    </div>
  );
}
