import { CoverLetter } from "./cover-letter";
import { InternalPrintRoute, InternalPrintRouteKind } from "./route";
import "./internal-print.css";
import { useEffect, useRef } from "react";
import { getCookie } from "./session-cookie-exists-hook";
import { Resume } from "./resume";
import { HIDE_AT_PAGE_BREAK } from "./styles";
import { MULTI_PAGE } from "./styles";
import { A4_PAGE_HEIGHT_PX } from "./styles";
import { PAGE_CONTAINER_MARGIN_TOP } from "./styles";
import { PAGE_CONTAINER_MARGIN_BOTTOM } from "./styles";
import { PAGE_BREAK_ALWAYS } from "./styles";

function removeSeparators(element: HTMLElement): void {
  const firstChild: Element | undefined = element.children[0];
  const lastChild: Element | undefined =
    element.children[element.children.length - 1];

  if (
    firstChild instanceof HTMLElement &&
    firstChild.className === HIDE_AT_PAGE_BREAK
  ) {
    element.removeChild(firstChild);
  }
  if (
    lastChild instanceof HTMLElement &&
    lastChild.className === HIDE_AT_PAGE_BREAK
  ) {
    element.removeChild(lastChild);
  }
}

function newPageContainer(): HTMLElement {
  const pageContainer = document.createElement("div");
  pageContainer.style.paddingTop = PAGE_CONTAINER_MARGIN_TOP;
  pageContainer.style.paddingBottom = PAGE_CONTAINER_MARGIN_BOTTOM;
  pageContainer.style.pageBreakAfter = PAGE_BREAK_ALWAYS;
  return pageContainer;
}

function segmentIntoPages(multiPageElement: Element): void {
  if (multiPageElement instanceof HTMLElement) {
    multiPageElement.style.marginTop = "0";
    multiPageElement.style.marginBottom = "0";
  }
  const children = Array.from(multiPageElement.children);
  for (const child of children) {
    multiPageElement.removeChild(child);
  }

  let currentPageContainer = null;
  let currentPageContainerMaxHeight = null;
  for (const child of children) {
    if (currentPageContainer == null) {
      currentPageContainer = newPageContainer();
      multiPageElement.appendChild(currentPageContainer);
      const containerTop =
        (currentPageContainer.getBoundingClientRect().top + window.scrollY) %
        A4_PAGE_HEIGHT_PX;
      currentPageContainerMaxHeight = A4_PAGE_HEIGHT_PX - containerTop;
    }

    if (currentPageContainerMaxHeight == null) {
      throw new Error("currentPageContainerMaxHeight must be set");
    }

    currentPageContainer.appendChild(child);
    if (currentPageContainer.offsetHeight <= currentPageContainerMaxHeight) {
      continue;
    }
    currentPageContainer.removeChild(child);
    currentPageContainer.style.height = `${currentPageContainerMaxHeight}px`;
    removeSeparators(currentPageContainer);

    currentPageContainer = newPageContainer();

    multiPageElement.appendChild(currentPageContainer);
    currentPageContainerMaxHeight = A4_PAGE_HEIGHT_PX;

    currentPageContainer.appendChild(child);
  }

  if (currentPageContainer != null) {
    if (currentPageContainerMaxHeight == null) {
      throw new Error("currentPageContainerMaxHeight must be set");
    }
    currentPageContainer.style.height = `${currentPageContainerMaxHeight}px`;
    removeSeparators(currentPageContainer);
  }
}

type InternalPrintProps = {
  internalPrintRoute: InternalPrintRoute;
};

export function InternalPrint({
  internalPrintRoute,
}: InternalPrintProps): JSX.Element {
  // This is a side-effect, so under normal circumstances it should be done in useEffect hook.
  // However, I'm not sure that this effect would necessarily be executed before other useEffect
  // hooks in child components. But we need this here, since those child component effect hooks will
  // fetch data from the server, and for those fetches to succeed, the session cookie must be set
  // in advance.
  const sessionCookie = internalPrintRoute.sessionCookie;
  if (getCookie("internal_session") !== sessionCookie) {
    document.cookie = `internal_session=${sessionCookie}; path=/; secure; SameSite=Strict`;
    document.cookie = `user=Authenticated; path=/; secure; SameSite=Strict`;
  }

  const printRoot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(function () {
      if (printRoot.current == null) {
        throw new Error("Print root must be set");
      }

      for (const multiPageElement of printRoot.current.querySelectorAll(
        `.${MULTI_PAGE}`,
      )) {
        segmentIntoPages(multiPageElement);
      }
    }, 3000);
  }, []);

  const revisionId = internalPrintRoute.revisionId;
  function setShowError(showError: boolean) {
    if (showError === true) {
      throw new Error("Error in internal print route must not occur");
    }
  }
  function setShowPlansPopup(showPlansPopup: boolean) {
    if (showPlansPopup === true) {
      throw new Error("Plans popup in internal print route must not occur");
    }
  }
  const pushApplicationParameters = null;

  const watermarkStylesheet =
    internalPrintRoute.watermark === true ? (
      <link rel="stylesheet" href="/watermark.css" />
    ) : null;

  const contentElement = (function () {
    switch (internalPrintRoute.kind) {
      case InternalPrintRouteKind.CoverLetter: {
        return (
          <CoverLetter
            revisionId={revisionId.revisionId}
            setShowError={setShowError}
            setShowPlansPopup={setShowPlansPopup}
            pushApplicationParameters={pushApplicationParameters}
            layout={"dualColumn"}
            mobileLayout={false}
          />
        );
      }
      case InternalPrintRouteKind.Resume: {
        return (
          <Resume
            revisionId={revisionId.revisionId}
            pushApplicationParameters={pushApplicationParameters}
            layout={internalPrintRoute.layout}
          />
        );
      }
      default: {
        const exhaustive: never = internalPrintRoute;
        throw new Error(`Unhandled: ${exhaustive}`);
      }
    }
  })();

  const printRootStyle: React.CSSProperties = {
    width: "210mm", // The width of A4 paper.
  };

  return (
    <div style={printRootStyle} ref={printRoot}>
      {watermarkStylesheet}
      {contentElement}
    </div>
  );
}
