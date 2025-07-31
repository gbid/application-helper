import { ResumeId, ResumeInfo } from "../model";

export async function getLatestResume(): Promise<ResumeInfo | null> {
  const response = await fetch("/api/resume/latest", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    if (response.status === 204) {
      return null;
    }
    const resumeData = await response.json();
    return resumeData;
  } else {
    console.error("getLatestResume | failed:", response.statusText);
    throw new Error("Failed to fetch resume:" + response.statusText);
  }
}

export async function getResumeInfo(resumeId: ResumeId): Promise<ResumeInfo> {
  const response = await fetch(`/api/resume/${resumeId.resumeId}`, {
    method: "HEAD",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch resume info:" + response.statusText);
  }

  const contentDisposition = response.headers.get("Content-Disposition");
  if (!contentDisposition) {
    throw new Error("Missing Content-Disposition header");
  }

  const filenameMatch = contentDisposition.match(/filename="(.+)"/);
  if (!filenameMatch || !filenameMatch[1]) {
    throw new Error("Invalid Content-Disposition header");
  }
  const fileName = filenameMatch[1];

  const lastModifiedString = response.headers.get("Last-Modified");
  if (!lastModifiedString) {
    throw new Error("Missing Last-Modified header");
  }
  const createdAt = new Date(lastModifiedString);

  return { fileName, createdAt };
}

export function resumeUrl(resumeId: ResumeId): string {
  return `/api/resume/${resumeId.resumeId}`;
}

export async function postResume(file: File): Promise<ResumeId> {
  const formData = new FormData();
  formData.append("resume", file);
  const response = await fetch("/api/resume", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload resume:" + response.statusText);
  }

  return await response.json();
}
