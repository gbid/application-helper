import { HeadshotId } from "../../../backend/cover-letter/bindings/HeadshotId";

const HEADSHOT_ROOT = "/api/headshot";
export function headshotUrl(revisionId: string) {
  return `${HEADSHOT_ROOT}/${revisionId}`;
}

export async function postHeadshot(file: File): Promise<HeadshotId> {
  const formData = new FormData();
  formData.append("headshot", file);

  const response = await fetch(HEADSHOT_ROOT, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload headshot: ${response.statusText}`);
  }

  return response.json();
}
