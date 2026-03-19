export const Routes = {
  home:   '/'       as const,
  shorts: '/shorts' as const,
} as const;

export type AppRoute = (typeof Routes)[keyof typeof Routes];
