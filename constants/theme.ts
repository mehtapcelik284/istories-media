import { Colors } from '@/theme/colors';
import { FontFamily } from '@/theme/typography';

/** Flat color map consumed by useThemeColor and themed components. */
export const ThemeColors = {
  text:            Colors.text.primary,
  background:      Colors.background.primary,
  tint:            Colors.brand.primary,
  icon:            Colors.icon.default,
  tabIconDefault:  Colors.tab.inactive,
  tabIconSelected: Colors.tab.active,
} as const;

export type ThemeColorKey = keyof typeof ThemeColors;

/** @deprecated Use FontFamily from @/theme/typography */
export { FontFamily as Fonts };
