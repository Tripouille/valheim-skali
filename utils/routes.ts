import { AuthError } from './auth';
import { OneOrMany } from './types';

export const serverName = 'valhabba';

export enum APIRoute {
  USERS = '/api/users',
  ROLES = '/api/roles',
  EVENTS = '/api/events',
  WIKI = '/api/wiki',
  SESSION = '/api/auth/session',
  VISITOR = '/api/auth/visitor',
}

export enum NavRoute {
  HOME = '/',
  RULES = '/rules',
  EVENTS = '/events',
  TRADE = '/trade',
  MODS = '/mods',
  WORLD = '/world',
  WIKI = '/wiki',
}
export enum AdminNavRoute {
  MEMBERS = '/members',
  NON_MEMBERS = '/non-members',
  ROLES = '/roles',
  WIKI = '/wiki',
}
export enum MenuRoute {
  ABOUT = '/about',
  ADMIN = '/admin',
}
export enum AuthRoute {
  SIGNIN = '/auth/signin',
}
export type Route = NavRoute | AdminNavRoute | MenuRoute | AuthRoute;

/** Maps navigation routes to displayed labels (e.g.., in navbar) */
export const ROUTES_TO_LABEL: Record<Route, string> = {
  [NavRoute.HOME]: 'Skali',
  [NavRoute.RULES]: 'Règlement',
  [NavRoute.EVENTS]: 'Événements',
  [NavRoute.TRADE]: 'Commerce',
  [NavRoute.MODS]: 'Mods',
  [NavRoute.WORLD]: 'Monde',
  [NavRoute.WIKI]: 'Wiki',
  [AdminNavRoute.MEMBERS]: 'Vikings',
  [AdminNavRoute.NON_MEMBERS]: 'Âmes perdues',
  [AdminNavRoute.ROLES]: 'Rôles',
  [AdminNavRoute.WIKI]: 'Wiki',
  [MenuRoute.ABOUT]: 'A propos du site',
  [MenuRoute.ADMIN]: 'Administration',
  [AuthRoute.SIGNIN]: 'Connexion',
};

export const isAdminNavRoute = (route: string): route is AdminNavRoute =>
  Object.values(AdminNavRoute).includes(route as AdminNavRoute);

export const getSigninRoute = (error: AuthError, callbackUrl?: string) =>
  callbackUrl
    ? `${AuthRoute.SIGNIN}?error=${error}&callbackUrl=${callbackUrl}`
    : `${AuthRoute.SIGNIN}?error=${error}`;

export const getRouteParameterAsString = (routeParameterValue?: OneOrMany<string>) => {
  return Array.isArray(routeParameterValue) ? routeParameterValue[0] : routeParameterValue ?? '';
};
