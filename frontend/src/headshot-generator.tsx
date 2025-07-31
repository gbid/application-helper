import React, { useState, useCallback, useEffect } from "react";
import { HeadshotGenerationProgress } from "../../backend/cover-letter/bindings/HeadshotGenerationProgress";
import { GeneratedHeadshotId } from "../../backend/cover-letter/bindings/GeneratedHeadshotId";
import { HeadshotGenerationId } from "../../backend/cover-letter/bindings/HeadshotGenerationId";
import { generated_headshot_url } from "./api/headshot-generation";
import { monitorHeadshotGeneration } from "./api/headshot-generation";
import { uploadHeadshotImages } from "./api/headshot-generation";
import { useLocation } from "wouter";
import { RouteKind } from "./route";
import { serializeRoute } from "./route";
import { Route } from "./route";
import { PhotoGuide } from "./photo-guide";
import { ImageUpload } from "./image-upload";
import { colorDisabled } from "./styles";
import { colorPrimary } from "./styles";
import { spacing } from "./styles";
import { FiDownload } from "react-icons/fi";
import { FiMaximize2 } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { getFavouriteHeadshots } from "./api/headshot-generation";
import { setFavourite } from "./api/headshot-generation";
import { MIN_IMAGES } from "./image-upload";

// Types
export type ImageValidationError =
  | "TOO_SMALL"
  | "WRONG_FORMAT"
  | "TOO_MANY_FILES"
  | "TOO_FEW_FILES";

export type HeadshotImage = {
  file: File;
  previewUrl: string;
  validationErrors: ImageValidationError[];
};

// Utility functions
const MIN_IMAGE_SIZE = 512;
export const validateImage = async (
  file: File,
): Promise<ImageValidationError[]> => {
  const errors: ImageValidationError[] = [];

  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    errors.push("WRONG_FORMAT");
  }

  const dimensions = await getImageDimensions(file);
  if (dimensions.width < MIN_IMAGE_SIZE || dimensions.height < MIN_IMAGE_SIZE) {
    errors.push("TOO_SMALL");
  }

  return errors;
};

export function formatValidationError(error: ImageValidationError): string {
  switch (error) {
    case "TOO_SMALL":
      return `Image must be at least ${MIN_IMAGE_SIZE}x${MIN_IMAGE_SIZE} pixels`;
    case "WRONG_FORMAT":
      return "Image must be JPG, PNG, or WebP format";
    case "TOO_MANY_FILES":
      return "Too many files uploaded";
    case "TOO_FEW_FILES":
      return `Please upload at least ${MIN_IMAGES} images`;
    default:
      const _exhaustiveCheck: never = error;
      return `Unknown error: ${_exhaustiveCheck}`;
  }
}

const getImageDimensions = (
  file: File,
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      resolve({ width: img.width, height: img.height });
    };
    img.src = URL.createObjectURL(file);
  });
};

// Styles
type StyleObject = {
  [key: string]: React.CSSProperties;
};

