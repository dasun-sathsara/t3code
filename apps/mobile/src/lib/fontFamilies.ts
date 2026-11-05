// Custom fonts: Feixen Standard (text/UI) and Geist Standard (code).
// Feixen has no dedicated medium cut (design weights 380/510). The Bold
// cut at design weight 510 is the appropriate medium (500) replacement.
// Inline code sits at 0.9em of the surrounding text; markdown styles
// already apply that scale.
export const FONT_FAMILIES = {
  regular: "FeixenStandard-Regular",
  medium: "FeixenStandard-Bold",
  bold: "FeixenStandard-Bold",
} as const;

export const CODE_FONT_FAMILIES = {
  regular: "GeistStandard-Regular",
  bold: "GeistStandard-Bold",
} as const;

export const CODE_FONT_FAMILY = CODE_FONT_FAMILIES.regular;
