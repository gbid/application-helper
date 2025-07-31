import {
  RouteKind,
  serializeRoute,
  ApplicationRoute,
  Route,
  ApplicationRouteKind,
  ApplicationTab,
} from "./route";
import { ApplicationParameters } from "../../backend/cover-letter/bindings/ApplicationParameters";
import { ApplicationId } from "../../backend/cover-letter/bindings/ApplicationId";
import { ResumeLayout } from "../../backend/cover-letter/bindings/ResumeLayout";
import {
  getApplicationParameters,
  getApplicationParametersForRevision,
  postApplication,
  postApplicationParameters,
} from "./api/application";
import { useEffect, useState } from "react";
import { useDeviceType } from "./use-device-type";
import { CoverLetter } from "./cover-letter";
import { JobAdvertControl } from "./control-pane";
import { ResumeControl } from "./control-pane";
import { WordCountControl } from "./control-pane";
import { LanguageControl } from "./control-pane";
import { RegenerateControl } from "./control-pane";
import { ImproveResumeControl } from "./control-pane";
import { startAnonymousSession } from "./api/anonymous-session";
import { useApplicationTitle } from "./application-title";
import "bootstrap-icons/font/bootstrap-icons.css";
import { cookieExists } from "./session-cookie-exists-hook";
import { Resume } from "./resume";
import { PlansPopup } from "./plans-popup";
import { DownloadLink, DownloadLinkTarget } from "./download-link";
import { ResumeChat } from "./resume-chat";
import { useLocation } from "wouter";
import { Tabs, TabItem } from "./tabs";
import { postUserMessage } from "./api/chat";
import {
  RESUME_CONTROL_SELECTOR,
  JOB_ADVERT_CONTROL_SELECTOR,
} from "./joyride";
import { joyrideLocale } from "./joyride";
import { joyrideStyle } from "./joyride";
import { Step } from "react-joyride";
import Joyride, { CallBackProps, STATUS } from "react-joyride";
import { shouldShowHeadshotPopup } from "./headshot-popup";
import { markHeadshotPopupAsShown } from "./headshot-popup";
import { HeadshotPopup } from "./headshot-popup";
import { useUserType } from "./use-user-type";
import { UserType } from "../../backend/cover-letter/bindings/UserType";
import { isSignedIn } from "./utils";
import { useScaleFactor } from "./use-scale-factor";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row" as const,
    gap: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    paddingBottom: 32,
  },
  controlPane: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 32,
    minWidth: "25%",
    position: "sticky" as const,
    top: 0,
    height: "100vh",
    overflowY: "auto" as const,
    paddingBottom: "16px",
  },
  contentPane: {
    display: "flex",
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 32,
  },
  page: {
    minHeight: "297mm",
    width: "210mm",
    border: "1px solid black",
    borderRadius: 4,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  downloadLinkContainer: {
    position: "absolute" as const,
    bottom: "25mm",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  },
  mobileBottomControls: {
    position: "sticky" as const,
    bottom: 0,
    backgroundColor: "white",
    padding: "16px",
    borderTop: "1px solid #ddd",
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  },
};

type JobTabProps = {
  applicationParameters: ApplicationParameters;
  pushApplicationParameters:
    | ((
        update: (old: ApplicationParameters) => ApplicationParameters,
      ) => Promise<void>)
    | null;
  postMessageAndOpenChat: ((message: string) => Promise<void>) | null;
};

