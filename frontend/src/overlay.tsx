import React from "react";

type OverlayProps = {
  onClick?: () => void;
};

export function Overlay({ onClick }: OverlayProps) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1050,
      }}
    />
  );
}
