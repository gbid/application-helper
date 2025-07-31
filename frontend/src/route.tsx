import { ApplicationId, RevisionId } from "./model";
import { HeadshotGenerationId } from "../../backend/cover-letter/bindings/HeadshotGenerationId";
import { ResumeLayout } from "../../backend/cover-letter/bindings/ResumeLayout";

export type BlogPostKind =
  | "hobbys-lebenslauf"
  | "lebenslauf-englisch"
  | "lebenslauf-vorlagen"
  | "anschreiben-vorlagen"
  | "berufseinsteiger"
  | "anschreiben-notwendig"
  | "ki-nutzung"
  | "anschreiben-guide"
  | "lebenslauf-guide"
  | "arbeitszeugnis-verstehen"
  | "assessment-center-erfolg"
  | "berufliche-neuorientierung"
  | "bewerbung-bei-startups"
  | "bewerbung-nach-berufspause"
  | "boreout-am-arbeitsplatz"
  | "erste-woche-im-neuen-job"
  | "gehaltsverhandlung-meistern"
  | "initiativbewerbung"
  | "jobwechsel-planen"
  | "koerpersprache-vorstellungsgespraech"
  | "probearbeiten-und-probezeit"
  | "remote-jobs-bewerbung"
  | "vorstellungsgespraech-haeufige-fragen"
  | "wann-kuendigen";

export type BlogRoute = { kind: "home" } | { kind: BlogPostKind };

function parseBlogRoute(segments: Array<string>): BlogRoute {
  const first = segments.shift();
  switch (first) {
    case undefined:
      return { kind: "home" };
    case "hobbys-lebenslauf":
      return { kind: "hobbys-lebenslauf" };
    case "lebenslauf-englisch":
      return { kind: "lebenslauf-englisch" };
    case "lebenslauf-vorlagen":
      return { kind: "lebenslauf-vorlagen" };
    case "anschreiben-vorlagen":
      return { kind: "anschreiben-vorlagen" };
    case "berufseinsteiger":
      return { kind: "berufseinsteiger" };
    case "anschreiben-notwendig":
      return { kind: "anschreiben-notwendig" };
    case "ki-nutzung":
      return { kind: "ki-nutzung" };
    case "anschreiben-guide":
      return { kind: "anschreiben-guide" };
    case "lebenslauf-guide":
      return { kind: "lebenslauf-guide" };
    case "arbeitszeugnis-verstehen":
      return { kind: "arbeitszeugnis-verstehen" };
    case "assessment-center-erfolg":
      return { kind: "assessment-center-erfolg" };
    case "berufliche-neuorientierung":
      return { kind: "berufliche-neuorientierung" };
    case "bewerbung-bei-startups":
      return { kind: "bewerbung-bei-startups" };
    case "bewerbung-nach-berufspause":
      return { kind: "bewerbung-nach-berufspause" };
    case "boreout-am-arbeitsplatz":
      return { kind: "boreout-am-arbeitsplatz" };
    case "erste-woche-im-neuen-job":
      return { kind: "erste-woche-im-neuen-job" };
    case "gehaltsverhandlung-meistern":
      return { kind: "gehaltsverhandlung-meistern" };
    case "initiativbewerbung":
      return { kind: "initiativbewerbung" };
    case "jobwechsel-planen":
      return { kind: "jobwechsel-planen" };
    case "koerpersprache-vorstellungsgespraech":
      return { kind: "koerpersprache-vorstellungsgespraech" };
    case "probearbeiten-und-probezeit":
      return { kind: "probearbeiten-und-probezeit" };
    case "remote-jobs-bewerbung":
      return { kind: "remote-jobs-bewerbung" };
    case "vorstellungsgespraech-haeufige-fragen":
      return { kind: "vorstellungsgespraech-haeufige-fragen" };
    case "wann-kuendigen":
      return { kind: "wann-kuendigen" };
    default:
      throw new Error(`Invalid blog route: ${first}`);
  }
}

