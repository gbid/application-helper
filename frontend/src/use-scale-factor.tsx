import { useState } from "react";
import { getViewportWidth, useViewportListener } from "./use-viewport";

export function useScaleFactor() {
  const [scaleFactor, setScaleFactor] = useState(() => {
    const viewportWidth = getViewportWidth();
    const padding = 0;
    const containerWidth = viewportWidth - padding;
    const a4WidthPx = 210 * 3.78;
    return Math.min(1, containerWidth / a4WidthPx);
  });

  useViewportListener(() => {
    const viewportWidth = getViewportWidth();
    const padding = 0;
    const containerWidth = viewportWidth - padding;
    const a4WidthPx = 210 * 3.78;
    const scale = Math.min(1, containerWidth / a4WidthPx);

    setScaleFactor(scale);
  });

  return scaleFactor;
}
