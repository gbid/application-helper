import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from "react";
import "./index.css";
import Landing from "./landing";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./navbar";
import { Impressum } from "./impressum";
import { Datenschutz } from "./datenschutz";
import { Agb } from "./agb";
import { AboutUs } from "./about-us";
import { Signin, SigninConfirm } from "./signin";
import { Signup, SignupConfirm } from "./signup";
import Footer from "./footer";
// import { Home } from "./home";
import { Applications } from "./applications";
import { Plans } from "./plans";
import { ApplicationWizard } from "./application-wizard";
import { Route, RouteKind } from "./route";
import { useUserType } from "./use-user-type";
import { UserType } from "../../backend/cover-letter/bindings/UserType";
import { isSignedIn } from "./utils";
import { InternalPrint } from "./internal-print";
import { useRoute } from "./use-route";
import { CancelSubscription } from "./cancel-subscription";
import { HeadshotGeneration } from "./headshot-generation";
import { Blog } from "./blog/shared";
import { SubscriptionSuccess } from "./subscription-success";

// this module does the following things:
// first, it checks if the user is signed in or not
// if the user is signed in, it will redirect to the home page
// if the user is not signed in, it will redirect to the sign in page
// and some other redirects based on the user's sign in status.
// So to summarize a bit more generally: it refers the user to the correct page based on their sign in status

// Check session on load. If the session is not valid, the response will unset session cookies.
// technically, this first makes a request to the server to check if the session is valid, and if it is not, it will unset the session cookies.
// (async function () {
//   try {
//     await fetch("/api/session", {
//       method: "POST",
//     });
//   } catch (err) {}
// })();

function isSignedOutOnlyRoute(route: Route): boolean {
  switch (route.kind) {
    case RouteKind.Home:
      return false;
    case RouteKind.Application:
      return false;
    case RouteKind.Applications:
      return false;
    case RouteKind.Impressum:
      return false;
    case RouteKind.Datenschutz:
      return false;
    case RouteKind.Agb:
      return false;
    case RouteKind.Signup:
      return true;
    case RouteKind.SignupConfirm:
      return true;
    case RouteKind.Signin:
      return true;
    case RouteKind.SigninConfirm:
      return true;
    case RouteKind.AboutUs:
      return false;
    case RouteKind.InternalPrint:
      return false;
    case RouteKind.PricingPlans:
      return false;
    case RouteKind.CancelSubscription:
      return false;
    case RouteKind.HeadshotGeneration:
      return false;
    case RouteKind.Blog:
      return false;
    case RouteKind.SubscriptionSuccess:
      return false;
    default: {
      const exhaustive: never = route;
      throw new Error(`Unhandled: ${exhaustive}`);
    }
  }
}

function isSignedInOnlyRoute(route: Route): boolean {
  switch (route.kind) {
    case RouteKind.Home:
      return false;
    case RouteKind.Application:
      return false;
    case RouteKind.Applications:
      return false;
    case RouteKind.Impressum:
      return false;
    case RouteKind.Datenschutz:
      return false;
    case RouteKind.Agb:
      return false;
    case RouteKind.AboutUs:
      return false;
    case RouteKind.Signup:
      return false;
    case RouteKind.SignupConfirm:
      return false;
    case RouteKind.Signin:
      return false;
    case RouteKind.SigninConfirm:
      return false;
    case RouteKind.InternalPrint:
      return false;
    case RouteKind.PricingPlans:
      return false;
    case RouteKind.CancelSubscription:
      return true;
    case RouteKind.HeadshotGeneration:
      return false;
    case RouteKind.Blog:
      return false;
    case RouteKind.SubscriptionSuccess:
      return true;
    default: {
      const exhaustive: never = route;
      throw new Error(`Unhandled: ${exhaustive}`);
    }
  }
}

