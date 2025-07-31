import React, { useEffect, useState, useCallback } from "react";
import { getJsonResume } from "./api/json-resume";
import { ApplicationParameters } from "../../backend/cover-letter/bindings/ApplicationParameters";
import { JsonResume } from "../../backend/cover-letter/bindings/JsonResume";
import { ResumeLayout } from "../../backend/cover-letter/bindings/ResumeLayout";
import { Spinner } from "./spinner";
import { DualColumnResume } from "./dual-column-resume";
import { SingleColumnResumeHeadshot } from "./single-column-resume-headshot";
import { SingleColumnResume } from "./single-column-resume";
import { GermanResume } from "./german-resume";
import { useJsonResume } from "./useJsonResume";

type ResumeProps = {
  revisionId: string | null;
  pushApplicationParameters:
    | null
    | ((update: (old: ApplicationParameters) => ApplicationParameters) => void);
  layout: ResumeLayout;
};

export function Resume({
  revisionId,
  pushApplicationParameters,
  layout,
}: ResumeProps): JSX.Element | null {
  const [jsonResume, setJsonResume] = useState<JsonResume | null>(null);
  const [loading, setLoading] = useState(false);

  const setAndPushJsonResume = useCallback(
    function setAndPushJsonResume(newJsonResume: JsonResume): void {
      setJsonResume(newJsonResume);
      if (pushApplicationParameters !== null) {
        pushApplicationParameters((old: ApplicationParameters) => ({
          ...old,
          jsonResume: newJsonResume,
        }));
      }
    },
    [setJsonResume, pushApplicationParameters],
  );

  useEffect(() => {
    (async function () {
      if (revisionId != null) {
        setLoading(true);
        try {
          const jsonResume = await getJsonResume({ revisionId });
          setJsonResume(jsonResume);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [revisionId, setAndPushJsonResume]);

  if (loading) {
    return <Spinner />;
  } else if (jsonResume == null) {
    return null;
  }

  return (
    <ResumeInner
      jsonResume={jsonResume}
      setJsonResume={setAndPushJsonResume}
      revisionId={revisionId}
      layout={layout}
      pushApplicationParameters={pushApplicationParameters}
    />
  );
}

type ResumeInnerProps = {
  jsonResume: JsonResume;
  setJsonResume: (newJsonResume: JsonResume) => void;
  revisionId: string | null;
  pushApplicationParameters:
    | null
    | ((update: (old: ApplicationParameters) => ApplicationParameters) => void);
  layout: ResumeLayout;
};

function ResumeInner({
  jsonResume,
  setJsonResume,
  revisionId,
  pushApplicationParameters,
  layout,
}: ResumeInnerProps): JSX.Element | null {
  const jsonResumeCallbacks = useJsonResume(jsonResume, setJsonResume);

  switch (layout) {
    case "dualColumn":
      return (
        <DualColumnResume
          jsonResume={jsonResume}
          jsonResumeCallbacks={jsonResumeCallbacks}
          revisionId={revisionId}
          pushApplicationParameters={pushApplicationParameters}
        />
      );
    case "singleColumnHeadshot":
      return (
        <SingleColumnResumeHeadshot
          jsonResume={jsonResume}
          jsonResumeCallbacks={jsonResumeCallbacks}
          revisionId={revisionId}
          pushApplicationParameters={pushApplicationParameters}
        />
      );
    case "singleColumn":
      return (
        <SingleColumnResume
          jsonResume={jsonResume}
          jsonResumeCallbacks={jsonResumeCallbacks}
          revisionId={revisionId}
          pushApplicationParameters={pushApplicationParameters}
        />
      );
    case "german":
      return (
        <GermanResume
          jsonResume={jsonResume}
          jsonResumeCallbacks={jsonResumeCallbacks}
          revisionId={revisionId}
          pushApplicationParameters={pushApplicationParameters}
        />
      );
    default: {
      const exhaustive: never = layout;
      throw new Error(`Unhandled layout: ${exhaustive}`);
    }
  }
}
