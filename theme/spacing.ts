/** Base-4 grid. All margin/padding values come from here. */
export const Spacing = {
  none:  0,
  xs:    4,
  sm:    8,
  md:    16,
  lg:    20,
  xl:    24,
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,
} as const;

/** sp(4) → 16  |  Quick multiple of the 4px base unit. */
export const sp = (n: number) => n * 4;

export const ScreenPadding = {
  horizontal: Spacing.md,
  vertical:   Spacing.md,
} as const;