function serializeBlogRoute(blogRoute: BlogRoute): string {
  switch (blogRoute.kind) {
    case "home":
      return "";
    case "hobbys-lebenslauf":
      return "/hobbys-lebenslauf";
    case "lebenslauf-englisch":
      return "/lebenslauf-englisch";
    case "lebenslauf-vorlagen":
      return "/lebenslauf-vorlagen";
    case "anschreiben-vorlagen":
      return "/anschreiben-vorlagen";
    case "berufseinsteiger":
      return "/berufseinsteiger";
    case "anschreiben-notwendig":
      return "/anschreiben-notwendig";
    case "ki-nutzung":
      return "/ki-nutzung";
    case "anschreiben-guide":
      return "/anschreiben-guide";
    case "lebenslauf-guide":
      return "/lebenslauf-guide";
    case "arbeitszeugnis-verstehen":
      return "/arbeitszeugnis-verstehen";
    case "assessment-center-erfolg":
      return "/assessment-center-erfolg";
    case "berufliche-neuorientierung":
      return "/berufliche-neuorientierung";
    case "bewerbung-bei-startups":
      return "/bewerbung-bei-startups";
    case "bewerbung-nach-berufspause":
      return "/bewerbung-nach-berufspause";
    case "boreout-am-arbeitsplatz":
      return "/boreout-am-arbeitsplatz";
    case "erste-woche-im-neuen-job":
      return "/erste-woche-im-neuen-job";
    case "gehaltsverhandlung-meistern":
      return "/gehaltsverhandlung-meistern";
    case "initiativbewerbung":
      return "/initiativbewerbung";
    case "jobwechsel-planen":
      return "/jobwechsel-planen";
    case "koerpersprache-vorstellungsgespraech":
      return "/koerpersprache-vorstellungsgespraech";
    case "probearbeiten-und-probezeit":
      return "/probearbeiten-und-probezeit";
    case "remote-jobs-bewerbung":
      return "/remote-jobs-bewerbung";
    case "vorstellungsgespraech-haeufige-fragen":
      return "/vorstellungsgespraech-haeufige-fragen";
    case "wann-kuendigen":
      return "/wann-kuendigen";
    default: {
      const exhaustive: never = blogRoute;
      throw new Error(`Unhandled blog route kind: ${exhaustive}`);
    }
  }
}

export type HeadshotGenerationRoute =
  | { kind: "home" }
  | { kind: "new" }
  | { kind: "list" }
  | { kind: "existing"; headshotGenerationId: HeadshotGenerationId };

function parseHeadshotGenerationRoute(
  segments: Array<string>,
): HeadshotGenerationRoute {
  const first = segments.shift();

  switch (first) {
    case undefined:
      return { kind: "home" };
    case "new":
      return { kind: "new" };
    case "list":
      return { kind: "list" };
    default:
      const flatGenerationId = parseUuidSegment(first);
      if (flatGenerationId === null) {
        throw new Error(
          `Invalid headshot generation ID: "${flatGenerationId}"`,
        );
      }

      let headshotGenerationId: HeadshotGenerationId = {
        headshotGenerationId: flatGenerationId,
      };

      return {
        kind: "existing",
        headshotGenerationId,
      };
  }
}

export enum InternalPrintRouteKind {
  CoverLetter = "CoverLetter",
  Resume = "Resume",
}

export type InternalPrintRouteCoverLetter = {
  kind: InternalPrintRouteKind.CoverLetter;
  sessionCookie: string;
  revisionId: RevisionId;
  watermark: boolean;
};

export type InternalPrintRouteResume = {
  kind: InternalPrintRouteKind.Resume;
  sessionCookie: string;
  revisionId: RevisionId;
  watermark: boolean;
  layout: ResumeLayout;
};

