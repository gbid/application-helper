import { useEffect } from "react";

export function getViewportWidth(): number {
  if (typeof window === "undefined") return Infinity;

  if (window.visualViewport) {
    return window.visualViewport.width;
  }

  return document.documentElement.clientWidth;
}

type ViewportListener = () => void;

export function useViewportListener(listener: ViewportListener) {
  useEffect(() => {
    listener();

    // Listen to both visualViewport and window resize
    const visualViewport = window.visualViewport;
    if (visualViewport) {
      visualViewport.addEventListener("resize", listener);
    }
    window.addEventListener("resize", listener);

    return () => {
      if (visualViewport) {
        visualViewport.removeEventListener("resize", listener);
      }
      window.removeEventListener("resize", listener);
    };
  }, [listener]);
}
