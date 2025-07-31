import { RevisionId } from "../../../backend/cover-letter/bindings/RevisionId";
import { ApplicationId } from "../../../backend/cover-letter/bindings/ApplicationId";

export function urlGetChatResponse(
  applicationId: ApplicationId,
  revisionId: RevisionId | null,
): string {
  const baseUrl = `/api/chat/${applicationId.applicationId}`;
  if (revisionId === null) {
    return baseUrl;
  } else {
    return `${baseUrl}/${revisionId.revisionId}`;
  }
}

export async function postUserMessage(
  applicationId: ApplicationId,
  message: string,
): Promise<void> {
  const url = `/api/chat/${applicationId.applicationId}`;
  const payload = JSON.stringify(message);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  });

  if (!response.ok) {
    throw new Error(
      `Failed to post user message: ${response.status} ${response.statusText}`,
    );
  }
}
