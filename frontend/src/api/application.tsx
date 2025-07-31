import { ApplicationId } from "../../../backend/cover-letter/bindings/ApplicationId";
import { ApplicationIdAndTitle } from "../../../backend/cover-letter/bindings/ApplicationIdAndTitle";
import { ApplicationParameters } from "../../../backend/cover-letter/bindings/ApplicationParameters";
import { Revision } from "../../../backend/cover-letter/bindings/Revision";
import { RevisionId } from "../../../backend/cover-letter/bindings/RevisionId";

export async function getApplications(): Promise<ApplicationIdAndTitle[]> {
  const response = await fetch("/api/application");
  if (!response.ok) {
    throw new Error("Failed to fetch applications:" + response.statusText);
  }

  return await response.json();
}

export async function postApplication(): Promise<ApplicationId> {
  const response = await fetch(`/api/application`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to post application:" + response.statusText);
  }

  return await response.json();
}

export async function getApplicationParameters(
  applicationId: ApplicationId,
): Promise<Revision> {
  const response = await fetch(
    `/api/application/${applicationId.applicationId}/parameters`,
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch application parameters:" + response.statusText,
    );
  }

  return await response.json();
}

export async function getApplicationParametersForRevision(
  applicationId: ApplicationId,
  revisionId: RevisionId,
): Promise<ApplicationParameters> {
  const response = await fetch(
    `/api/application/${applicationId.applicationId}/parameters/revision/${revisionId.revisionId}`,
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch application parameters:" + response.statusText,
    );
  }

  return await response.json();
}

export async function postApplicationParameters(
  applicationId: ApplicationId,
  parameters: ApplicationParameters,
): Promise<RevisionId | null> {
  const response = await fetch(
    `/api/application/${applicationId.applicationId}/parameters`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parameters),
    },
  );

  if (!response.ok) {
    console.error("getApplications | Failed to fetch applications:", response);
    throw new Error("Failed to fetch applications:" + response.statusText);
  }

  return response.json();
}
