import { ThemeColors, type ThemeColorKey } from '@/constants/theme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ThemeColorKey,
): string {
  return props.light ?? ThemeColors[colorName];
}
