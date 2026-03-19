import { Dimensions, PixelRatio, Platform, type ScaledSize } from 'react-native';

// ── Base dimensions ───────────────────────────────────────────────────────────

const BASE_PHONE_W  = Platform.OS === 'ios' ? 390 : 360;
const BASE_PHONE_H  = Platform.OS === 'ios' ? 844 : 800;
const BASE_TABLET_W = Platform.OS === 'ios' ? 834 : 800;
const BASE_TABLET_H = Platform.OS === 'ios' ? 1112 : 1280;

// ── Screen ────────────────────────────────────────────────────────────────────

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

const detectTablet = ({ width, height }: ScaledSize) =>
  height / width < 1.6 && Math.min(width, height) >= 600;

export const isTablet  = detectTablet(Dimensions.get('window'));
export const isIOS     = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

const BASE_W = isTablet ? BASE_TABLET_W : BASE_PHONE_W;
const BASE_H = isTablet ? BASE_TABLET_H : BASE_PHONE_H;

export const SCREEN = {
  width:      SCREEN_W,
  height:     SCREEN_H,
  pixelRatio: PixelRatio.get(),
  fontScale:  PixelRatio.getFontScale(),
  isPortrait: SCREEN_H >= SCREEN_W,
  isTablet,
} as const;

// ── Scale functions ───────────────────────────────────────────────────────────

export const horizontalScale = (size: number): number =>
  (SCREEN_W / BASE_W) * size;

export const verticalScale = (size: number): number =>
  (SCREEN_H / BASE_H) * size;

/** Balanced scale — not fully linear, prevents extreme growth. factor: 0 = none, 1 = full (default 0.5) */
export const moderateScale = (size: number, factor = 0.5): number =>
  size + (horizontalScale(size) - size) * factor;

// ── Font size ─────────────────────────────────────────────────────────────────

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export const responsiveFontSize = (fontSize: number): number => {
  const scaled = moderateScale(fontSize, 0.4);
  const min    = fontSize * 0.85;
  const max    = fontSize * (isTablet ? 1.45 : 1.2);
  return PixelRatio.roundToNearestPixel(clamp(scaled, min, max));
};

// ── Type scale ────────────────────────────────────────────────────────────────

const baseScale = {
  tiny:     10,
  tabLabel: 11,
  small:    12,
  body:     14,
  caption:  15,
  regular:  16,
  subtitle: 17,
  medium:   18,
  large:    20,
  heading:  22,
  xlarge:   24,
  xxlarge:  28,
  huge:     32,
  giant:    40,
  colossal: 52,
} as const;

type BaseKey = keyof typeof baseScale;
type AliasKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'displaySm' | 'displayMd' | 'displayLg';

export type TypeScaleKey = BaseKey | AliasKey;
export type TypeScale    = Record<TypeScaleKey, number>;

const buildTypeScale = (): TypeScale => {
  const base = (Object.keys(baseScale) as BaseKey[]).reduce(
    (acc, key) => { acc[key] = responsiveFontSize(baseScale[key]); return acc; },
    {} as Record<BaseKey, number>,
  );
  return {
    ...base,
    xs:        base.small,
    sm:        base.body,
    md:        base.regular,
    lg:        base.medium,
    xl:        base.large,
    xxl:       base.xlarge,
    displaySm: base.xxlarge,
    displayMd: base.huge,
    displayLg: base.giant,
  };
};

export const typeScale: TypeScale = buildTypeScale();

/** Percentage of screen width. */
export const wp = (pct: number): number => (SCREEN_W * pct) / 100;

/** Percentage of screen height. */
export const hp = (pct: number): number => (SCREEN_H * pct) / 100;

/** 1dp in physical pixels — for hairline borders. */
export const hairline = (): number => 1 / PixelRatio.get();

// ── Conditional value selectors ───────────────────────────────────────────────

export const byDevice = <T>(o: { phone: T; tablet: T }): T =>
  isTablet ? o.tablet : o.phone;
