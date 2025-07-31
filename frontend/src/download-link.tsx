import { Uuid } from "./model";
import { pdfCoverLetterUrl, pdfResumeUrl } from "./api/pdf-cover-letter";
import { ResumeLayout } from "../../backend/cover-letter/bindings/ResumeLayout";

export enum DownloadLinkTarget {
  CoverLetter,
  Resume,
}

export type DownloadLinkProps = {
  revisionId: Uuid | null;
  layout: ResumeLayout;
  target: DownloadLinkTarget;
  setShowPlansPopup: (show: boolean) => void;
};

export function DownloadLink({
  revisionId,
  layout,
  target,
  setShowPlansPopup,
}: DownloadLinkProps): JSX.Element | null {
  if (revisionId == null) {
    return null;
  }

  const className = "btn btn-dark no-print";
  const style: React.CSSProperties = {
    textDecoration: "none",
    fontSize: "1.5em",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
  };

  const linkChildren = (
    <>
      <i className="bi bi-download"></i> Download
    </>
  );

  const targetUrl = (() => {
    switch (target) {
      case DownloadLinkTarget.CoverLetter:
        return pdfCoverLetterUrl({ revisionId: revisionId });
      case DownloadLinkTarget.Resume:
        return pdfResumeUrl({ revisionId: revisionId }, layout);
      default: {
        const exhaustive: never = target;
        throw new Error(`Unhandled target: ${exhaustive}`);
      }
    }
  })();

  const onClick = async () => {
    window.location.href = targetUrl;
  };

  return (
    <button className={className} style={style} onClick={onClick}>
      {linkChildren}
    </button>
  );
}
