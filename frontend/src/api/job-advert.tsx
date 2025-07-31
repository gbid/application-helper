import { JobId } from "../model";

export async function postJobAdvert(jobAdvert: string): Promise<JobId> {
  const response = await fetch("/api/job-advert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ jobAdvert: jobAdvert }),
  });

  if (!response.ok) {
    throw new Error("Failed to upload resume:" + response.statusText);
  }

  return await response.json();
}
