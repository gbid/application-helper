import { ApplicantAddress, RevisionId } from "../model";

export async function getApplicantAddress(
  revisionId: RevisionId,
): Promise<ApplicantAddress> {
  const response = await fetch(
    `/api/applicant-address/${revisionId.revisionId}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch applicant address");
  }

  return response.json();
}
