import React, { useRef, useState, useEffect } from "react";
import beforeImage1 from "./media/split_images/01_before.webp";
import beforeImage2 from "./media/split_images/02_before.webp";
import beforeImage3 from "./media/split_images/03_before.webp";
import beforeImage4 from "./media/split_images/04_before.webp";
import beforeImage5 from "./media/split_images/05_before.webp";
import beforeImage6 from "./media/split_images/06_before.webp";
import beforeImage7 from "./media/split_images/07_before.webp";
import beforeImage8 from "./media/split_images/08_before.webp";
import beforeImage9 from "./media/split_images/09_before.webp";
import beforeImage10 from "./media/split_images/10_before.webp";
import beforeImage11 from "./media/split_images/11_before.webp";
import beforeImage12 from "./media/split_images/12_before.webp";
import beforeImage13 from "./media/split_images/13_before.webp";
import beforeImage14 from "./media/split_images/14_before.webp";
import beforeImage15 from "./media/split_images/15_before.webp";

import afterImage1 from "./media/split_images/01_after.webp";
import afterImage2 from "./media/split_images/02_after.webp";
import afterImage3 from "./media/split_images/03_after.webp";
import afterImage4 from "./media/split_images/04_after.webp";
import afterImage5 from "./media/split_images/05_after.webp";
import afterImage6 from "./media/split_images/06_after.webp";
import afterImage7 from "./media/split_images/07_after.webp";
import afterImage8 from "./media/split_images/08_after.webp";
import afterImage9 from "./media/split_images/09_after.webp";
import afterImage10 from "./media/split_images/10_after.webp";
import afterImage11 from "./media/split_images/11_after.webp";
import afterImage12 from "./media/split_images/12_after.webp";
import afterImage13 from "./media/split_images/13_after.webp";
import afterImage14 from "./media/split_images/14_after.webp";
import afterImage15 from "./media/split_images/15_after.webp";

type BeforeAfterPair = {
  before: string;
  after: string;
};

const beforeAfterPairs: BeforeAfterPair[] = [
  { before: beforeImage13, after: afterImage13 },
  { before: beforeImage4, after: afterImage4 },
  { before: beforeImage11, after: afterImage11 },
  { before: beforeImage7, after: afterImage7 },
  { before: beforeImage9, after: afterImage9 },
  { before: beforeImage3, after: afterImage3 },
  { before: beforeImage8, after: afterImage8 },
  { before: beforeImage6, after: afterImage6 },
  { before: beforeImage10, after: afterImage10 },
  { before: beforeImage14, after: afterImage14 },
  { before: beforeImage1, after: afterImage1 },
  { before: beforeImage12, after: afterImage12 },
  { before: beforeImage2, after: afterImage2 },
  { before: beforeImage5, after: afterImage5 },
  { before: beforeImage15, after: afterImage15 },
];

export function TransformingHeadshots() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRefs = useRef<React.RefObject<HTMLDivElement>[]>(
    beforeAfterPairs.map(() => React.createRef<HTMLDivElement>()),
  );
  const IMAGE_WIDTH = 350; // Fixed width for images
  const SPACING = IMAGE_WIDTH * 1.5; // Fixed space between images
  const STRIDE = IMAGE_WIDTH + SPACING; // Total space for one image
  const MIN_IMAGES_IN_VIEW = 4; // Minimum images to show in animation cycle
  const CYCLE_WIDTH = STRIDE * MIN_IMAGES_IN_VIEW; // Fixed width for animation cycle
  const SPEED = 100; // pixels per second

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const animations: Animation[] = [];
    const updateAnimations = () => {
      animations.forEach((a) => a.cancel());
      animations.length = 0;

      // Fixed duration based on CYCLE_WIDTH
      const duration = (CYCLE_WIDTH / SPEED) * 1000;

      beforeAfterPairs.forEach((_, index) => {
        const element = elementRefs.current[index].current;
        if (!element) return;

        // Evenly space delays through the complete cycle
        const delay = -(duration / beforeAfterPairs.length) * index;

        const animation = element.animate(
          [
            { transform: `translate(${-IMAGE_WIDTH}px, -50%)` },
            { transform: `translate(${CYCLE_WIDTH}px, -50%)` },
          ],
          {
            duration,
            iterations: Infinity,
            easing: "linear",
            delay,
          },
        );

        animations.push(animation);
      });
    };

    updateAnimations();

    const resizeObserver = new ResizeObserver(() => {
      updateAnimations();
    });
    resizeObserver.observe(container);

    return () => {
      animations.forEach((a) => a.cancel());
      resizeObserver.disconnect();
    };
  }, [CYCLE_WIDTH]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height: "300px",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#f8f4ee",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: "8px",
          backgroundColor: "#000",
          transform: "translateX(-50%)",
          zIndex: 2,
        }}
      />

      {beforeAfterPairs.map((pair, index) => (
        <div
          key={index}
          ref={elementRefs.current[index]}
          style={{
            position: "absolute",
            top: "50%",
            zIndex: 1,
          }}
        >
          <ImageTransition
            pair={pair}
            elementRef={elementRefs.current[index]}
            containerRef={containerRef}
          />
        </div>
      ))}
    </div>
  );
}

function ImageTransition({
  pair,
  elementRef,
  containerRef,
}: {
  pair: BeforeAfterPair;
  elementRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const [clipPosition, setClipPosition] = useState(0);

  useEffect(() => {
    if (!elementRef.current || !containerRef.current) return;

    const updateClipPosition = () => {
      const container = containerRef.current;
      const element = elementRef.current;
      if (!container || !element) return;

      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      // Calculate center points
      const containerCenter = containerRect.left + containerRect.width / 2;
      const elementLeft = elementRect.left;
      const elementWidth = elementRect.width;

      // Calculate how far the left edge of the image is from the center line
      const distanceFromCenter =
        elementLeft + elementWidth / 2 - containerCenter;

      // Normalize to create a smooth transition over the image width
      const clipPos = Math.max(
        0,
        Math.min(1, (distanceFromCenter + elementWidth / 2) / elementWidth),
      );

      setClipPosition(clipPos);
    };

    const frame = requestAnimationFrame(function animate() {
      updateClipPosition();
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(frame);
  }, [containerRef, elementRef]);

  return (
    <div
      style={{
        position: "relative",
        width: "225px",
        height: "253px",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <img
        src={pair.before}
        alt="Before headshot"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          clipPath: `inset(0 ${clipPosition * 100}% 0 0)`,
        }}
      />
      <img
        src={pair.after}
        alt="After headshot"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          clipPath: `inset(0 0 0 ${(1 - clipPosition) * 100}%)`,
        }}
      />
    </div>
  );
}
