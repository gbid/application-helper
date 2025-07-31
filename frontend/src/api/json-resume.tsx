import { JsonResume } from "../../../backend/cover-letter/bindings/JsonResume";
import { RevisionId } from "../../../backend/cover-letter/bindings/RevisionId";

export async function getJsonResume(
  revisionId: RevisionId,
): Promise<JsonResume | null> {
  const response = await fetch(`/api/json-resume/${revisionId.revisionId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch json resume:" + response.statusText);
  }

  return await response.json();
}
