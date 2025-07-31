import { useEffect, useState } from "react";
import { Uuid } from "./model";
import { getApplicationTitle } from "./api/application-title";

const DEFAULT_TITLE = "Bewerbung als [Position] bei [Unternehmen]";

export function useApplicationTitle(revisionId: Uuid | null): string {
  const [title, setTitle] = useState<string>(DEFAULT_TITLE);

  useEffect(() => {
    (async function () {
      if (revisionId == null) {
        setTitle(DEFAULT_TITLE);
        return;
      }

      const title: string =
        (await getApplicationTitle({ revisionId: revisionId })) ??
        DEFAULT_TITLE;
      setTitle(title);
    })();
  }, [revisionId]);

  return title;
}
