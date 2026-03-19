import { Platform } from 'react-native';

type Shadow = {
  shadowColor?:   string;
  shadowOffset?:  { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?:  number;
  elevation?:     number;
};

const s = (elev: number, opacity = 0.12): Shadow =>
  Platform.select({
    ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: elev * 0.5 }, shadowOpacity: opacity, shadowRadius: elev },
    android: { elevation: elev },
    default: {},
  })!;

export const Shadows = {
  none: {} as Shadow,
  sm:   s(2),
  md:   s(4),
  lg:   s(8),
  xl:   s(16),
} as const;

export type ShadowKey = keyof typeof Shadows;
