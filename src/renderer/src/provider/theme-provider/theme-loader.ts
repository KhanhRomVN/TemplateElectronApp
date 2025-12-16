// Light Themes
import DefaultLight from '../../constants/themes/DefaultLight.json'
import IndigoLight from '../../constants/themes/IndigoLight.json'
import OceanLight from '../../constants/themes/OceanLight.json'
import ForestLight from '../../constants/themes/ForestLight.json'
import SunsetLight from '../../constants/themes/SunsetLight.json'
import LavenderLight from '../../constants/themes/LavenderLight.json'
import RoseLight from '../../constants/themes/RoseLight.json'
import AmberLight from '../../constants/themes/AmberLight.json'
import SkyLight from '../../constants/themes/SkyLight.json'
import EmeraldLight from '../../constants/themes/EmeraldLight.json'
import FuchsiaLight from '../../constants/themes/FuchsiaLight.json'
import SlateLight from '../../constants/themes/SlateLight.json'
import TealLight from '../../constants/themes/TealLight.json'

// Dark Themes
import DefaultDark from '../../constants/themes/DefaultDark.json'
import MidnightDark from '../../constants/themes/MidnightDark.json'
import OceanDark from '../../constants/themes/OceanDark.json'
import ForestDark from '../../constants/themes/ForestDark.json'
import SunsetDark from '../../constants/themes/SunsetDark.json'
import LavenderDark from '../../constants/themes/LavenderDark.json'
import RoseDark from '../../constants/themes/RoseDark.json'
import AmberDark from '../../constants/themes/AmberDark.json'
import SkyDark from '../../constants/themes/SkyDark.json'
import EmeraldDark from '../../constants/themes/EmeraldDark.json'
import FuchsiaDark from '../../constants/themes/FuchsiaDark.json'
import SlateDark from '../../constants/themes/SlateDark.json'
import TealDark from '../../constants/themes/TealDark.json'

export interface ThemeConfig {
  name: string
  monaco: {
    base: string
    inherit: boolean
    rules: Array<{
      foreground?: string
      background?: string
      fontStyle?: string
      token: string
    }>
    colors: {
      [key: string]: string
    }
  }
  tailwind: {
    primary: string
    background: string
    textPrimary: string
    textSecondary: string
    border: string
    borderHover: string
    borderFocus: string
    cardBackground: string
    inputBackground: string
    inputBorderDefault: string
    inputBorderHover: string
    inputBorderFocus: string
    dialogBackground: string
    dropdownBackground: string
    dropdownItemHover: string
    dropdownBorder: string
    dropdownBorderHover: string
    sidebarBackground: string
    sidebarItemHover: string
    sidebarItemFocus: string
    buttonBg: string
    buttonBgHover: string
    buttonText: string
    buttonBorder: string
    buttonBorderHover: string
    buttonSecondBg: string
    buttonSecondBgHover: string
    bookmarkItemBg: string
    bookmarkItemText: string
    drawerBackground: string
    clockGradientFrom: string
    clockGradientTo: string
    cardShadow: string
    dialogShadow: string
    dropdownShadow: string
    tableHeaderBg: string
    tableBodyBg: string
    tableHoverItemBodyBg: string
    tableFocusItemBodyBg: string
    tableFooterBg: string
    tableBorder: string
    tabBackground: string
    tabBorder: string
    tabHoverBorder: string
    tabItemBackground: string
    tabItemHoverBg: string
    tabItemFocusBg: string
    tabItemBorder: string
    tabItemHoverBorder: string
    tabItemFocusBorder: string
  }
}

// Type assertion to ensure JSON files match ThemeConfig
const themes = {
  // Light Themes
  DefaultLight: DefaultLight as ThemeConfig,
  IndigoLight: IndigoLight as ThemeConfig,
  OceanLight: OceanLight as ThemeConfig,
  ForestLight: ForestLight as ThemeConfig,
  SunsetLight: SunsetLight as ThemeConfig,
  LavenderLight: LavenderLight as ThemeConfig,
  RoseLight: RoseLight as ThemeConfig,
  AmberLight: AmberLight as ThemeConfig,
  SkyLight: SkyLight as ThemeConfig,
  EmeraldLight: EmeraldLight as ThemeConfig,
  FuchsiaLight: FuchsiaLight as ThemeConfig,
  SlateLight: SlateLight as ThemeConfig,
  TealLight: TealLight as ThemeConfig,

  // Dark Themes
  DefaultDark: DefaultDark as ThemeConfig,
  MidnightDark: MidnightDark as ThemeConfig,
  OceanDark: OceanDark as ThemeConfig,
  ForestDark: ForestDark as ThemeConfig,
  SunsetDark: SunsetDark as ThemeConfig,
  LavenderDark: LavenderDark as ThemeConfig,
  RoseDark: RoseDark as ThemeConfig,
  AmberDark: AmberDark as ThemeConfig,
  SkyDark: SkyDark as ThemeConfig,
  EmeraldDark: EmeraldDark as ThemeConfig,
  FuchsiaDark: FuchsiaDark as ThemeConfig,
  SlateDark: SlateDark as ThemeConfig,
  TealDark: TealDark as ThemeConfig
}

export const PRESET_THEMES: Record<'light' | 'dark', ThemeConfig[]> = {
  light: [
    themes.DefaultLight,
    themes.IndigoLight,
    themes.OceanLight,
    themes.ForestLight,
    themes.SunsetLight,
    themes.LavenderLight,
    themes.RoseLight,
    themes.AmberLight,
    themes.SkyLight,
    themes.EmeraldLight,
    themes.FuchsiaLight,
    themes.SlateLight,
    themes.TealLight
  ],
  dark: [
    themes.DefaultDark,
    themes.MidnightDark,
    themes.OceanDark,
    themes.ForestDark,
    themes.SunsetDark,
    themes.LavenderDark,
    themes.RoseDark,
    themes.AmberDark,
    themes.SkyDark,
    themes.EmeraldDark,
    themes.FuchsiaDark,
    themes.SlateDark,
    themes.TealDark
  ]
}

export type PresetThemeType = ThemeConfig
