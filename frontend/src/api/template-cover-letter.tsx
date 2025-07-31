import { TemplateCoverLetter, TemplateCoverLetterContent } from "../model";

export async function getLatestTemplateCoverLetter(): Promise<TemplateCoverLetter> {
  const response = await fetch("/api/template-cover-letter/latest", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const templateCoverLetter: TemplateCoverLetter = await response.json();
    return templateCoverLetter;
  } else {
    throw new Error(
      "Failed to fetch template cover letter:" + response.statusText,
    );
  }
}

export async function postTemplateCoverLetter(
  templateCoverLetterContent: TemplateCoverLetterContent,
): Promise<TemplateCoverLetter> {
  const response = await fetch("/api/template-cover-letter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(templateCoverLetterContent),
  });

  if (!response.ok) {
    throw new Error(
      "Failed to post template cover letter:" + response.statusText,
    );
  }

  return await response.json();
}
