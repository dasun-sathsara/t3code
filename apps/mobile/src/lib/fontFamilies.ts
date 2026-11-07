// Custom fonts: Feixen Standard (text/UI) and Geist Standard (code), per
// playground/custom-fonts. Android resolves weights inside one family and
// the bold file is the appropriate 500 replacement (no medium cut exists).
// Inline code sits at 0.9em of the surrounding text; markdown styles
// already apply that scale.
export const FONT_FAMILIES = {
  regular: "FeixenStandard",
  medium: "FeixenStandard",
  bold: "FeixenStandard",
} as const;

export const CODE_FONT_FAMILIES = {
  regular: "GeistStandard",
  bold: "GeistStandard",
} as const;

export const CODE_FONT_FAMILY = CODE_FONT_FAMILIES.regular;
