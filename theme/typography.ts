import { Platform } from 'react-native';
import { typeScale } from '@/utils/responsive';

export const FontFamily = Platform.select({
  ios:     { sans: 'System',  serif: 'Georgia', mono: 'Courier New', rounded: 'ui-rounded' },
  android: { sans: 'Roboto',  serif: 'serif',   mono: 'monospace',   rounded: 'Roboto'     },
  default: { sans: 'System',  serif: 'Georgia', mono: 'Courier New', rounded: 'System'     },
})!;

/** Responsive font sizes — device-adapted via typeScale. */
export const FontSize = typeScale;

export const FontWeight = {
  regular:  '400',
  medium:   '500',
  semibold: '600',
  bold:     '700',
  heavy:    '800',
} as const;

export const LineHeight = {
  tight:   (size: number) => Math.round(size * 1.2),
  normal:  (size: number) => Math.round(size * 1.5),
  relaxed: (size: number) => Math.round(size * 1.75),
} as const;

export const LetterSpacing = {
  tight:  -0.4,
  normal:  0,
  wide:    0.4,
  wider:   0.8,
} as const;

export const TextStyle = {
  h1:      { fontFamily: FontFamily.sans, fontSize: FontSize.displayMd, fontWeight: FontWeight.bold,     lineHeight: LineHeight.tight(FontSize.displayMd),  letterSpacing: LetterSpacing.tight  },
  h2:      { fontFamily: FontFamily.sans, fontSize: FontSize.huge,      fontWeight: FontWeight.bold,     lineHeight: LineHeight.tight(FontSize.huge),        letterSpacing: LetterSpacing.tight  },
  h3:      { fontFamily: FontFamily.sans, fontSize: FontSize.xlarge,    fontWeight: FontWeight.semibold, lineHeight: LineHeight.tight(FontSize.xlarge),      letterSpacing: LetterSpacing.normal },
  h4:      { fontFamily: FontFamily.sans, fontSize: FontSize.large,     fontWeight: FontWeight.semibold, lineHeight: LineHeight.tight(FontSize.large),       letterSpacing: LetterSpacing.normal },
  bodyLg:  { fontFamily: FontFamily.sans, fontSize: FontSize.subtitle,  fontWeight: FontWeight.regular,  lineHeight: LineHeight.normal(FontSize.subtitle),   letterSpacing: LetterSpacing.normal },
  body:    { fontFamily: FontFamily.sans, fontSize: FontSize.regular,   fontWeight: FontWeight.regular,  lineHeight: LineHeight.normal(FontSize.regular),    letterSpacing: LetterSpacing.normal },
  bodySm:  { fontFamily: FontFamily.sans, fontSize: FontSize.body,      fontWeight: FontWeight.regular,  lineHeight: LineHeight.normal(FontSize.body),       letterSpacing: LetterSpacing.normal },
  label:   { fontFamily: FontFamily.sans, fontSize: FontSize.regular,   fontWeight: FontWeight.semibold, lineHeight: LineHeight.tight(FontSize.regular),     letterSpacing: LetterSpacing.wide   },
  caption: { fontFamily: FontFamily.sans, fontSize: FontSize.small,     fontWeight: FontWeight.regular,  lineHeight: LineHeight.normal(FontSize.small),      letterSpacing: LetterSpacing.normal },
} as const;

export type TextStyleKey = keyof typeof TextStyle;
