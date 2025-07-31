import { RevisionId } from "../model";

export function urlGetCoverLetter(revisionId: RevisionId): string {
  return `/api/cover-letter/${revisionId.revisionId}`;
}