export type InternalPrintRoute =
  | InternalPrintRouteCoverLetter
  | InternalPrintRouteResume;

// SECTION: nested Application Route
export enum ApplicationStepKind {
  Application = "application",
  CoverLetterGeneration = "coverLetterGeneration",
}

export enum ApplicationRouteKind {
  New = "NewApplication",
  LatestRevision = "LatestRevision",
  SpecificRevision = "SpecificRevision",
}

export type ApplicationTab =
  | "job"
  | "anschreiben"
  | "lebenslauf"
  | "chat"
  | "controls";
export type ApplicationRoute =
  | { kind: ApplicationRouteKind.New; tab: ApplicationTab }
  | {
      kind: ApplicationRouteKind.LatestRevision;
      applicationId: ApplicationId;
      tab: ApplicationTab;
    }
  | {
      kind: ApplicationRouteKind.SpecificRevision;
      applicationId: ApplicationId;
      revisionId: RevisionId;
      tab: ApplicationTab;
    };

function isValidUUID(uuid: string | undefined) {
  if (uuid === undefined) {
    return false;
  }
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regex.test(uuid);
}

function segmentIsEmpty(segment: string | undefined): boolean {
  return segment === undefined || segment === "";
}

function parseUuidSegment(segment: string | undefined): string | null {
  if (segmentIsEmpty(segment)) {
    return null;
  }
  if (!isValidUUID(segment)) {
    throw new Error(`Invalid UUID: "${segment}"`);
  }
  return segment ?? null;
}

function parseApplicationRoute(
  segments: Array<string>,
  hash: string,
): ApplicationRoute {
  const first = segments.shift();
  const flatApplicationId = parseUuidSegment(first);

  let tab: ApplicationTab;
  switch (hash) {
    case "":
    case "controls":
      tab = "controls";
      break;
    case "chat":
      tab = "chat";
      break;
    case "job":
      tab = "job";
      break;
    case "anschreiben":
      tab = "anschreiben";
      break;
    case "lebenslauf":
      tab = "lebenslauf";
      break;
    default:
      throw new Error(`Invalid tab: ${hash}`);
  }

  if (flatApplicationId === null) {
    return { kind: ApplicationRouteKind.New, tab };
  }

  const applicationId: ApplicationId = {
    applicationId: flatApplicationId,
  };

  const second = segments.shift();
  switch (second) {
    case undefined:
      return { kind: ApplicationRouteKind.LatestRevision, applicationId, tab };
    case "revision":
      break;
    default:
      throw new Error(`Unexpected segment after applicationId: "${second}"`);
  }

  const third = segments.shift();
  if (third == null) {
    throw new Error("Missing revisionId after 'revision'");
  }

  const flatRevisionId = parseUuidSegment(third);
  if (flatRevisionId === null) {
    throw new Error(`Invalid revisionId: "${third}"`);
  }
  const revisionId = { revisionId: flatRevisionId };

  return {
    kind: ApplicationRouteKind.SpecificRevision,
    applicationId,
    revisionId,
    tab,
  };
}

function serializeApplicationRoute(applicationRoute: ApplicationRoute): string {
  switch (applicationRoute.kind) {
    case ApplicationRouteKind.New:
      return `#${applicationRoute.tab}`;
    case ApplicationRouteKind.LatestRevision:
      return `/${applicationRoute.applicationId.applicationId}#${applicationRoute.tab}`;
    case ApplicationRouteKind.SpecificRevision:
      return `/${applicationRoute.applicationId.applicationId}/revision/${applicationRoute.revisionId.revisionId}#${applicationRoute.tab}`;
    default: {
      const exhaustive: never = applicationRoute;
      throw new Error(`Unhandled application route kind: ${exhaustive}`);
    }
  }
}

