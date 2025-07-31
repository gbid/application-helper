import React from "react";
import { TransformingHeadshots } from "./transforming-headshots";

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "2rem",
    maxWidth: "800px",
    width: "90%",
    maxHeight: "90vh",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    padding: "0.5rem",
  },
  content: {
    textAlign: "center",
    overflowY: "auto",
    paddingBottom: "1rem",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
    color: "#333",
    fontWeight: "500",
  },
  text: {
    marginBottom: "2rem",
    lineHeight: "1.6",
    color: "#666",
    fontSize: "1.1rem",
  },
  headshotsContainer: {
    transform: "scale(0.8)",
    transformOrigin: "center center",
    margin: "-20px 0",
  },
  buttonContainer: {
    marginTop: "auto",
    padding: "1.5rem",
    borderTop: "1px solid #eee",
    backgroundColor: "white",
  },
  button: {
    padding: "16px 32px",
    backgroundColor: "#1a1a1a",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1.2rem",
    fontWeight: "500",
    transition: "background-color 0.2s",
    width: "100%",
    maxWidth: "400px",
  },
};

type HeadshotPopupProps = {
  onClose: () => void;
};

export function HeadshotPopup({ onClose }: HeadshotPopupProps) {
  const handleAragonClick = () => {
    window.open("https://www.aragon.ai/?via=bewerbungshelfer", "_blank");
    onClose();
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div style={styles.content}>
          <h2 style={styles.title}>
            Ihre Bewerbung braucht ein professionelles Foto
          </h2>
          <p style={styles.text}>
            82% der Personaler empfinden eine Bewerbung erst mit Foto als
            vollständig. Gleichzeitig disqualifiziert ein unprofessionelles Foto
            Ihre Bewerbung – das bestätigen 23% der HR-Verantwortlichen laut der
            Kienbaum-Studie <em>Recruiting-Trends 2019</em>.
          </p>
          <div style={styles.headshotsContainer}>
            <TransformingHeadshots />
          </div>
          <p style={styles.text}>
            Mit unserem Partner Aragon.ai erstellen Sie in wenigen Minuten
            professionelle KI-generierte Bewerbungsfotos – ganz ohne teuren
            Fotostudio-Termin.
          </p>
        </div>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={handleAragonClick}>
            Zu Ihrem Bewerbungsfoto
          </button>
        </div>
      </div>
    </div>
  );
}
export const HEADSHOT_POPUP_STORAGE_KEY = "headshot_popup_last_shown";

export function shouldShowHeadshotPopup(): boolean {
  try {
    const lastShown = localStorage.getItem(HEADSHOT_POPUP_STORAGE_KEY);
    if (!lastShown) return true;

    // Show popup again after some time
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
    const lastShownDate = new Date(lastShown).getTime();
    return Date.now() - lastShownDate > SEVEN_DAYS;
  } catch {
    // If localStorage is not available, default to showing the popup
    return true;
  }
}

export function markHeadshotPopupAsShown(): void {
  try {
    localStorage.setItem(HEADSHOT_POPUP_STORAGE_KEY, new Date().toISOString());
  } catch {
    // Ignore localStorage errors
  }
}