function JobTab({
  applicationParameters,
  pushApplicationParameters,
  postMessageAndOpenChat,
}: JobTabProps): JSX.Element {
  const [runTour, setRunTour] = useState(false);
  const userType: UserType | null = useUserType();
  const signedIn = isSignedIn(userType);
  const isMobile = useDeviceType();

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenTour");
    if (hasSeenTour !== "true" && !signedIn) {
      setRunTour(true);
      localStorage.setItem("hasSeenTour", "true");
    }
  }, [signedIn]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRunTour(false);
    }
  };

  const joyrideSteps: Step[] = [
    {
      target: `.${JOB_ADVERT_CONTROL_SELECTOR}`,
      content: "Kopieren Sie die Stellenanzeige hierher.",
      disableBeacon: true,
      placement: "right",
    },
    {
      target: `.${RESUME_CONTROL_SELECTOR}`,
      content:
        "Laden Sie hier Ihren Lebenslauf hoch. So können wir im Anschreiben auf Ihre Stärken eingehen.",
      disableBeacon: true,
      placement: "right",
    },
  ];

  const contentStyle = {
    paddingLeft: isMobile ? "16px" : 0,
    paddingRight: isMobile ? "16px" : 0,
  };

  return (
    <div style={contentStyle}>
      <Joyride
        steps={joyrideSteps}
        continuous={true}
        run={runTour}
        spotlightClicks={true}
        disableScrolling={true}
        hideBackButton={true}
        callback={handleJoyrideCallback}
        styles={joyrideStyle}
        locale={joyrideLocale}
      />
      <JobAdvertControl
        applicationParameters={applicationParameters}
        pushApplicationParameters={pushApplicationParameters}
      />
      <ResumeControl
        applicationParameters={applicationParameters}
        pushApplicationParameters={pushApplicationParameters}
        postMessageAndOpenChat={postMessageAndOpenChat}
      />
      <LanguageControl
        applicationParameters={applicationParameters}
        pushApplicationParameters={pushApplicationParameters}
      />
    </div>
  );
}

type CoverLetterTabProps = {
  revisionId: string | null;
  applicationParameters: ApplicationParameters;
  pushApplicationParameters:
    | ((
        update: (old: ApplicationParameters) => ApplicationParameters,
      ) => Promise<void>)
    | null;
  setShowError: (show: boolean) => void;
  setShowPlansPopup: (show: boolean) => void;
  mobileLayout: boolean;
};

function CoverLetterTab({
  revisionId,
  applicationParameters,
  pushApplicationParameters,
  setShowError,
  setShowPlansPopup,
  mobileLayout,
}: CoverLetterTabProps): JSX.Element {
  return (
    <div>
      <div style={{ marginBottom: "80px" }}>
        <CoverLetter
          revisionId={revisionId}
          layout={"dualColumn"}
          setShowError={setShowError}
          setShowPlansPopup={setShowPlansPopup}
          pushApplicationParameters={pushApplicationParameters}
          mobileLayout={mobileLayout}
        />
      </div>
      <div style={styles.mobileBottomControls}>
        <WordCountControl
          applicationParameters={applicationParameters}
          pushApplicationParameters={pushApplicationParameters}
        />
        <RegenerateControl
          applicationParameters={applicationParameters}
          pushApplicationParameters={pushApplicationParameters}
        />
      </div>
    </div>
  );
}

type ResumeTabProps = {
  revisionId: string | null;
  pushApplicationParameters:
    | ((
        update: (old: ApplicationParameters) => ApplicationParameters,
      ) => Promise<void>)
    | null;
  setShowPlansPopup: (show: boolean) => void;
  postMessageAndOpenChat: ((message: string) => Promise<void>) | null;
  applicationParameters: ApplicationParameters;
};

