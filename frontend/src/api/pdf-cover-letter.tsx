import { RevisionId } from "../model";
import { ResumeLayout } from "../../../backend/cover-letter/bindings/ResumeLayout";

export function pdfCoverLetterUrl(revisionId: RevisionId): string {
  return `/api/pdf-cover-letter/${revisionId.revisionId}`;
}

export function pdfResumeUrl(
  revisionId: RevisionId,
  layout: ResumeLayout,
): string {
  return `/api/pdf-resume/${revisionId.revisionId}/${layout}`;
}
