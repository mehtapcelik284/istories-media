export const Routes = {
  tabs: {
    home:    '/(tabs)/'       as const,
    explore: '/(tabs)/explore' as const,
  },
  modal: '/modal' as const,
} as const;

export type AppRoute = (typeof Routes.tabs)[keyof typeof Routes.tabs] | typeof Routes.modal;