function parseResumeLayout(layout: string | undefined): ResumeLayout | null {
  if (layout === undefined) {
    return null;
  }
  switch (layout) {
    case "singleColumn":
      return "singleColumn";
    case "dualColumn":
      return "dualColumn";
    case "singleColumnHeadshot":
      return "singleColumnHeadshot";
    case "german":
      return "german";
    default:
      throw new Error(`Invalid resume layout: ${layout}`);
  }
}

function parseInternalPrintRoute(segments: Array<string>): InternalPrintRoute {
  const first = segments.shift();
  switch (first) {
    case "cover-letter": {
      const sessionCookie = segments.shift();
      if (sessionCookie === undefined) {
        throw new Error("Missing session cookie");
      }
      const flatRevisionId = parseUuidSegment(segments.shift());
      if (flatRevisionId == null) {
        throw new Error("Missing revision id");
      }
      const watermark = segments.shift() === "watermarked";
      return {
        kind: InternalPrintRouteKind.CoverLetter,
        sessionCookie,
        revisionId: { revisionId: flatRevisionId },
        watermark,
      };
    }
    case "resume": {
      const sessionCookie = segments.shift();
      if (sessionCookie === undefined) {
        throw new Error("Missing session cookie");
      }
      const flatRevisionId = parseUuidSegment(segments.shift());
      if (flatRevisionId == null) {
        throw new Error("Missing revision id");
      }

      const layout = parseResumeLayout(segments.shift());
      if (layout === null) {
        throw new Error("Missing layout");
      }

      const watermark = segments.shift() === "watermarked";
      return {
        kind: InternalPrintRouteKind.Resume,
        sessionCookie,
        revisionId: { revisionId: flatRevisionId },
        layout,
        watermark,
      };
    }
    default:
      throw new Error(`Invalid internal print route: ${first}`);
  }
}

function serializeInternalPrintRoute(
  internalPrintRoute: InternalPrintRoute,
): string {
  const watermarkSegment = internalPrintRoute.watermark ? "/watermarked" : "";
  switch (internalPrintRoute.kind) {
    case InternalPrintRouteKind.CoverLetter:
      return `/cover-letter/${internalPrintRoute.sessionCookie}/${internalPrintRoute.revisionId.revisionId}${watermarkSegment}`;
    case InternalPrintRouteKind.Resume:
      return `/resume/${internalPrintRoute.sessionCookie}/${internalPrintRoute.revisionId.revisionId}/${internalPrintRoute.layout}${watermarkSegment}`;
    default: {
      const exhaustive: never = internalPrintRoute;
      throw new Error(`Unhandled internal print route kind: ${exhaustive}`);
    }
  }
}

// SECTION: top level Route
export enum RouteKind {
  Application = "application",
  Applications = "applications",
  Home = "home",
  Signup = "signup",
  SignupConfirm = "signupConfirm",
  Signin = "signin",
  SigninConfirm = "signinConfirm",
  Impressum = "impressum",
  Datenschutz = "datenschutz",
  Agb = "agb",
  AboutUs = "aboutUs",
  PricingPlans = "pricingPlans",
  CancelSubscription = "cancelSubscription",
  HeadshotGeneration = "headshotGeneration",
  InternalPrint = "internalPrint",
  Blog = "blog",
  SubscriptionSuccess = "subscriptionSuccess",
}

export type Route =
  | { kind: RouteKind.Application; applicationRoute: ApplicationRoute }
  | { kind: RouteKind.Applications }
  | { kind: RouteKind.Home }
  | {
      kind: RouteKind.Signup;
      query: { referredFrom?: Route; registrationPrompt?: string };
    }
  | { kind: RouteKind.SignupConfirm }
  | { kind: RouteKind.Signin }
  | { kind: RouteKind.SigninConfirm }
  | { kind: RouteKind.Impressum }
  | { kind: RouteKind.Datenschutz }
  | { kind: RouteKind.Agb }
  | { kind: RouteKind.AboutUs }
  | { kind: RouteKind.PricingPlans }
  | { kind: RouteKind.CancelSubscription }
  | {
      kind: RouteKind.HeadshotGeneration;
      headshotGenerationRoute: HeadshotGenerationRoute;
    }
  | {
      kind: RouteKind.Blog;
      blogRoute: BlogRoute;
    }
  | { kind: RouteKind.SubscriptionSuccess }
  | { kind: RouteKind.InternalPrint; internalPrintRoute: InternalPrintRoute };

