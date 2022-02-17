import { AuthError } from './auth';

export enum APIRoutes {
  USERS = '/api/users',
  ROLES = '/api/roles',
}

export enum NavRoutes {
  HOME = '/',
  RULES = '/rules',
  EVENTS = '/events',
  TRADE = '/trade',
  MODS = '/mods',
  WORLD = '/world',
}
export enum AdminNavRoutes {
  MEMBERS = '/members',
  USERS = '/users',
  ROLES = '/roles',
}
export enum Routes {
  SIGNIN = '/auth/signin',
  ABOUT = '/about',
  ADMIN = '/admin',
}

/** Maps navigation routes to displayed labels (e.g.., in navbar) */
export const ROUTES_TO_LABEL: Record<NavRoutes | AdminNavRoutes, string> = {
  [NavRoutes.HOME]: 'Skali',
  [NavRoutes.RULES]: 'Règlement',
  [NavRoutes.EVENTS]: 'Événements',
  [NavRoutes.TRADE]: 'Commerce',
  [NavRoutes.MODS]: 'Mods',
  [NavRoutes.WORLD]: 'Monde',
  [AdminNavRoutes.MEMBERS]: 'Vikings',
  [AdminNavRoutes.USERS]: 'Âmes perdues',
  [AdminNavRoutes.ROLES]: 'Rôles',
};

export const getSigninRoute = (error: AuthError, callbackUrl: string) =>
  `${Routes.SIGNIN}?error=${error}&callbackUrl=${callbackUrl}`;