function ResumeTab({
  revisionId,
  pushApplicationParameters,
  setShowPlansPopup,
  postMessageAndOpenChat,
  applicationParameters,
}: ResumeTabProps): JSX.Element {
  const scaleFactor = useScaleFactor();

  return (
    <div>
      <div
        style={{
          marginBottom: "80px",
          zoom: scaleFactor,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          <DownloadableResume
            revisionId={revisionId}
            pushApplicationParameters={pushApplicationParameters}
            layout="dualColumn"
            setShowPlansPopup={setShowPlansPopup}
          />
          <DownloadableResume
            revisionId={revisionId}
            pushApplicationParameters={pushApplicationParameters}
            layout="singleColumn"
            setShowPlansPopup={setShowPlansPopup}
          />
          <DownloadableResume
            revisionId={revisionId}
            pushApplicationParameters={pushApplicationParameters}
            layout="singleColumnHeadshot"
            setShowPlansPopup={setShowPlansPopup}
          />
          <DownloadableResume
            revisionId={revisionId}
            pushApplicationParameters={pushApplicationParameters}
            layout="german"
            setShowPlansPopup={setShowPlansPopup}
          />
        </div>
      </div>
      <div style={styles.mobileBottomControls}>
        <ImproveResumeControl
          applicationParameters={applicationParameters}
          postMessageAndOpenChat={postMessageAndOpenChat}
        />
      </div>
    </div>
  );
}

type DownloadableResumeProps = {
  revisionId: string | null;
  pushApplicationParameters:
    | ((
        update: (old: ApplicationParameters) => ApplicationParameters,
      ) => Promise<void>)
    | null;
  layout: ResumeLayout;
  setShowPlansPopup: (show: boolean) => void;
};

function DownloadableResume({
  revisionId,
  pushApplicationParameters,
  layout,
  setShowPlansPopup,
}: DownloadableResumeProps) {
  return (
    <div style={{ position: "relative", ...styles.page }}>
      <Resume
        revisionId={revisionId}
        pushApplicationParameters={pushApplicationParameters}
        layout={layout}
      />
      <div style={styles.downloadLinkContainer}>
        <DownloadLink
          revisionId={revisionId}
          target={DownloadLinkTarget.Resume}
          setShowPlansPopup={setShowPlansPopup}
          layout={layout}
        />
      </div>
    </div>
  );
}

interface UseApplicationReturn {
  showError: boolean;
  setShowError: (show: boolean) => void;
  showPlansPopup: boolean;
  setShowPlansPopup: (show: boolean) => void;
  showHeadshotPopup: boolean;
  setShowHeadshotPopup: (show: boolean) => void;
  generationsWithNoResume: number;
  applicationParameters: ApplicationParameters;
  revisionId: string | null;
  applicationId: ApplicationId | null;
  updateRevisionId: (newRevisionId: string) => void;
  pushApplicationParameters:
    | ((
        update: (old: ApplicationParameters) => ApplicationParameters,
      ) => Promise<void>)
    | null;
}

function useApplication(
  applicationRoute: ApplicationRoute,
): UseApplicationReturn {
  const [showError, setShowError] = useState<boolean>(false);
  const [showPlansPopup, setShowPlansPopup] = useState<boolean>(false);
  const [showHeadshotPopup, setShowHeadshotPopup] = useState<boolean>(false);
  const [generationsWithNoResume, setGenerationsWithNoResume] =
    useState<number>(0);
  const [, setLocation] = useLocation();

  const [applicationParameters, setApplicationParameters] =
    useState<ApplicationParameters>({
      jobAdvert: null,
      resumeId: null,
      wordCount: null,
      templateCoverLetterId: null,
      languageOverride: null,
      coverLetterRandomSeed: null,
      coverLetterText: null,
      applicantAddress: {
        name: null,
        streetAddress: null,
        postalCode: null,
        city: null,
      },
      companyAddress: {
        companyName: null,
        streetAddress: null,
        postalCode: null,
        city: null,
      },
      jsonResume: null,
      parentRevisionId: null,
      headshotId: null,
    });

  // This is the RevisionID that we're displaying. In case we're on the LatestRevision route,
  // we need to fetch this, since the ID is not in the route then. In case we're on the SpecificRevision route
  // though we can use the revisionId from the route directly.
  // This will be `null` either if we're on the New route (so we don't even have an ApplicationId
  // yet), or if the application has just been created and doesn't have a revision yet.
  const [revisionId, setRevisionId] = useState<string | null>(null);

  const applicationId: ApplicationId | null = (function () {
    switch (applicationRoute.kind) {
      case ApplicationRouteKind.New:
        return null;
      case ApplicationRouteKind.LatestRevision:
        return applicationRoute.applicationId;
      case ApplicationRouteKind.SpecificRevision:
        return applicationRoute.applicationId;
      default: {
        const exhaustive: never = applicationRoute;
        throw new Error(`Unhandled application route kind: ${exhaustive}`);
      }
    }
  })();

  // If this element is mounted with a New application route, then it must create a new application
  // and navigate to the latest revision of that application.
  useEffect(() => {
    if (applicationRoute.kind !== ApplicationRouteKind.New) {
      return;
    }

    // TODO: Do we need to think about cancelling this effect in case the URL changes before it
    // finishes?
    (async function () {
      try {
        const isLoggedIn = cookieExists("user");
        if (!isLoggedIn) {
          await startAnonymousSession();
        }

        const applicationId = await postApplication();
        const route: Route = {
          kind: RouteKind.Application,
          applicationRoute: {
            kind: ApplicationRouteKind.LatestRevision,
            applicationId,
            tab: "controls",
          },
        };
        window.history.replaceState({}, "", serializeRoute(route));
      } catch (error) {
        console.error("Error creating new application", error);
        setShowError(true);
      }
    })();
  }, [applicationRoute]);

  useEffect(() => {
    if (!shouldShowHeadshotPopup()) return;
    const TWO_MINUTES = 2 * 60 * 1000;
    const timer = setTimeout(() => {
      setShowHeadshotPopup(true);
      markHeadshotPopupAsShown();
    }, TWO_MINUTES);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    (async function () {
      switch (applicationRoute.kind) {
        case ApplicationRouteKind.New:
          break;
        case ApplicationRouteKind.LatestRevision: {
          // TODO: I believe this runs every time we update the parameters, since we're updating
          // the browser history when that happens, which shortly changes the URL. If I'm right,
          // then we should do something to avoid fetching the latest revision in that common case.
          // TODO: Replace this with an API that gives us the latest parameters as well as the
          // revision ID.
          const revision = await getApplicationParameters(
            applicationRoute.applicationId,
          );
          setRevisionId(revision.revisionId?.revisionId ?? null);
          setApplicationParameters(revision.applicationParameters);
          break;
        }
        case ApplicationRouteKind.SpecificRevision:
          const applicationParameters =
            await getApplicationParametersForRevision(
              applicationRoute.applicationId,
              applicationRoute.revisionId,
            );
          setRevisionId(applicationRoute.revisionId.revisionId);
          setApplicationParameters(applicationParameters);
          break;
        default: {
          const exhaustive: never = applicationRoute;
          throw new Error(`Unhandled application route kind: ${exhaustive}`);
        }
      }
    })();
  }, [applicationRoute]);

  function updateRevisionId(newRevisionId: string) {
    if (applicationId == null) {
      throw new Error("Application ID must be set before setting revision");
    }
    if (revisionId === newRevisionId) {
      return;
    }
    const newRoute: Route = {
      kind: RouteKind.Application,
      applicationRoute: {
        kind: ApplicationRouteKind.SpecificRevision,
        applicationId,
        revisionId: { revisionId: newRevisionId },
        tab: "controls",
      },
    };
    const newUrl = serializeRoute(newRoute);
    setLocation(newUrl);
  }

  const pushApplicationParameters =
    applicationId == null
      ? null
      : async function pushApplicationParameters(
          update: (old: ApplicationParameters) => ApplicationParameters,
        ): Promise<void> {
          try {
            if (applicationId == null) {
              // TODO: Can we somehow ensure statically that this function is not called before we have
              // an application ID?
              throw new Error(
                "TODO: This must not be called before we have an application ID",
              );
            }

            let newParameters = update(applicationParameters);
            newParameters.parentRevisionId = revisionId
              ? { revisionId: revisionId }
              : null;
            const newRevisionId = await postApplicationParameters(
              applicationId,
              newParameters,
            );
            setRevisionId(newRevisionId?.revisionId ?? null);
            setApplicationParameters(newParameters);

            if (newRevisionId !== null) {
              updateRevisionId(newRevisionId.revisionId);
              if (newParameters.resumeId === null) {
                setGenerationsWithNoResume(generationsWithNoResume + 1);
              }
            }
          } catch (err) {
            console.error("Error updating application parameters", err);
            setShowError(true);
          }
        };

  return {
    showError,
    setShowError,
    showPlansPopup,
    setShowPlansPopup,
    showHeadshotPopup,
    setShowHeadshotPopup,
    generationsWithNoResume,
    applicationParameters,
    revisionId,
    applicationId,
    updateRevisionId,
    pushApplicationParameters,
  };
}

type ApplicationTitleProps = {
  revisionId: string | null;
};

function ApplicationTitle({ revisionId }: ApplicationTitleProps): JSX.Element {
  const title = useApplicationTitle(revisionId);
  return <h4 style={{ textAlign: "center" }}>{title}</h4>;
}

type ApplicationWizardProps = {
  applicationRoute: ApplicationRoute;
};

export function ApplicationWizard({
  applicationRoute,
}: ApplicationWizardProps): JSX.Element {
  const isMobile = useDeviceType();
  const [activeTab, setActiveTab] = useState<ApplicationTab>(
    responsiveTab(applicationRoute.tab),
  );
  const [, setLocation] = useLocation();

  const {
    showError,
    setShowError,
    showPlansPopup,
    setShowPlansPopup,
    showHeadshotPopup,
    setShowHeadshotPopup,
    generationsWithNoResume,
    applicationParameters,
    revisionId,
    applicationId,
    updateRevisionId,
    pushApplicationParameters,
  } = useApplication(applicationRoute);

  const postUserMessageAndOpenChat =
    applicationId !== null
      ? async function postUserMessageAndOpenChat(message: string) {
          await postUserMessage(applicationId, message);
          onTabChange("chat");
        }
      : null;

  function responsiveTab(tab: ApplicationTab): ApplicationTab {
    if (isMobile && tab === "controls") {
      return "job";
    } else if (
      !isMobile &&
      ["job", "anschreiben", "lebenslauf"].includes(tab)
    ) {
      return "controls";
    } else {
      return tab;
    }
  }

  const onTabChange = (tab: ApplicationTab) => {
    const newTab = responsiveTab(tab);
    const newRoute: Route = {
      kind: RouteKind.Application,
      applicationRoute: {
        ...applicationRoute,
        tab: newTab,
      },
    };
    const newUrl = serializeRoute(newRoute);
    setLocation(newUrl);
    setActiveTab(newTab);
  };

  const mobileTabs: TabItem<ApplicationTab>[] = [
    {
      id: "job",
      title: "Job",
      content: (
        <JobTab
          applicationParameters={applicationParameters}
          pushApplicationParameters={pushApplicationParameters}
          postMessageAndOpenChat={postUserMessageAndOpenChat}
        />
      ),
    },
    {
      id: "anschreiben",
      title: "Anschreiben",
      content: (
        <CoverLetterTab
          revisionId={revisionId}
          applicationParameters={applicationParameters}
          pushApplicationParameters={pushApplicationParameters}
          setShowError={setShowError}
          setShowPlansPopup={setShowPlansPopup}
          mobileLayout={true}
        />
      ),
    },
    {
      id: "lebenslauf",
      title: "Lebenslauf",
      content: (
        <ResumeTab
          revisionId={revisionId}
          pushApplicationParameters={pushApplicationParameters}
          setShowPlansPopup={setShowPlansPopup}
          postMessageAndOpenChat={postUserMessageAndOpenChat}
          applicationParameters={applicationParameters}
        />
      ),
    },
    {
      id: "chat",
      title: "Chat",
      content: applicationId !== null && (
        <div
          style={{
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <ResumeChat
            revisionId={revisionId}
            setRevisionId={updateRevisionId}
            applicationId={applicationId}
            applicationParameters={applicationParameters}
          />
        </div>
      ),
    },
  ];

  const desktopControlTabs: TabItem<ApplicationTab>[] = [
    {
      id: "controls",
      title: "Bewerbung",
      content: (
        <div>
          <JobAdvertControl
            applicationParameters={applicationParameters}
            pushApplicationParameters={pushApplicationParameters}
          />
          <ResumeControl
            applicationParameters={applicationParameters}
            pushApplicationParameters={pushApplicationParameters}
            postMessageAndOpenChat={postUserMessageAndOpenChat}
          />
          <WordCountControl
            applicationParameters={applicationParameters}
            pushApplicationParameters={pushApplicationParameters}
          />
          <LanguageControl
            applicationParameters={applicationParameters}
            pushApplicationParameters={pushApplicationParameters}
          />
          <RegenerateControl
            applicationParameters={applicationParameters}
            pushApplicationParameters={pushApplicationParameters}
          />
          <ImproveResumeControl
            applicationParameters={applicationParameters}
            postMessageAndOpenChat={postUserMessageAndOpenChat}
          />
        </div>
      ),
    },
    {
      id: "chat",
      title: "Chat",
      content: applicationId !== null && (
        <ResumeChat
          revisionId={revisionId}
          setRevisionId={updateRevisionId}
          applicationId={applicationId}
          applicationParameters={applicationParameters}
        />
      ),
    },
  ];

  return (
    <div style={{ paddingTop: 32 }}>
      {!isMobile && <ApplicationTitle revisionId={revisionId} />}
      {showError && (
        <div className="mb-3 alert alert-danger" role="alert">
          Ein Fehler ist aufgetreten. Laden Sie die Seite neu, um fortzufahren.
        </div>
      )}
      {showPlansPopup && (
        <PlansPopup
          onHide={() => setShowPlansPopup(false)}
          title="Nur für Kunden von Bewerbungshelfer Professional"
        />
      )}
      {showHeadshotPopup && (
        <HeadshotPopup onClose={() => setShowHeadshotPopup(false)} />
      )}

      {isMobile ? (
        <div>
          <Tabs
            tabs={mobileTabs}
            activeTab={activeTab}
            onTabChange={onTabChange}
          />
        </div>
      ) : (
        <div style={styles.container}>
          <div style={styles.controlPane}>
            <div style={{ height: "100%" }}>
              <Tabs
                tabs={desktopControlTabs}
                activeTab={activeTab}
                onTabChange={onTabChange}
              />
            </div>
          </div>
          <div style={styles.contentPane}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 64,
              }}
            >
              <div
                style={{
                  paddingBottom: "25mm",
                  ...styles.page,
                }}
              >
                <Joyride
                  steps={noResumeNotification}
                  disableScrolling={true}
                  run={
                    applicationParameters.resumeId === null &&
                    generationsWithNoResume > 2
                  }
                  continuous={true}
                  hideBackButton={true}
                  styles={joyrideStyle}
                  locale={joyrideLocale}
                />
                <CoverLetter
                  revisionId={revisionId}
                  layout={"dualColumn"}
                  setShowError={setShowError}
                  setShowPlansPopup={setShowPlansPopup}
                  pushApplicationParameters={pushApplicationParameters}
                  mobileLayout={false}
                />
              </div>
            </div>

            <DownloadableResume
              revisionId={revisionId}
              pushApplicationParameters={pushApplicationParameters}
              layout="dualColumn"
              setShowPlansPopup={setShowPlansPopup}
            />

            <DownloadableResume
              revisionId={revisionId}
              pushApplicationParameters={pushApplicationParameters}
              layout="singleColumn"
              setShowPlansPopup={setShowPlansPopup}
            />

            <DownloadableResume
              revisionId={revisionId}
              pushApplicationParameters={pushApplicationParameters}
              layout="singleColumnHeadshot"
              setShowPlansPopup={setShowPlansPopup}
            />

            <DownloadableResume
              revisionId={revisionId}
              pushApplicationParameters={pushApplicationParameters}
              layout="german"
              setShowPlansPopup={setShowPlansPopup}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const noResumeNotification: Step[] = [
  {
    target: `.${RESUME_CONTROL_SELECTOR}`,
    content:
      "Um noch bessere Anschreiben zu erhalten, laden Sie Ihren Lebenslauf hoch. So können wir in Ihrem Anschreiben auf Ihre persönliche Stärken und Erfahrungen eingehen.",
    disableBeacon: true,
    placement: "right",
  },
];
