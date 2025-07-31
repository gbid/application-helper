import { useEffect, useState, useCallback } from "react";
import { LetterHead } from "./letter-head";
import { ApplicationParameters } from "../../backend/cover-letter/bindings/ApplicationParameters";
import { DownloadLink, DownloadLinkTarget } from "./download-link";
import { TierOverview, TierKind } from "./plans";
import { ResumeLayout } from "../../backend/cover-letter/bindings/ResumeLayout";
import { CoverLetterError } from "../../backend/cover-letter/bindings/CoverLetterError";
import { useSse, OtherError } from "./api/server-sent-events";
import { urlGetCoverLetter } from "./api/cover-letter";
import { UserType } from "../../backend/cover-letter/bindings/UserType";
import { getUserType } from "./api/user";

type CoverLetterProps = {
  revisionId: string | null;
  setShowError: (show: boolean) => void;
  layout: ResumeLayout;
  setShowPlansPopup: (show: boolean) => void;
  pushApplicationParameters:
    | null
    | ((update: (old: ApplicationParameters) => ApplicationParameters) => void);
  mobileLayout: boolean;
};

const fadeOutStyle: React.CSSProperties = {
  content: "''",
  width: "100%",
  height: "100%",
  position: "absolute",
  left: 0,
  top: 0,
  background: "linear-gradient(transparent 0, white)",
};

function useCoverLetter(
  revisionId: string | null,
  pushApplicationParameters: CoverLetterProps["pushApplicationParameters"],
  setShowError: (show: boolean) => void,
) {
  const [coverLetterText, setCoverLetterText] = useState<string>("");
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);

  const url = revisionId !== null ? urlGetCoverLetter({ revisionId }) : null;
  const { fetchInProgress, events } = useSse<
    string,
    CoverLetterError | OtherError
  >(url, false);

  const handleError = useCallback(
    (error: CoverLetterError | OtherError) => {
      switch (error.kind) {
        case "notFound": {
          console.error("Cover letter not found");
          setShowError(true);
          break;
        }
        case "tooManyAnonymousRequests": {
          console.error("Too many requests without subscribed user");
          setIsRateLimited(true);
          break;
        }
        case "generationFailed":
        case "other": {
          setShowError(true);
          break;
        }
        case "neitherJobAdvertNorResumeSpecified": {
          break;
        }
      }
    },
    [setShowError],
  );

  useEffect(() => {
    if (events == null) {
      return;
    }

    (async () => {
      const newCoverLetterText: { value: string } = { value: "" };
      for await (const event of events) {
        switch (event.kind) {
          case "ok": {
            newCoverLetterText.value += event.data;
            setCoverLetterText((prevText) => {
              if (prevText.startsWith(newCoverLetterText.value)) {
                return prevText;
              } else {
                return newCoverLetterText.value;
              }
            });
            break;
          }
          case "err": {
            handleError(event.error);
            return;
          }
        }
      }
      setIsRateLimited(false);
    })();
    // For some reason we need to add the revisionId here to the dependencies
    // to make the component fetch the new cover letter when the revisionId changes.
    // I observed this behaviour when using the browsers back/forward buttons
    // to go back and forth between revisions.
    // TODO: Probably, we messed something up with the useSse hook
    // which we should fix once we have time.
  }, [events, handleError, revisionId]);

  return {
    coverLetterText,
    setCoverLetterText,
    isRateLimited,
    fetchInProgress,
  };
}

function RateLimitingInfo() {
  const [userType, setUserType] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUserType = async () => {
      const userType = await getUserType();
      setUserType(userType);
    };
    fetchUserType();
  }, []);

  const freeTier = (
    <TierOverview
      tierKind={TierKind.Free}
      displayMode="page"
      userType={userType}
      title={"Kostenlos registrieren um fortzufahren"}
      targetRoute={null}
    />
  );

  let professionalTier = (
    <TierOverview
      tierKind={TierKind.Professional}
      displayMode="page"
      userType={userType}
      title={"Weiter mit Bewerbungshelfer Professional"}
      targetRoute={null}
    />
  );

  let displayedTiers;
  switch (userType) {
    case "anonymous":
    case null:
      displayedTiers = [freeTier, professionalTier];
      break;
    case "standard":
      displayedTiers = [professionalTier];
      break;
    case "subscribed":
      throw new Error("User type subscribed should not be rate limited");
    default: {
      const exhaustive: never = userType;
      throw new Error(`Unhandled: ${exhaustive}`);
    }
  }

  return (
    <div
      style={{
        paddingTop: "32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}
    >
      {displayedTiers}
    </div>
  );
}

export function CoverLetter({
  revisionId,
  layout = "dualColumn",
  setShowError,
  setShowPlansPopup,
  pushApplicationParameters,
  mobileLayout,
}: CoverLetterProps): JSX.Element {
  const {
    coverLetterText,
    isRateLimited,
    setCoverLetterText,
    // TODO: do we want to indicate that the fetch is in progress?
    // fetchInProgress,
  } = useCoverLetter(revisionId, pushApplicationParameters, setShowError);

  const parentStyle: React.CSSProperties = {
    paddingLeft: mobileLayout ? "8px" : "25mm",
    paddingRight: mobileLayout ? "8px" : "25mm",
    position: "relative",
    width: "100%",
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const newText = event.currentTarget.innerText;
    if (newText !== coverLetterText) {
      setCoverLetterText(newText);
      if (pushApplicationParameters) {
        pushApplicationParameters((old) => ({
          ...old,
          coverLetterText: newText,
        }));
      }
    }
  };

  const coverLetterLines = coverLetterText.split("\n");
  return (
    <>
      <div style={{ fontFamily: "'Montserrat', sans-serif" }}>
        {!mobileLayout && (
          <LetterHead
            revisionId={revisionId}
            setShowError={setShowError}
            pushApplicationParameters={pushApplicationParameters}
            mobileLayout={mobileLayout}
          />
        )}
        <div style={{ height: 32 }}></div>
        <div style={parentStyle}>
          <div
            className="multi-page"
            contentEditable={true}
            suppressContentEditableWarning={true}
            onBlur={handleBlur}
          >
            {isRateLimited && <div style={fadeOutStyle}></div>}
            {coverLetterLines.flatMap((line, index) => {
              if (line === "") {
                return [];
              } else {
                return [<p key={index}>{line}</p>];
              }
            })}
            {
              // TODO: Uncomment this when we have tweaked the size properly.
              // revisionId != null && (
              // 	<img
              // 		src={`/api/signature/${revisionId}`}
              // 		alt=""
              // 		className="portrait"
              // 		style={{
              // 			width: "30mm",
              // 			height: "auto",
              // 		}}
              // 	/>
              // )
            }
          </div>
        </div>
      </div>
      {isRateLimited && <RateLimitingInfo />}
      {!isRateLimited && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <DownloadLink
            revisionId={revisionId}
            layout={layout}
            target={DownloadLinkTarget.CoverLetter}
            setShowPlansPopup={setShowPlansPopup}
          />
        </div>
      )}
    </>
  );
}
