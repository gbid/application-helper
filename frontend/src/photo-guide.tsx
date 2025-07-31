import React from "react";
import doSelfie from "./media/photo-guide/do-selfie.webp";
import doVarietyImage from "./media/photo-guide/do-variety.webp";
import doRecentImage from "./media/photo-guide/do-recent.webp";
import doDistanceImage from "./media/photo-guide/do-distance.webp";
import dontQualityImage from "./media/photo-guide/dont-quality.webp";
import dontRevealingImage from "./media/photo-guide/dont-revealing.webp";
import dontAccessoriesImage from "./media/photo-guide/dont-accessories.webp";
import dontAnglesImage from "./media/photo-guide/dont-angles.webp";
import { spacing } from "./styles";
import { colorSuccess } from "./styles";
import { colorWarning } from "./styles";

const styles: { [key: string]: React.CSSProperties } = {
  container: spacing.container,
  section: {
    marginBottom: "2rem",
    padding: "1.5rem",
    borderRadius: "12px",
  },
  sectionDo: {
    backgroundColor: colorSuccess,
  },
  sectionDont: {
    backgroundColor: colorWarning,
  },
  sectionTitle: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#333",
  },
  guideGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "center",
  },
  guideItem: {
    backgroundColor: "white",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    flex: "1 1 200px",
    maxWidth: "250px",
  },
  imageContainer: {
    width: "100%",
    paddingTop: "133.33%",
    position: "relative",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },
  content: {
    padding: "0.75rem",
  },
  emoji: {
    fontSize: "1.2rem",
    marginRight: "0.5rem",
  },
  title: {
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "0.3rem",
    display: "flex",
    alignItems: "center",
  },
  description: {
    color: "#666",
    lineHeight: "1.3",
    fontSize: "0.9rem",
  },
};

type GuideItemProps = {
  emoji: string;
  title: string;
  description: string;
  image: string;
};

function GuideItem({ emoji, title, description, image }: GuideItemProps) {
  return (
    <div style={styles.guideItem}>
      <div style={styles.imageContainer}>
        <img src={image} alt={title} style={styles.image} />
      </div>
      <div style={styles.content}>
        <div style={styles.title}>
          <span style={styles.emoji}>{emoji}</span>
          {title}
        </div>
        <p style={styles.description}>{description}</p>
      </div>
    </div>
  );
}

export function PhotoGuide() {
  return (
    <div style={styles.container}>
      <div style={{ ...styles.section, ...styles.sectionDo }}>
        <h2 style={styles.sectionTitle}>Wie Ihre Fotos aussehen sollten</h2>
        <div style={styles.guideGrid}>
          <GuideItem
            emoji="😃"
            title="Selfies"
            description="Lade frontale Selfies hoch, die gut beleuchtet und auf Augenhöhe aufgenommen sind"
            image={doSelfie}
          />
          <GuideItem
            emoji="👕"
            title="Vielfalt"
            description="Lade Fotos in verschiedenen Outfits und mit unterschiedlichen Hintergründen hoch"
            image={doVarietyImage}
          />
          <GuideItem
            emoji="🆕"
            title="Aktualität"
            description="Verwende aktuelle Fotos aus den letzten 6 Monaten mit ähnlichen Frisuren und Haarlängen"
            image={doRecentImage}
          />
          <GuideItem
            emoji="☀️"
            title="Klarheit"
            description="Lade auch Fotos hoch, die aus guter Entfernung aufgenommen wurden, idealerweise von der Brust oder Hüfte aufwärts"
            image={doDistanceImage}
          />
        </div>
      </div>

      <div style={{ ...styles.section, ...styles.sectionDont }}>
        <h2 style={styles.sectionTitle}>Was Sie vermeiden sollten</h2>
        <div style={styles.guideGrid}>
          <GuideItem
            emoji="❌"
            title="Keine Fotos schlechter Qualität"
            description="Verwende keine Fotos, die unscharf, abgeschnitten oder zu dunkel / hell sind"
            image={dontQualityImage}
          />
          <GuideItem
            emoji="❌"
            title="Keine freizügige Kleidung"
            description="Lade keine Fotos mit tiefen Ausschnitten, oberkörperfrei oder in knapper Kleidung hoch"
            image={dontRevealingImage}
          />
          <GuideItem
            emoji="❌"
            title="Keine Accessoires"
            description="Vermeide Fotos mit Hüten, Sonnenbrillen, Kopfhörern, Schlüsselbändern, etc."
            image={dontAccessoriesImage}
          />
          <GuideItem
            emoji="❌"
            title="Keine unnatürlichen Winkel"
            description="Vermeide Fotos von der Seite, von unten, oder bei denen du wegschaust"
            image={dontAnglesImage}
          />
        </div>
      </div>
    </div>
  );
}
