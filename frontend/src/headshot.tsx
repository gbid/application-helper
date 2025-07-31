import React, { useState, useRef } from "react";
import { Spinner } from "./spinner";
import placeholderImage from "./media/businessman-icon.svg";
import { NO_PRINT } from "./styles";
import { FaEdit, FaUpload } from "react-icons/fa";
import { postHeadshot } from "./api/headshot";
import { headshotUrl } from "./api/headshot";
import { ApplicationParameters } from "../../backend/cover-letter/bindings/ApplicationParameters";

const full = {
  width: "100%",
  height: "100%",
};

const overlayStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  opacity: 0,
  transition: "opacity 0.2s",
  cursor: "pointer",
  color: "white",
};

const iconStyle: React.CSSProperties = {
  fontSize: "2em",
};

export function Headshot({
  revisionId,
  style,
  onLoad,
  pushApplicationParameters,
}: {
  revisionId: string;
  style: React.CSSProperties;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  pushApplicationParameters:
    | null
    | ((update: (old: ApplicationParameters) => ApplicationParameters) => void);
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!pushApplicationParameters) {
      throw new Error("pushApplicationParameters must not be null");
    }
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      let headshotId = await postHeadshot(file);
      pushApplicationParameters((old) => ({
        ...old,
        headshotId,
      }));
      // Force reload of headshot
      setHasError(false);
    } catch (error) {
      console.error("Failed to upload headshot:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const containerStyle: React.CSSProperties = {
    ...style,
    position: "relative",
    cursor: "pointer",
  };

  const activeOverlayStyle: React.CSSProperties = {
    ...overlayStyle,
    opacity: isHovered ? 1 : 0,
  };

  const placeholderImageElement = (
    <img src={placeholderImage} alt="Headshot placeholder" style={style} />
  );

  let placeholder = null;
  if (isLoading) {
    placeholder = (
      <div className={NO_PRINT} style={full}>
        <Spinner />
        {placeholderImageElement}
      </div>
    );
  } else if (hasError) {
    placeholder = (
      <div className={NO_PRINT} style={full}>
        {placeholderImageElement}
      </div>
    );
  }

  return (
    <div
      style={containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleImageUpload}
      />

      {(isLoading || hasError) && placeholder}

      <img
        src={headshotUrl(revisionId)}
        // landscape
        // src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmo5cxe_E60DZhZrSFSbHVIq7goY8P1fRL7g&s"}
        // square
        // src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8aoXHy-QszyMu9jhKuaj4kg99flkdhERyw&s"}
        // portrait
        // src={
        //   "https://assets.pixolum.com/blog/wp-content/uploads/2019/09/Bewerbungsfoto-Bildausschnitt-w%C3%A4hlen-800x1067.jpg"
        // }
        alt=""
        style={{
          ...style,
          display: isLoading ? "none" : "block",
        }}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        onLoad={(e) => {
          setIsLoading(false);
          if (onLoad) {
            onLoad(e);
          }
        }}
      />

      <div className={NO_PRINT} style={activeOverlayStyle}>
        {hasError ? (
          <FaUpload style={iconStyle} />
        ) : (
          <FaEdit style={iconStyle} />
        )}
      </div>
    </div>
  );
}
