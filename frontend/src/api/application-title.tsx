import { RevisionId } from "../model";

export async function getApplicationTitle(
  revisionId: RevisionId,
): Promise<string | null> {
  const response = await fetch(
    `/api/application-title/${revisionId.revisionId}`,
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}