// This function is the main function / Root Reaact Component of the app.
// It redirects to the correct page based on the user's sign in status.
function Root() {
  const userType: UserType | null = useUserType();
  const signedIn = isSignedIn(userType);

  const [route, setRoute] = useRoute();

  const [showUserExistsInfo, setShowUserExistsInfo] = useState(false);
  // unknownEmail is an optional string, and it is used to store the email of the user if an existing user tried to register again to fill in the signin form.
  const [unknownEmail, setUnknownEmail] = useState<string | undefined>(
    undefined,
  );

  function onSigninPending() {
    setUnknownEmail(undefined);
    setRoute({ kind: RouteKind.SigninConfirm });
  }

  function onSignupPending(route: Route | undefined) {
    return () => {
      setUnknownEmail(undefined);
      if (route !== undefined) {
        setRoute(route);
      } else {
        setRoute({ kind: RouteKind.SignupConfirm });
      }
    };
  }

  function onSigninUnknown(email: string) {
    setUnknownEmail(email);
    setRoute({
      kind: RouteKind.Signup,
      query: {},
    });
  }

  function onUserExists() {
    setShowUserExistsInfo(true);
  }

  const shouldRedirectHome =
    route == null ||
    (signedIn && isSignedOutOnlyRoute(route)) ||
    (!signedIn && isSignedInOnlyRoute(route));

  useEffect(() => {
    if (shouldRedirectHome) {
      console.error("Invalid route, redirecting to home:", route);
      setTimeout(() => {
        setRoute({ kind: RouteKind.Home });
      }, 0);
    }
  }, [shouldRedirectHome, route, setRoute]);

  const routeElement = (() => {
    switch (route?.kind) {
      case undefined:
        return null;
      case RouteKind.Home:
        return signedIn ? <Applications /> : <Landing />;
      case RouteKind.Application:
        return <ApplicationWizard applicationRoute={route.applicationRoute} />;
      case RouteKind.Applications:
        return <Applications />;
      case RouteKind.Impressum:
        return <Impressum />;
      case RouteKind.Datenschutz:
        return <Datenschutz />;
      case RouteKind.Agb:
        return <Agb />;
      case RouteKind.AboutUs:
        return <AboutUs />;
      case RouteKind.Signup:
        return (
          <Signup
            onSignupPending={onSignupPending(undefined)}
            onSigninPending={onSigninPending}
            referredFrom={route.query?.referredFrom}
            registrationPrompt={route.query?.registrationPrompt}
            onUserExists={onUserExists}
            unknownEmail={unknownEmail}
          />
        );
      case RouteKind.SignupConfirm:
        return <SignupConfirm />;
      case RouteKind.Signin:
        return (
          <Signin
            onSigninPending={onSigninPending}
            onSigninUnknown={onSigninUnknown}
          />
        );
      case RouteKind.SigninConfirm:
        return <SigninConfirm showUserExistsInfo={showUserExistsInfo} />;
      case RouteKind.PricingPlans:
        return <Plans displayMode="page" />;
      case RouteKind.CancelSubscription:
        return <CancelSubscription />;
      case RouteKind.HeadshotGeneration:
        return (
          <HeadshotGeneration
            headshotGenerationRoute={route.headshotGenerationRoute}
          />
        );
      case RouteKind.Blog:
        return <Blog blogRoute={route.blogRoute} />;
      case RouteKind.SubscriptionSuccess:
        return <SubscriptionSuccess />;
      case RouteKind.InternalPrint:
        return <InternalPrint internalPrintRoute={route.internalPrintRoute} />;
      default: {
        const exhaustive: never = route;
        throw new Error(`Unhandled: ${exhaustive}`);
      }
    }
  })();

  const shouldShowHeaderFooter: boolean = (function () {
    switch (route?.kind) {
      case undefined:
      case RouteKind.Home:
      case RouteKind.Application:
      case RouteKind.Applications:
      case RouteKind.Impressum:
      case RouteKind.Datenschutz:
      case RouteKind.Agb:
      case RouteKind.AboutUs:
      case RouteKind.Signup:
      case RouteKind.SignupConfirm:
      case RouteKind.Signin:
      case RouteKind.SigninConfirm:
      case RouteKind.PricingPlans:
      case RouteKind.CancelSubscription:
      case RouteKind.HeadshotGeneration:
      case RouteKind.Blog:
      case RouteKind.SubscriptionSuccess:
        return true;
      case RouteKind.InternalPrint:
        return false;
      default: {
        const exhaustive: never = route;
        throw new Error(`Unhandled: ${exhaustive}`);
      }
    }
  })();

  return (
    <>
      {shouldShowHeaderFooter && <Navbar />}
      {routeElement}
      {shouldShowHeaderFooter && <Footer />}
    </>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <>
    <Root />
  </>,
);
