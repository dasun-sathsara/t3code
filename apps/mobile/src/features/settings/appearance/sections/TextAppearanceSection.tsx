import { msg, useGT, useMessages } from "gt-react-native";
import { Platform } from "react-native";

import { Menu } from "../../../../components/ui/Menu";
import type { MobileFontId, MobileMonoFontId } from "../../../../lib/fontFamilies";
import {
  BASE_FONT_SIZE_STEP,
  MAX_BASE_FONT_SIZE,
  MIN_BASE_FONT_SIZE,
} from "../../../../lib/appearancePreferences";
import { SettingsRow } from "../../components/SettingsRow";
import { SettingsSection } from "../../components/SettingsSection";
import { useAppearancePreferences } from "../AppearancePreferencesProvider";
import {
  AppearancePreviewSeparator,
  TextAppearancePreview,
} from "../components/AppearancePreviews";
import { FontSizeSliderRow } from "../components/FontSizeSliderRow";
import { SettingsSwitchRow } from "../../components/SettingsSwitchRow";

interface FontChoice<Id extends string> {
  readonly id: Id;
  readonly label: string;
  /** A typeface name, or a message for detail copy. */
  readonly detail?: string;
}

const FONT_CHOICES: Array<FontChoice<MobileFontId>> = [
  {
    id: "system",
    label: msg("System", { $context: "font choice: the device's own system font" }),
    // oxlint-disable-next-line t3code/no-untranslated-copy -- typeface names are not translated
    detail: Platform.OS === "ios" ? "SF Pro" : "Roboto",
  },
  { id: "dm-sans", label: msg("DM Sans", { $context: "font choice: the DM Sans typeface name" }) },
];
if (Platform.OS === "android") {
  FONT_CHOICES.push({
    id: "feixen-standard",
    label: msg("Feixen Standard", { $context: "font choice: the Feixen Standard typeface name" }),
  });
}

const MONO_FONT_CHOICES: Array<FontChoice<MobileMonoFontId>> = [
  {
    id: "system",
    label: msg("System", { $context: "font choice: the device's own system font" }),
    detail: Platform.OS === "ios" ? "SF Mono" : undefined,
  },
  {
    id: "meslo",
    label: msg("MesloLGS NF", { $context: "font choice: the MesloLGS NF typeface name" }),
    detail: msg("Includes Nerd Font symbols", {
      $context: "font choice detail: the font has terminal prompt icons",
    }),
  },
];

if (Platform.OS === "android") {
  MONO_FONT_CHOICES.push({
    id: "geist-standard",
    label: msg("Geist Standard", { $context: "font choice: the Geist Standard typeface name" }),
  });
}

function FontMenuRow<Id extends string>(props: {
  readonly disabled: boolean;
  readonly icon: "textformat" | "chevron.left.forwardslash.chevron.right";
  readonly label: string;
  readonly choices: ReadonlyArray<FontChoice<Id>>;
  readonly selected: Id;
  readonly onSelect: (id: Id) => void;
}) {
  const m = useMessages();
  const selected = props.choices.find((choice) => choice.id === props.selected);
  return (
    <Menu
      title={props.label}
      actions={props.choices.map((choice) => ({
        id: choice.id,
        title: m(choice.label),
        subtitle: choice.detail === undefined ? undefined : m(choice.detail),
        state: choice.id === props.selected ? ("on" as const) : ("off" as const),
      }))}
      onPressAction={({ nativeEvent }) => {
        const choice = props.choices.find((item) => item.id === nativeEvent.event);
        if (choice) props.onSelect(choice.id);
      }}
    >
      <SettingsRow
        disabled={props.disabled}
        icon={props.icon}
        label={props.label}
        valuePosition="trailing"
        value={selected === undefined ? undefined : m(selected.label)}
      />
    </Menu>
  );
}

export function TextAppearanceSection() {
  const gt = useGT();
  const {
    isReady,
    appearance,
    setBaseFontSize,
    fontId,
    setFontId,
    monoFontId,
    setMonoFontId,
    mathRenderingEnabled,
    setMathRenderingEnabled,
  } = useAppearancePreferences();

  return (
    <SettingsSection title={gt("Text", { $context: "settings section for text size" })}>
      <TextAppearancePreview fontSize={appearance.baseFontSize} />
      <AppearancePreviewSeparator />
      <FontSizeSliderRow
        disabled={!isReady}
        icon="textformat.size"
        label={gt("Text size")}
        max={MAX_BASE_FONT_SIZE}
        min={MIN_BASE_FONT_SIZE}
        onChange={setBaseFontSize}
        step={BASE_FONT_SIZE_STEP}
        value={appearance.baseFontSize}
        valueLabel={gt("{size} pt", { size: appearance.baseFontSize })}
      />
      <FontMenuRow
        disabled={!isReady}
        icon="textformat"
        label={gt("Font", { $context: "settings row for the app typeface" })}
        choices={FONT_CHOICES}
        selected={fontId}
        onSelect={setFontId}
      />
      <FontMenuRow
        disabled={!isReady}
        icon="chevron.left.forwardslash.chevron.right"
        label={gt("Monospace font", {
          $context: "settings row for the typeface of code, diffs, and the terminal",
        })}
        choices={MONO_FONT_CHOICES}
        selected={monoFontId}
        onSelect={setMonoFontId}
      />
      <SettingsSwitchRow
        disabled={!isReady}
        icon="plusminus"
        label={gt("Render math")}
        value={mathRenderingEnabled}
        onValueChange={setMathRenderingEnabled}
      />
    </SettingsSection>
  );
}