function parseRouteImpl(
  segments: Array<string>,
  hashLocation: string,
  searchParams: URLSearchParams,
): Route {
  // Every location string begins with "/", so the first
  // part must be empty.
  const head = segments.shift();
  switch (head) {
    case undefined:
    case "":
      return { kind: RouteKind.Home };
    case "application":
      const applicationRoute = parseApplicationRoute(segments, hashLocation);
      return { kind: RouteKind.Application, applicationRoute };
    case "applications":
      return { kind: RouteKind.Applications };
    case "signup": {
      const second = segments.shift();
      switch (second) {
        case undefined:
        case "":
          const referredFromString = searchParams.get("referredFrom");
          const referredFromParts: string[] | undefined =
            referredFromString?.split("#");
          const referredFromLocation: string | undefined =
            referredFromParts?.[0];
          const referredFromHashLocation: string = referredFromParts?.[1] ?? "";
          const referredFrom =
            referredFromLocation !== undefined
              ? parseRoute(referredFromLocation, referredFromHashLocation, "")
              : undefined;
          const registrationPrompt =
            searchParams.get("registrationPrompt") || undefined;
          const query = { referredFrom, registrationPrompt };
          return { kind: RouteKind.Signup, query };
        case "confirm":
          return { kind: RouteKind.SignupConfirm };
        default:
          throw new Error(`Invalid signup route ${second}`);
      }
    }
    case "signin": {
      const second = segments.shift();
      switch (second) {
        case undefined:
          return { kind: RouteKind.Signin };
        case "confirm":
          return { kind: RouteKind.SigninConfirm };
        default:
          throw new Error(`Invalid signin route ${second}`);
      }
    }
    case "impressum":
      return { kind: RouteKind.Impressum };
    case "datenschutz":
      return { kind: RouteKind.Datenschutz };
    case "agb":
      return { kind: RouteKind.Agb };
    case "about-us":
      return { kind: RouteKind.AboutUs };
    case "pricing-plans":
      return { kind: RouteKind.PricingPlans };
    case "cancel-subscription":
      return { kind: RouteKind.CancelSubscription };
    case "headshot-generation":
      const headshotGenerationRoute = parseHeadshotGenerationRoute(segments);
      return { kind: RouteKind.HeadshotGeneration, headshotGenerationRoute };
    case "blog":
      const blogRoute = parseBlogRoute(segments);
      return { kind: RouteKind.Blog, blogRoute };
    case "subscription-success":
      return { kind: RouteKind.SubscriptionSuccess };
    case "internal-print": {
      const internalPrintRoute = parseInternalPrintRoute(segments);
      return { kind: RouteKind.InternalPrint, internalPrintRoute };
    }
    default:
      throw new Error(`Invalid top level route: ${head}`);
  }
}

