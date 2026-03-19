import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Screen = {
  width,
  height,
  isPortrait:  height >= width,
  isLandscape: width  >  height,
} as const;

export const Radius = {
  none: 0,
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   24,
  full: 9999,
} as const;

export const IconSize = {
  xs:  16,
  sm:  20,
  md:  24,
  lg:  28,
  xl:  32,
} as const;

export const BorderWidth = {
  hairline: Platform.OS === 'ios' ? 0.5 : 1,
  thin:     1,
  thick:    2,
} as const;

export const ZIndex = {
  base:    0,
  raised:  1,
  overlay: 100,
  modal:   110,
  toast:   200,
} as const;