const styles: StyleObject = {
  sectionDivider: {
    margin: "2rem 0",
    borderTop: "1px solid #eee",
  },
  container: spacing.container,
  error: {
    color: "red",
    marginBottom: "1rem",
    padding: "0.5rem",
    backgroundColor: "rgba(255, 0, 0, 0.1)",
    borderRadius: "4px",
  },
  button: {
    padding: "12px 24px",
    backgroundColor: colorPrimary,
    color: "white",
    border: "none",
    borderRadius: spacing.borderRadius.small,
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.2s",
  },
  buttonDisabled: {
    backgroundColor: colorDisabled,
    cursor: "not-allowed",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
  },
  progressContainer: {
    padding: "2rem",
    textAlign: "center",
  },
  progressBar: {
    width: "100%",
    height: "8px",
    backgroundColor: "#eee",
    borderRadius: "4px",
    overflow: "hidden",
    marginBottom: "1rem",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colorPrimary,
    transition: "width 0.3s ease-in-out",
  },
  progressText: {
    fontSize: "1rem",
    color: "#666",
    margin: "0.5rem 0",
  },
  generatedImagesContainer: {
    marginTop: "2rem",
  },
  imageGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    padding: "1rem 0",
    justifyContent: "center",
  },
  generatedImageWrapper: {
    position: "relative",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    width: "250px",
    flex: "0 0 250px",
  },
  sectionHeading: {
    textAlign: "center",
  },
  generatedImageCard: {
    border: "1px solid #eee",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  generatedImage: {
    width: "100%",
    height: "auto",
    display: "block",
  },
  imageActions: {
    padding: "1rem",
  },
  downloadButton: {
    width: "100%",
    padding: "0.5rem",
    backgroundColor: colorPrimary,
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  downloadIcon: {
    position: "absolute",
    top: "12px",
    right: "12px",
    padding: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "50%",
    cursor: "pointer",
    opacity: 0,
    transition: "opacity 0.2s ease-in-out",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  downloadIconHover: {
    opacity: 1,
  },
  iconContainer: {
    position: "absolute",
    top: "12px",
    right: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  icon: {
    padding: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "50%",
    cursor: "pointer",
    opacity: 0,
    transition: "opacity 0.2s ease-in-out",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  iconHover: {
    opacity: 1,
  },
  fullscreenOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  iconButton: {
    padding: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "50%",
    cursor: "pointer",
    opacity: 0,
    transition: "opacity 0.2s ease-in-out",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    border: "none",
    color: "inherit",
  },
  iconButtonHover: {
    opacity: 1,
  },
  fullscreenImage: {
    maxWidth: "90%",
    maxHeight: "90vh",
    objectFit: "contain",
  },
  closeButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    padding: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    border: "none",
    color: "inherit",
  },
};

type ProgressDisplayProps = {
  progress: HeadshotGenerationProgress | null;
};

function ProgressDisplay({ progress }: ProgressDisplayProps) {
  const getProgressPercentage = (): number => {
    if (!progress) return 0;

    switch (progress.kind) {
      case "preparing":
        return 0;
      case "training": {
        return 5 + (progress.progress ?? 0) * 0.85;
      }
      // TODO: get subprogress of prediction phase
      case "predicting":
        return 90;
      case "complete":
        return 100;
      case "error":
        return 0;
      default:
        const _exhaustiveCheck: never = progress;
        throw new Error(`Unhandled progress kind: ${_exhaustiveCheck}`);
    }
  };

  const getRemainingTime = (): string => {
    const progressPercent = getProgressPercentage() / 100;
    const remainingMinutes = Math.round((1 - progressPercent) * 30);

    if (remainingMinutes === 0) return "";
    if (remainingMinutes === 1) return "Noch etwa 1 Minute";
    return `Noch etwa ${remainingMinutes} Minuten`;
  };

  const getProgressMessage = (): string => {
    if (!progress) return "Wird gestartet...";

    switch (progress.kind) {
      case "preparing":
        return "Ihre Fotos werden vorbereitet...";
      case "training":
        return `KI-Modell wird trainiert...`;
      case "predicting":
        return "Ihre Bewerbungsfotos werden generiert...";
      case "complete":
        return "Generierung abgeschlossen!";
      case "error":
        return "Ein Fehler ist aufgetreten, bitte versuchen Sie es erneut";
      default:
        const _exhaustiveCheck: never = progress;
        throw new Error(`Unhandled progress kind: ${_exhaustiveCheck}`);
    }
  };

  const progressBarStyles: StyleObject = {
    progressBarContainer: {
      position: "relative",
      width: "100%",
      height: "32px",
      backgroundColor: colorDisabled,
      borderRadius: "4px",
      overflow: "hidden",
    },
    progressPercentage: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "white",
      fontSize: "1rem",
      fontWeight: 500,
    },
    infoContainer: {
      marginTop: "2rem",
      padding: "1.5rem",
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      borderRadius: "8px",
      textAlign: "center",
    },
    infoText: {
      color: "#666",
      fontSize: "0.9rem",
      marginBottom: "0.5rem",
    },
    timeEstimate: {
      color: "#666",
      fontSize: "0.9rem",
      fontWeight: "500",
    },
  };

  return (
    <div style={styles.progressContainer}>
      <h3>Ihre Bewerbungsfotos werden erstellt</h3>
      {progress?.kind !== "error" && (
        <>
          <div style={progressBarStyles.progressBarContainer}>
            <div style={progressBarStyles.progressPercentage}>
              {Math.round(getProgressPercentage())}%
            </div>
            <div
              style={{
                ...styles.progressFill,
                width: `${getProgressPercentage()}%`,
              }}
            />
          </div>
          <p style={styles.progressText}>{getProgressMessage()}</p>
          <div style={progressBarStyles.infoContainer}>
            <p style={progressBarStyles.timeEstimate}>{getRemainingTime()}</p>
            <p style={progressBarStyles.infoText}>
              Sie können diese Seite verlassen und später zurückkehren. Die
              Generierung läuft im Hintergrund weiter.
            </p>
            <p style={progressBarStyles.infoText}>
              Sie finden Ihre Bewerbungsfotos später in der Übersicht aller
              Ihrer Generierungen.
            </p>
          </div>
        </>
      )}
      {progress?.kind === "error" && (
        <p style={styles.error}>{getProgressMessage()}</p>
      )}
    </div>
  );
}

type GeneratedImagesProps = {
  imageIds: GeneratedHeadshotId[];
};

function GeneratedImages({ imageIds }: GeneratedImagesProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [favouriteIds, setFavouriteIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFavourites() {
      try {
        const { favourite_ids } = await getFavouriteHeadshots();
        setFavouriteIds(
          new Set(favourite_ids.map((id) => id.generatedHeadshotId)),
        );
      } catch (error) {
        console.error("Failed to fetch favourites:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFavourites();
  }, []);

  const handleFavouriteClick = async (
    id: GeneratedHeadshotId,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    const isFavourite = !favouriteIds.has(id.generatedHeadshotId);

    try {
      await setFavourite(id, isFavourite);
      setFavouriteIds((prev) => {
        const next = new Set(prev);
        if (isFavourite) {
          next.add(id.generatedHeadshotId);
        } else {
          next.delete(id.generatedHeadshotId);
        }
        return next;
      });
    } catch (error) {
      console.error("Failed to update favourite:", error);
    }
  };

  const renderImage = (id: GeneratedHeadshotId) => (
    <div
      key={id.generatedHeadshotId}
      style={styles.generatedImageWrapper}
      onMouseEnter={() => setHoveredId(id.generatedHeadshotId)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <img
        src={generated_headshot_url(id)}
        alt="Generated headshot"
        style={styles.generatedImage}
      />
      <div style={styles.iconContainer}>
        <button
          onClick={() => window.open(generated_headshot_url(id), "_blank")}
          style={{
            ...styles.iconButton,
            ...(hoveredId === id.generatedHeadshotId
              ? styles.iconButtonHover
              : {}),
          }}
          title="Download"
        >
          <FiDownload size={20} />
        </button>
        <button
          onClick={() => setFullscreenImage(generated_headshot_url(id))}
          style={{
            ...styles.iconButton,
            ...(hoveredId === id.generatedHeadshotId
              ? styles.iconButtonHover
              : {}),
          }}
          title="Vollbild"
        >
          <FiMaximize2 size={20} />
        </button>
        <button
          onClick={(e) => handleFavouriteClick(id, e)}
          style={{
            ...styles.iconButton,
            ...(hoveredId === id.generatedHeadshotId
              ? styles.iconButtonHover
              : {}),
            color: favouriteIds.has(id.generatedHeadshotId)
              ? "#ff4757"
              : "inherit",
          }}
          title={
            favouriteIds.has(id.generatedHeadshotId)
              ? "Als Favorit entfernen"
              : "Als Favorit markieren"
          }
        >
          <FiHeart
            size={20}
            fill={favouriteIds.has(id.generatedHeadshotId) ? "#ff4757" : "none"}
          />
        </button>
      </div>
    </div>
  );

  const handleFullscreenClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setFullscreenImage(null);
  }, []);

  if (isLoading) {
    return <div>Lade Bewerbungsfotos...</div>;
  }

  const favouriteImages = imageIds.filter((id) =>
    favouriteIds.has(id.generatedHeadshotId),
  );

  return (
    <div style={styles.generatedImagesContainer}>
      {favouriteImages.length > 0 && (
        <>
          <h3 style={styles.sectionHeading}>Ihre Favoriten</h3>
          <div style={styles.imageGrid}>{favouriteImages.map(renderImage)}</div>
          <div style={styles.sectionDivider} />
        </>
      )}

      <h3 style={styles.sectionHeading}>Alle Bewerbungsfotos</h3>
      <div style={styles.imageGrid}>{imageIds.map(renderImage)}</div>

      {fullscreenImage && (
        <div style={styles.fullscreenOverlay} onClick={handleFullscreenClose}>
          <img
            src={fullscreenImage}
            alt="Fullscreen view"
            style={styles.fullscreenImage}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            style={styles.closeButton}
            onClick={handleFullscreenClose}
            title="Schließen"
          >
            <FiX size={24} />
          </button>
        </div>
      )}
    </div>
  );
}

export type HeadshotGeneratorProps = {
  headshotGenerationId: HeadshotGenerationId | null;
};
export function HeadshotGenerator({
  headshotGenerationId,
}: HeadshotGeneratorProps) {
  const [images, setImages] = useState<HeadshotImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<HeadshotGenerationProgress | null>(
    null,
  );
  const [generatedImageIds, setGeneratedImageIds] = useState<
    GeneratedHeadshotId[]
  >([]);
  const [, setLocation] = useLocation();

  // start monitoring if we have an existing generation
  useEffect(() => {
    if (headshotGenerationId !== null) {
      setIsProcessing(true);

      const monitorGeneration = async () => {
        try {
          const progressGenerator =
            monitorHeadshotGeneration(headshotGenerationId);

          for await (const progress of progressGenerator) {
            setProgress(progress);

            if (progress.kind === "error") {
              setError("Something went wrong, please try again");
              setIsProcessing(false);
              break;
            }

            if (progress.kind === "complete") {
              setGeneratedImageIds(progress.image_ids);
              setIsProcessing(false);
              break;
            }
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : "Process failed");
          setIsProcessing(false);
        }
      };

      monitorGeneration();
    }
  }, [headshotGenerationId]);

  const handleSubmit = useCallback(async () => {
    if (images.length < MIN_IMAGES) {
      setError(`Minimum ${MIN_IMAGES} images required`);
      return;
    }

    const hasErrors = images.some((img) => img.validationErrors.length > 0);
    if (hasErrors) {
      setError("Please fix validation errors before uploading");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const imageFiles = images.map((img) => img.file);
      const headshotGenerationId = await uploadHeadshotImages(imageFiles);

      const newRoute: Route = {
        kind: RouteKind.HeadshotGeneration,
        headshotGenerationRoute: {
          kind: "existing",
          headshotGenerationId,
        },
      };
      const newUrl = serializeRoute(newRoute);
      setLocation(newUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Process failed");
      setIsProcessing(false);
    }
  }, [images, setLocation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    };
  }, [images]);

  const isEditable = !isProcessing && headshotGenerationId === null;

  return (
    <div style={styles.container}>
      <div>
        {isEditable ? (
          <>
            <ImageUpload
              images={images}
              onImagesChange={setImages}
              disabled={!isEditable}
              onError={setError}
            />
            {error && <div style={styles.error}>{error}</div>}
            <PhotoGuide />
            <div style={styles.buttonContainer}>
              <button
                onClick={handleSubmit}
                disabled={!isEditable || images.length < MIN_IMAGES}
                style={{
                  ...styles.button,
                  ...(!isEditable || images.length < MIN_IMAGES
                    ? styles.buttonDisabled
                    : {}),
                }}
              >
                Bewerbungsfotos generieren
              </button>
            </div>
          </>
        ) : (
          <>
            {generatedImageIds.length === 0 && (
              <ProgressDisplay progress={progress} />
            )}
            {generatedImageIds.length > 0 && (
              <GeneratedImages imageIds={generatedImageIds} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
