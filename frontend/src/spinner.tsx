import React, { useState, useEffect } from "react";

export function Spinner({ delay = 200 }) {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setShowSpinner(true), delay);
    return () => clearTimeout(timeoutId);
  }, [delay]);

  if (!showSpinner) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        zIndex: 2000,
      }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