function serializeRouteImpl(route: Route): string {
  switch (route.kind) {
    case RouteKind.Home:
      return "/";
    case RouteKind.Application:
      return `/application${serializeApplicationRoute(route.applicationRoute)}`;
    // case RouteKind.CoverLetterGeneration:
    //   // return `/cover-letter-generation/${route.coverLetterGenerationId.coverLetterGenerationId}`;
    // 	if (route.coverLetterGenerationId === null) {
    // 		return `/application/${route.applicationId.applicationId}/cover-letter-generation`;
    // 	}
    // 	else {
    // 		return `/application/${route.applicationId.applicationId}/cover-letter-generation/${route.coverLetterGenerationId?.coverLetterGenerationId}`;
    // 	}
    case RouteKind.Applications:
      return "/applications";
    case RouteKind.Signup:
      var path = "/signup";
      if (route.query !== undefined) {
        const queryParams = new URLSearchParams();
        if (route.query.referredFrom !== undefined) {
          queryParams.set(
            "referredFrom",
            serializeRouteImpl(route.query.referredFrom),
          );
        }
        if (route.query.registrationPrompt !== undefined) {
          queryParams.set("registrationPrompt", route.query.registrationPrompt);
        }
        path += `?${queryParams.toString()}`;
      }
      return path;
    case RouteKind.SignupConfirm:
      return "/signup/confirm";
    case RouteKind.Signin:
      return "/signin";
    case RouteKind.SigninConfirm:
      return "/signin/confirm";
    case RouteKind.Impressum:
      return "/impressum";
    case RouteKind.Datenschutz:
      return "/datenschutz";
    case RouteKind.Agb:
      return "/agb";
    case RouteKind.AboutUs:
      return "/about-us";
    case RouteKind.PricingPlans:
      return "/pricing-plans";
    case RouteKind.CancelSubscription:
      return "/cancel-subscription";
    case RouteKind.HeadshotGeneration:
      switch (route.headshotGenerationRoute.kind) {
        case "home":
          return "/headshot-generation";
        case "new":
          return "/headshot-generation/new";
        case "existing":
          return `/headshot-generation/${route.headshotGenerationRoute.headshotGenerationId.headshotGenerationId}`;
        case "list":
          return "/headshot-generation/list";
        default:
          const exhaustive: never = route.headshotGenerationRoute;
          throw new Error(
            `Unhandled headshot generation route kind: ${exhaustive}`,
          );
      }
    case RouteKind.Blog:
      return `/blog${serializeBlogRoute(route.blogRoute)}`;
    case RouteKind.SubscriptionSuccess:
      return "/subscription-success";
    case RouteKind.InternalPrint:
      return `/internal-print${serializeInternalPrintRoute(route.internalPrintRoute)}`;
    default: {
      const exhaustive: never = route;
      throw new Error(`Unhandled: ${exhaustive}`);
    }
  }
}

export function parseRoute(
  location: string,
  hashLocation: string,
  searchParams: string,
): Route {
  const segments = location.split("/");
  const emptyFirst = segments.shift();
  if (emptyFirst !== "") {
    throw new Error(`Location does not start with /: "${location}"`);
  }
  const urlSearchParams = new URLSearchParams(searchParams);
  const parsed = parseRouteImpl(segments, hashLocation, urlSearchParams);

  if (segments.length !== 0) {
    throw new Error(
      `Trailing segments for location "${location}" after parsed route ${parsed}: ${segments}`,
    );
  }
  // TODO: Do not do this in production.
  const serializedParsed = serializeRouteImpl(parsed);
  if (location !== serializedParsed) {
    // throw new Error(
    //   `serializeRoute(parseRoute(location)) != location: ${location} !== ${serializedParsed}`,
    // );
  }

  return parsed;
}

export function serializeRoute(route: Route): string {
  const serialized = serializeRouteImpl(route);
  const [start, hash] = serialized.split("#");
  const [baseUrl, searchParams] = start.split("?");

  // TODO: Do not do this in production.
  const parsedSerialized: Route = (() => {
    try {
      return parseRoute(baseUrl, hash, searchParams);
    } catch (err) {
      throw new Error("parseRoute(serializeRoute(route)) failed", {
        cause: err,
      });
    }
  })();
  if (JSON.stringify(parsedSerialized) !== JSON.stringify(route)) {
    throw new Error(
      `parseRoute(serializeRoute(route)) !== route: ${JSON.stringify(
        parsedSerialized,
      )} !== ${JSON.stringify(route)}`,
    );
  }

  return serialized;
}
