import { CompanyAddress, RevisionId } from "../model";

export async function getCompanyAddress(
  revisionId: RevisionId,
): Promise<CompanyAddress> {
  const response = await fetch(`/api/company-address/${revisionId.revisionId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch company address");
  }

  return response.json();
}
