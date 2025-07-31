import React from "react";
import { Plans } from "./plans";

export type PlansPopupProps = {
  onHide: () => void;
  title: string;
};

const modalBackdropStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1050,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  borderRadius: "0.3rem",
  maxWidth: "800px",
  width: "100%",
  padding: "1rem",
  position: "relative",
};

const modalHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #dee2e6",
  paddingBottom: "0.5rem",
  marginBottom: "1rem",
};

const modalTitleStyle: React.CSSProperties = {
  margin: 0,
  textAlign: "center",
  width: "100%",
};

const closeButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  fontSize: "1.5rem",
  cursor: "pointer",
};

export const PlansPopup: React.FC<PlansPopupProps> = ({ onHide, title }) => {
  return (
    <div style={modalBackdropStyle} onClick={onHide}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={modalHeaderStyle}>
          <h3 style={modalTitleStyle}>{title}</h3>
          <button style={closeButtonStyle} onClick={onHide} aria-label="Close">
            &times;
          </button>
        </div>
        <div>
          <Plans displayMode="hover" />
        </div>
      </div>
    </div>
  );
};
