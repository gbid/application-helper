import React from "react";

export function SubscriptionSuccess() {
  return (
    <div className="container py-5">
      <div className="card shadow-lg mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-body text-center p-5">
          <div className="mb-4">
            <div
              className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center"
              style={{ width: "80px", height: "80px" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="white"
                className="bi bi-check2"
                viewBox="0 0 16 16"
              >
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
              </svg>
            </div>
          </div>

          <h1 className="h2 mb-3">Vielen Dank für Ihr Abonnement! 🎉</h1>
          <p className="lead mb-4">
            Ihr Zugang zu Bewerbungshelfer Professional wurde erfolgreich
            aktiviert.
          </p>
          <a className="btn btn-dark btn-lg" href="/applications">
            Zu meinen Bewerbungen
          </a>
        </div>
      </div>
    </div>
  );
}
