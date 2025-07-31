import { useState } from "react";
import { MOBILE_WIDTH_THRESHOLD } from "./styles";
import { getViewportWidth, useViewportListener } from "./use-viewport";

export function useDeviceType(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => getViewportWidth() <= MOBILE_WIDTH_THRESHOLD,
  );

  useViewportListener(() => {
    const width = getViewportWidth();
    setIsMobile(width <= MOBILE_WIDTH_THRESHOLD);
  });

  return isMobile;
}
