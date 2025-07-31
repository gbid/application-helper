import React, { useRef, useEffect, useState, ReactNode } from "react";

interface AdjustableFontSizeContainerProps {
  children: ReactNode;
  maxFontSize?: number;
  minFontSize?: number;
}

export function AdjustableFontSizeContainer({
  children,
  maxFontSize = 40,
  minFontSize = 10,
}: AdjustableFontSizeContainerProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [fontSize, setFontSize] = useState<number>(maxFontSize);

  useEffect(
    function adjustFontSizeEffect() {
      function adjustFontSize(): void {
        if (!containerRef.current) return;

        const container: HTMLDivElement = containerRef.current;
        const maxWidth: number = container.offsetWidth;
        let newFontSize: number = maxFontSize;

        container.style.fontSize = `${newFontSize}px`;

        while (container.scrollWidth > maxWidth && newFontSize > minFontSize) {
          newFontSize -= 1;
          container.style.fontSize = `${newFontSize}px`;
        }

        setFontSize(newFontSize);
      }

      adjustFontSize();
      window.addEventListener("resize", adjustFontSize);

      return function cleanupListener(): void {
        window.removeEventListener("resize", adjustFontSize);
      };
    },
    [children, maxFontSize, minFontSize],
  );

  return (
    <div ref={containerRef} style={{ fontSize: `${fontSize}px` }}>
      {children}
    </div>
  );
}
