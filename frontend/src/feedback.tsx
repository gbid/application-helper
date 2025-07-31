import { useState } from "react";
import { sendFeedback } from "./api/feedback";
import { Overlay } from "./overlay";
import { CSSProperties } from "react";

export function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [isFeedbackMinimized, setIsFeedbackMinimized] = useState(true);

  if (isFeedbackMinimized) {
    return (
      <button
        type="button"
        onClick={() => setIsFeedbackMinimized(false)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1052,
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          backgroundColor: "#007bff", // Bootstrap primary color
          color: "white",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px", // Icon size
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        💬
      </button>
    );
  }

  async function handleFeedbackSubmit() {
    // Send feedback to the server
    try {
      await sendFeedback(feedback);
      setFeedback("");
      setIsFeedbackMinimized(true);
    } catch (error) {
      console.error("Failed to send feedback:", error);
    }
  }

  const style: CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    zIndex: 1051,
    width: "90%",
    maxWidth: "500px",
  };

  return (
    <>
      <Overlay />
      <div style={style}>
        <label
          htmlFor="feedback"
          className="form-label"
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <h5>Was können wir besser machen?</h5>
        </label>
        <textarea
          className="form-control"
          id="feedback"
          name="feedback"
          rows={5}
          placeholder="Alles was Dir aufgefallen ist, hilft uns."
          value={feedback}
          onChange={(event) => setFeedback(event.target.value)}
          style={{ marginBottom: "10px" }}
        ></textarea>
        <div className="text-center">
          <button
            type="button"
            className="btn btn-dark"
            onClick={handleFeedbackSubmit}
          >
            Absenden
          </button>
          <button
            type="button"
            className="btn btn-secondary ml-2"
            onClick={() => setIsFeedbackMinimized(true)}
          >
            Später
          </button>
        </div>
      </div>
    </>
  );
}
