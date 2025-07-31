import React, { useEffect, useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { ApplicationId } from "../../backend/cover-letter/bindings/ApplicationId";
import { ApplicationIdAndTitle } from "../../backend/cover-letter/bindings/ApplicationIdAndTitle";
import { isSignedIn } from "./utils";
import { getApplications } from "./api/application";
import {
  serializeRoute,
  Route,
  RouteKind,
  parseRoute,
  ApplicationRouteKind,
} from "./route";
import { CenteredMain } from "./container";
import { useUserType } from "./use-user-type";
import { UserType } from "../../backend/cover-letter/bindings/UserType";
import { Spinner } from "./spinner";

export function Applications() {
  const [applications, setApplications] = useState<
    ApplicationIdAndTitle[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userType: UserType | null = useUserType();

  const [location] = useLocation();
  const searchParams = useSearch();

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        setError(null);
        const apps = await getApplications();
        setApplications(apps);
      } catch (err) {
        console.error("Failed to get applications:", err);
        setError(
          "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder erstellen Sie eine neue Bewerbung.",
        );
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const applicationRoute = (applicationId: ApplicationId): Route => ({
    kind: RouteKind.Application,
    applicationRoute: {
      kind: ApplicationRouteKind.LatestRevision,
      applicationId,
      tab: "controls",
    },
  });

  if (isSignedIn(userType)) {
    return (
      <CenteredMain>
        <h1 style={styles.pageTitle}>Ihre Bewerbungen</h1>
        {error && (
          <div className="mb-3 alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {isLoading ? (
          <Spinner />
        ) : (
          <ul style={styles.applicationList}>
            <li
              key="new-application"
              style={{
                marginBottom: styles.applicationItem.marginBottom,
              }}
            >
              <Link
                href={serializeRoute({
                  kind: RouteKind.Application,
                  applicationRoute: {
                    kind: ApplicationRouteKind.New,
                    tab: "controls",
                  },
                })}
                style={styles.link}
              >
                <button
                  className="btn btn-dark btn-block"
                  style={{ width: "100%" }}
                >
                  ＋ Neue Bewerbung erstellen
                </button>
              </Link>
            </li>
            {applications?.map(({ applicationId, title }) => (
              <Link
                href={serializeRoute(applicationRoute(applicationId))}
                style={styles.link}
                key={applicationId.applicationId}
              >
                <li style={styles.applicationItem}>
                  {title ?? "Neue Bewerbung"}
                </li>
              </Link>
            ))}
          </ul>
        )}
      </CenteredMain>
    );
  } else {
    return (
      <CenteredMain>
        <h1 style={styles.pageTitle}>Ihre Bewerbungen</h1>
        <Link
          href={serializeRoute({
            kind: RouteKind.Signup,
            query: {
              referredFrom: parseRoute(location, "", searchParams),
              registrationPrompt:
                "Registrieren Sie sich, um Ihre Anschreiben zu sehen.",
            },
          })}
        >
          <div style={{ textAlign: "center" }}>
            <button className="btn btn-dark">
              Registrieren Sie sich, um Ihre Bewerbungen zu sehen
            </button>
          </div>
        </Link>
      </CenteredMain>
    );
  }
}

const styles: { [key: string]: React.CSSProperties } = {
  pageTitle: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "2em",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.2em",
  },
  applicationList: {
    listStyleType: "none",
    padding: 0,
  },
  applicationItem: {
    marginBottom: "15px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: "1.1em",
  },
};
