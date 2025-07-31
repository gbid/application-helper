import React, { useState } from "react";

type RatingPopupProps = {
  show: boolean;
  onClose: () => void;
  onSubmit: (rating: number, feedback: string) => void;
  heading: string;
};

const RatingPopup: React.FC<RatingPopupProps> = ({
  show,
  onClose,
  onSubmit,
  heading,
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setFeedback("");
  };

  const handleSubmit = () => {
    if (rating !== null) {
      onSubmit(rating, feedback);
      onClose();
      // reset state:
      setRating(null);
      setFeedback("");
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "5px",
          width: "80%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h5>{heading}</h5>
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                cursor: "pointer",
                fontSize: "3em",
                color: rating !== null && rating >= star ? "gold" : "gray",
              }}
              onClick={() => handleRatingChange(star)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          className="form-control mt-3"
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Was hat Ihnen nicht gefallen, was können wir besser machen?"
        />
        <div className="mt-3 d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Abbrechen
          </button>
          <button type="button" className="btn btn-dark" onClick={handleSubmit}>
            Senden
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingPopup;
