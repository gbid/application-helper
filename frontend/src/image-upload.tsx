import React, { useCallback } from "react";
import {
  HeadshotImage,
  ImageValidationError,
  validateImage,
} from "./headshot-generator";
import { colorDisabled } from "./styles";
import { spacing } from "./styles";
import { colorPrimary } from "./styles";
import { FiTrash } from "react-icons/fi";

const styles: { [key: string]: React.CSSProperties } = {
  uploadSection: {
    ...spacing.container,
    marginBottom: "2rem",
    textAlign: "center",
  },
  inputContainer: {
    backgroundColor: "#fafafa",
    padding: "1.5rem",
    borderRadius: "12px",
  },
  fileInputLabel: {
    display: "inline-block",
    padding: "12px 24px",
    backgroundColor: colorPrimary,
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.2s",
    marginBottom: "1rem",
  },
  fileInputLabelDisabled: {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
  fileInput: {
    // Hide the default input while keeping it functional
    width: "0.1px",
    height: "0.1px",
    opacity: 0,
    overflow: "hidden",
    position: "absolute",
    zIndex: -1,
  },
  uploadHint: {
    color: "#666",
    fontSize: "0.9rem",
    margin: "0.5rem 0",
  },
  imageCounter: {
    color: "#666",
    fontSize: "0.9rem",
    margin: "1rem 0",
  },
  imageCounterError: {
    color: "#dc3545",
  },
  previewsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "center",
    margin: "1rem 0",
  },
  previewWrapper: {
    position: "relative",
    width: "200px",
    aspectRatio: "1",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    border: "1px solid #ddd",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
  },
  removeButton: {
    position: "absolute",
    top: "0px",
    right: "0px",
    backgroundColor: "white",
    border: "none",
    borderRadius: "4px",
    padding: "8px 10px",
    cursor: "pointer",
    zIndex: 2,
  },
  removeButtonDisabled: {
    backgroundColor: colorDisabled,
  },
  buttonDisabled: {
    backgroundColor: colorDisabled,
    cursor: "not-allowed",
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
  validationErrorsContainer: {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "8px",
    fontSize: "12px",
  },
  errorText: {
    color: "red",
    margin: "2px 0",
  },
};

export const MIN_IMAGES = 8;
export const MAX_IMAGES = 20;

type ImageUploadProps = {
  images: HeadshotImage[];
  onImagesChange: (images: HeadshotImage[]) => void;
  disabled?: boolean;
  onError?: (error: string) => void;
};

export function ImageUpload({
  images,
  onImagesChange,
  disabled,
  onError,
}: ImageUploadProps) {
  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);

      if (files.length + images.length > MAX_IMAGES) {
        onError?.(`Maximal ${MAX_IMAGES} Fotos erlaubt`);
        return;
      }

      const newImages: HeadshotImage[] = await Promise.all(
        files.map(async (file) => ({
          file,
          previewUrl: URL.createObjectURL(file),
          validationErrors: await validateImage(file),
        })),
      );

      onImagesChange([...images, ...newImages]);
    },
    [images, onImagesChange, onError],
  );

  const removeImage = useCallback(
    (index: number) => {
      const newImages = [...images];
      URL.revokeObjectURL(newImages[index].previewUrl);
      newImages.splice(index, 1);
      onImagesChange(newImages);
    },
    [images, onImagesChange],
  );

  return (
    <div style={styles.uploadSection}>
      <div style={styles.inputContainer}>
        <p style={styles.uploadHint}>
          Akzeptierte Formate: JPG, PNG oder WebP • Mindestgröße: 512x512 Pixel
        </p>
        <p style={styles.uploadHint}>
          Sie können mehrmals Fotos auswählen, um insgesamt auf {MIN_IMAGES}-
          {MAX_IMAGES} Fotos zu kommen. Je mehr geeignete Fotos, desto besser!
        </p>
        <div
          style={{
            ...styles.imageCounter,
            ...(images.length < MIN_IMAGES ? styles.imageCounterError : {}),
          }}
        >
          {images.length} von {MIN_IMAGES}-{MAX_IMAGES} Fotos ausgewählt
        </div>
        <label
          style={{
            ...styles.fileInputLabel,
            ...(disabled ? styles.fileInputLabelDisabled : {}),
          }}
        >
          Fotos auswählen
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileSelect}
            disabled={disabled}
            style={styles.fileInput}
          />
        </label>
      </div>

      {images.length > 0 && (
        <div style={styles.previewsContainer}>
          {images.map((image, index) => (
            <div key={index} style={styles.previewWrapper}>
              <img
                src={image.previewUrl}
                alt="Preview"
                style={styles.previewImage}
              />
              <button
                onClick={() => removeImage(index)}
                disabled={disabled}
                style={{
                  ...styles.removeButton,
                  ...(disabled ? styles.removeButtonDisabled : {}),
                }}
              >
                <FiTrash />
              </button>
              {image.validationErrors.length > 0 && (
                <div style={styles.validationErrorsContainer}>
                  {image.validationErrors.map((error) => (
                    <p key={error} style={styles.errorText}>
                      {formatValidationError(error)}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function formatValidationError(error: ImageValidationError): string {
  switch (error) {
    case "TOO_SMALL":
      return `Image must be at least 512x512 pixels`;
    case "WRONG_FORMAT":
      return "Image must be JPG, PNG, or WebP format";
    case "TOO_MANY_FILES":
      return `Maximum ${MAX_IMAGES} images allowed`;
    case "TOO_FEW_FILES":
      return `Please upload at least ${MIN_IMAGES} images`;
    default:
      const _exhaustiveCheck: never = error;
      return `Unknown error: ${_exhaustiveCheck}`;
  }
}
