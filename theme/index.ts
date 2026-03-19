export * from './colors';
export * from './typography';
export * from './spacing';
export * from './metrics';
export * from './shadows';

import { Colors }                                           from './colors';
import { FontFamily, FontSize, FontWeight, TextStyle }      from './typography';
import { Spacing, sp, ScreenPadding }                       from './spacing';
import { Screen, Radius, IconSize, BorderWidth, ZIndex }    from './metrics';
import { Shadows }                                          from './shadows';

export const theme = {
  colors:        Colors,
  font:          FontFamily,
  fontSize:      FontSize,
  fontWeight:    FontWeight,
  textStyle:     TextStyle,
  spacing:       Spacing,
  sp,
  screenPadding: ScreenPadding,
  screen:        Screen,
  radius:        Radius,
  iconSize:      IconSize,
  borderWidth:   BorderWidth,
  zIndex:        ZIndex,
  shadows:       Shadows,
} as const;

export type Theme = typeof theme;
