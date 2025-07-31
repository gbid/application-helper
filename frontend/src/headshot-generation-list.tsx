import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { HeadshotGenerationListItem } from "../../backend/cover-letter/bindings/HeadshotGenerationListItem";
import { RouteKind, serializeRoute } from "./route";
import { fetchHeadshotGenerations } from "./api/headshot-generation";
import { CenteredMain } from "./container";
import { Spinner } from "./spinner";
import { FiPlus } from "react-icons/fi";

const styles: { [key: string]: React.CSSProperties } = {
  pageTitle: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "2em",
  },
  generationsList: {
    listStyleType: "none",
    padding: 0,
    maxWidth: "800px",
    margin: "0 auto",
  },
  generationItem: {
    marginBottom: "15px",
    padding: "15px",
    border: "1px solid #eee",
    borderRadius: "5px",
    backgroundColor: "white",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  generationItemHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontSize: "1.1em",
  },
  newButton: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#1a1a1a",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.1em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "20px",
    transition: "transform 0.2s ease",
  },
  newButtonHover: {
    transform: "translateY(-2px)",
  },
  error: {
    textAlign: "center",
    color: "#dc3545",
    backgroundColor: "rgba(220, 53, 69, 0.1)",
    padding: "15px",
    borderRadius: "5px",
    marginBottom: "20px",
  },
  date: {
    color: "#666",
    fontSize: "0.9em",
  },
  noGenerations: {
    textAlign: "center",
    padding: "30px",
    color: "#666",
    backgroundColor: "white",
    borderRadius: "5px",
    border: "1px solid #eee",
  },
};

export function HeadshotGenerationList() {
  const [generations, setGenerations] = useState<HeadshotGenerationListItem[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isNewButtonHovered, setIsNewButtonHovered] = useState(false);

  useEffect(() => {
    async function fetchGenerations() {
      try {
        setIsLoading(true);
        setError(null);
        const gens = await fetchHeadshotGenerations();
        setGenerations(gens);
      } catch (error) {
        console.error("Error fetching headshot generations:", error);
        setError(
          "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchGenerations();
  }, []);

  return (
    <CenteredMain>
      <h1 style={styles.pageTitle}>Ihre Bewerbungsfotos</h1>

      {error && <div style={styles.error}>{error}</div>}

      {isLoading ? (
        <Spinner />
      ) : (
        <ul style={styles.generationsList}>
          <li>
            <Link
              href={serializeRoute({
                kind: RouteKind.HeadshotGeneration,
                headshotGenerationRoute: { kind: "new" },
              })}
              style={styles.link}
            >
              <button
                style={{
                  ...styles.newButton,
                  ...(isNewButtonHovered ? styles.newButtonHover : {}),
                }}
                onMouseEnter={() => setIsNewButtonHovered(true)}
                onMouseLeave={() => setIsNewButtonHovered(false)}
              >
                <FiPlus size={20} />
                Neue Bewerbungsfotos generieren
              </button>
            </Link>
          </li>

          {generations.length === 0 ? (
            <div style={styles.noGenerations}>
              <p>Sie haben noch keine Bewerbungsfotos generiert.</p>
            </div>
          ) : (
            generations.map((generation) => (
              <li key={generation.headshotGenerationId.headshotGenerationId}>
                <Link
                  href={serializeRoute({
                    kind: RouteKind.HeadshotGeneration,
                    headshotGenerationRoute: {
                      kind: "existing",
                      headshotGenerationId: generation.headshotGenerationId,
                    },
                  })}
                  style={styles.link}
                >
                  <div
                    style={{
                      ...styles.generationItem,
                      ...(hoveredId ===
                      generation.headshotGenerationId.headshotGenerationId
                        ? styles.generationItemHover
                        : {}),
                    }}
                    onMouseEnter={() =>
                      setHoveredId(
                        generation.headshotGenerationId.headshotGenerationId,
                      )
                    }
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div style={styles.date}>
                      {new Date(generation.createdAt).toLocaleString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </CenteredMain>
  );
}
