import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { serializeRoute, RouteKind, parseRoute, Route } from "./route";
import { UserType } from "../../backend/cover-letter/bindings/UserType";
import { getUserType } from "./api/user";
import {
  CREATE_CUSTOMER_PORTAL_SESSION_ROUTE,
  CREATE_CHECKOUT_SESSION_ROUTE,
} from "./api/stripe";
import { useRoute } from "./use-route";

const linkStyle: React.CSSProperties = {
  textDecoration: "none",
  color: "inherit",
};

type Feature = {
  name: string;
  included: boolean;
};

export enum TierKind {
  Free = "Free",
  Professional = "Professional",
}

type Tier = {
  displayName: string;
  price: string;
  features: Feature[];
  buttonVariant: string;
  buttonText: string;
};

const TIERS_DATA: Record<TierKind, Tier> = {
  [TierKind.Free]: {
    displayName: "Kostenlos",
    price: "€0",
    features: [
      { name: "3 Anschreiben pro Woche generieren", included: true },
      { name: "Unbegrenzt Anschreiben generieren", included: false },
      // include this again once we have these features:
      // {
      //   name: "Professionelle, individualisierte Bewerbungsmappen",
      //   included: false,
      // },
      // { name: "Lebenslauf für jede Stelle optimiert", included: false },
      {
        name: "Download Ihres Anschreibens und Lebenslaufs nur mit Wasserzeichen",
        included: false,
      },
      { name: "Optimale Chancen für Ihre Bewerbung", included: false },
    ],
    buttonVariant: "outline-dark",
    buttonText: "Kostenlos registrieren",
  },
  [TierKind.Professional]: {
    displayName: "Professional",
    price: "€9,90",
    features: [
      { name: "Unbegrenzt Anschreiben generieren", included: true },
      // include this again once we have these features:
      // {
      //   name: "Professionelle, individualisierte Bewerbungsmappen",
      //   included: true,
      // },
      // { name: "Lebenslauf für jede Stelle optimiert", included: true },
      {
        name: "Download Ihres professionellen Anschreibens und Lebenslaufs",
        included: true,
      },
      { name: "Optimale Chancen für Ihre Bewerbung", included: true },
      { name: "Monatlich kündbar, keine Mindestlaufzeit", included: true },
    ],
    buttonVariant: "dark",
    buttonText: "Weiter mit Professional",
  },
};

type PlansProps = {
  displayMode: "page" | "hover";
  tiers?: TierKind[];
};

export function Plans({
  displayMode,
  tiers = Object.values(TierKind),
}: PlansProps) {
  const [userType, setUserType] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUserType = async () => {
      const userType = await getUserType();
      setUserType(userType);
    };
    fetchUserType();
  }, []);

  const referredFrom = parseRoute("/pricing-plans", "", "");

  const content = (
    <div
      className={`row ${
        displayMode === "hover" ? "g-2" : "justify-content-center"
      }`}
    >
      {tiers.map((tierKind) => (
        <div className="col-md-6 mb-4">
          <TierOverview
            key={tierKind}
            tierKind={tierKind}
            displayMode={displayMode}
            userType={userType}
            targetRoute={referredFrom}
          />
        </div>
      ))}
    </div>
  );

  if (displayMode === "hover") {
    return content;
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Wählen Sie Ihr Paket</h1>
      {content}
    </div>
  );
}

type TierOverviewProps = {
  tierKind: TierKind;
  displayMode: "page" | "hover";
  userType: UserType | null;
  title?: string;
  targetRoute: Route | null;
};

export function TierOverview({
  tierKind,
  displayMode,
  userType,
  title,
  targetRoute,
}: TierOverviewProps) {
  const [currentRoute] = useRoute();
  const effectiveTargetRoute = targetRoute ??
    currentRoute ?? { kind: RouteKind.Home };

  const tier = TIERS_DATA[tierKind];
  const displayTitle = title === undefined ? tier.displayName : title;
  return (
    <div className={`card h-100 ${displayMode === "hover" ? "" : "shadow-sm"}`}>
      <div className="card-header text-center">
        <h3 className="my-0 font-weight-bold">{displayTitle}</h3>
      </div>
      <div className="card-body">
        <h2 className="card-title pricing-card-title text-center mb-4">
          {tier.price}
          <small className="text-muted"> / Monat</small>
        </h2>
        <ul className="list-unstyled mt-3 mb-4">
          {tier.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="mb-2">
              {feature.included ? (
                <span className="me-2">✔️</span>
              ) : (
                <span className="me-2">❌</span>
              )}
              {feature.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="card-footer text-center">
        <TierButton
          tierKind={tierKind}
          userType={userType}
          targetRoute={effectiveTargetRoute}
        />
      </div>
    </div>
  );
}

type TierButtonProps = {
  tierKind: TierKind;
  userType: UserType | null;
  targetRoute: Route;
};

function TierButton({ tierKind, userType, targetRoute }: TierButtonProps) {
  const tier = TIERS_DATA[tierKind];

  switch (userType) {
    case "anonymous":
    case null:
      return (
        <button className={`btn btn-${tier.buttonVariant}`}>
          <Link
            href={serializeRoute({
              kind: RouteKind.Signup,
              query: {
                referredFrom: targetRoute,
                registrationPrompt: undefined,
              },
            })}
            style={linkStyle}
          >
            {tier.buttonText}
          </Link>
        </button>
      );

    case "standard":
      switch (tierKind) {
        case TierKind.Free:
          return (
            <button className="btn btn-secondary" disabled>
              Aktuelles Paket
            </button>
          );
        case TierKind.Professional:
          // return <SubscribeButton displayText={tier.buttonText} />;
          return (
            <a href={CREATE_CHECKOUT_SESSION_ROUTE} className="btn btn-dark">
              {tier.buttonText}
            </a>
          );
        default: {
          const exhaustive: never = tierKind;
          throw new Error(`Unhandled tier kind: ${exhaustive}`);
        }
      }

    case "subscribed":
      switch (tierKind) {
        case TierKind.Free:
          return (
            <a
              href={CREATE_CUSTOMER_PORTAL_SESSION_ROUTE}
              className="btn btn-dark"
            >
              Bewerbungshelfer Professional kündigen
            </a>
          );
        case TierKind.Professional:
          return (
            <button className="btn btn-secondary" disabled>
              Aktuelles Paket
            </button>
          );
        default: {
          const exhaustive: never = tierKind;
          throw new Error(`Unhandled tier kind: ${exhaustive}`);
        }
      }

    default: {
      const exhaustive: never = userType;
      throw new Error(`Unhandled: ${exhaustive}`);
    }
  }
}
