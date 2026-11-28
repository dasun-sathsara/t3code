import { Platform } from "react-native";

export interface MobileFontFamilies {
  readonly regular: string;
  readonly medium: string;
  readonly bold: string;
}

const SYSTEM_FAMILY = Platform.OS === "ios" ? "System" : "sans-serif";
const SYSTEM_MONO_FAMILY = Platform.OS === "ios" ? "ui-monospace" : "monospace";

// A system family has one name for every weight, so text picks its weight with fontWeight;
// MesloLGS NF does too (app.config.ts maps its weights). Keep bundled names aligned with app.config.ts.
export const MOBILE_FONT_FAMILIES = {
  system: { regular: SYSTEM_FAMILY, medium: SYSTEM_FAMILY, bold: SYSTEM_FAMILY },
  "dm-sans": { regular: "DMSans-Regular", medium: "DMSans-Medium", bold: "DMSans-Bold" },
  "feixen-standard": {
    regular: "FeixenStandard",
    medium: "FeixenStandard-Bold",
    bold: "FeixenStandard-Bold",
  },
} as const satisfies Record<string, MobileFontFamilies>;

export const MOBILE_MONO_FONT_FAMILIES = {
  system: SYSTEM_MONO_FAMILY,
  meslo: "MesloLGS-NF-Regular",
  "geist-standard": "GeistStandard",
} as const;

export type MobileFontId = keyof typeof MOBILE_FONT_FAMILIES;
export type MobileMonoFontId = keyof typeof MOBILE_MONO_FONT_FAMILIES;

export const DEFAULT_MOBILE_FONT_ID: MobileFontId =
  Platform.OS === "android" ? "feixen-standard" : "system";
export const DEFAULT_MOBILE_MONO_FONT_ID: MobileMonoFontId =
  Platform.OS === "android" ? "geist-standard" : "system";

export function isMobileFontId(value: unknown): value is MobileFontId {
  return typeof value === "string" && Object.hasOwn(MOBILE_FONT_FAMILIES, value);
}

export function isMobileMonoFontId(value: unknown): value is MobileMonoFontId {
  return typeof value === "string" && Object.hasOwn(MOBILE_MONO_FONT_FAMILIES, value);
}

export function resolveMobileFontId(value: unknown): MobileFontId {
  return isMobileFontId(value) && (value !== "feixen-standard" || Platform.OS === "android")
    ? value
    : DEFAULT_MOBILE_FONT_ID;
}

export function resolveMobileMonoFontId(value: unknown): MobileMonoFontId {
  return isMobileMonoFontId(value) && (value !== "geist-standard" || Platform.OS === "android")
    ? value
    : DEFAULT_MOBILE_MONO_FONT_ID;
}

export function resolveFontFamilyVariables(
  fontId: MobileFontId,
  monoFontId: MobileMonoFontId,
): Record<string, string> {
  const families = MOBILE_FONT_FAMILIES[fontId];
  return {
    "--font-sans": families.regular,
    "--font-medium": families.medium,
    "--font-bold": families.bold,
    "--font-mono": MOBILE_MONO_FONT_FAMILIES[monoFontId],
  };
}
