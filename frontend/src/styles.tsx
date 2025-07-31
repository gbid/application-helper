export const MOBILE_WIDTH_THRESHOLD: number = 768;

export type ResumeCssClass = "hide-at-page-break" | "no-print" | "multi-page";

export const HIDE_AT_PAGE_BREAK: ResumeCssClass = "hide-at-page-break";
export const NO_PRINT: ResumeCssClass = "no-print";
export const MULTI_PAGE: ResumeCssClass = "multi-page";

// constants for internal print of resumes
export const PAGE_CONTAINER_MARGIN_TOP_PX = 48;
// this is less than our to margin currently,
// because we tend to have too much space at the bottom of the page.
// This is because we are quite conservative with splitting stuff across pages.
export const PAGE_CONTAINER_MARGIN_BOTTOM_PX = 32;
export const PAGE_CONTAINER_MARGIN_TOP = `${PAGE_CONTAINER_MARGIN_TOP_PX}px`;
export const PAGE_CONTAINER_MARGIN_BOTTOM = `${PAGE_CONTAINER_MARGIN_BOTTOM_PX}px`;
export const A4_PAGE_HEIGHT_PX = 1122;
export const A4_PAGE_HEIGHT_INNER_PX =
  A4_PAGE_HEIGHT_PX -
  PAGE_CONTAINER_MARGIN_TOP_PX -
  PAGE_CONTAINER_MARGIN_BOTTOM_PX;
export const PAGE_BREAK_ALWAYS = "always";

export const colorPrimary = "#1a1a1a";
export const colorPrimaryHover = "#333333";
export const colorDisabled = "#cccccc";
export const colorError = "#dc3545";
export const colorErrorBg = "rgba(220, 53, 69, 0.1)";
export const colorSuccess = "rgba(144, 238, 144, 0.2)";
export const colorWarning = "rgba(255, 182, 193, 0.2)";
export const colorText = "#333333";
export const colorTextSecondary = "#666666";
export const colorBorder = "#eeeeee";
export const colorBackground = "#fafafa";

export const spacing = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "2rem 1rem",
  },
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "12px",
  },
  gap: {
    small: "0.5rem",
    medium: "1rem",
    large: "2rem",
  },
};

export const styleConstants = {
  fontSize: {
    small: "10px",
    normal: "12px",
    large: "14px",
    XLarge: "18px",
    XXLarge: "24px",
    XXXLargePx: 36,
    XXXXLargePx: 48,
  },
  spacing: {
    small: "8px",
    normal: "16px",
    normalLarge: "24px",
    normalLargePx: 24,
    large: "32px",
    extraLarge: "48px",
  },
  fontWeight: {
    normal: 400,
    bold: 500,
  },
  letterSpacing: {
    normal: "0.66666px",
    wide: "3px",
    extraWide: "4px",
    superWide: "8px",
  },
  lineHeight: 1.666666,
  colors: {
    primary: "#000",
    secondary: "#F8F3EF",
  },
};
