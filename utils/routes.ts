import { AuthError } from './auth';
import { OneOrMany } from './types';

export const serverName = 'valhabba';

export enum APIRoute {
  USERS = '/api/users',
  ROLES = '/api/roles',
  EVENTS = '/api/events',
  WIKI = '/api/wiki',
  WIKI_PROPOSALS = '/api/wiki/proposals',
  APPLICATIONS = '/api/applications',
  APPLICATION_ASSOCIABLE_USERS = '/api/applications/associable-users',
  MY_APPLICATION = '/api/applications/me',
  SESSION = '/api/auth/session',
  VISITOR = '/api/auth/visitor',
}

export enum NavRoute {
  HOME = '/',
  RULES = '/rules',
  APPLICATIONS = '/applications',
  EVENTS = '/events',
  WIKI = '/wiki',
}
export enum OldNavRoute {
  TRADE = '/trade',
  MODS = '/mods',
  WORLD = '/world',
}
export enum AdminNavRoute {
  MEMBERS = '/members',
  NON_MEMBERS = '/non-members',
  ROLES = '/roles',
  WIKI_PROPOSALS = '/wiki-proposals',
  WIKI = '/wiki-pages',
}
export enum MenuRoute {
  ABOUT = '/about',
  ADMIN = '/admin',
}
export enum AuthRoute {
  SIGNIN = '/auth/signin',
}
export enum CandidateRoute {
  JOIN = '/join',
  MY_APPLICATION = '/applications/me',
}
export type Route = NavRoute | AdminNavRoute | MenuRoute | AuthRoute | OldNavRoute | CandidateRoute;

/** Maps navigation routes to displayed labels (e.g.., in navbar) */
export const ROUTES_TO_LABEL: Record<Route, string> = {
  [NavRoute.HOME]: 'Skali',
  [NavRoute.RULES]: 'Règlement',
  [NavRoute.EVENTS]: 'Événements',
  [NavRoute.APPLICATIONS]: 'Candidatures',
  [OldNavRoute.TRADE]: 'Commerce',
  [OldNavRoute.MODS]: 'Mods',
  [OldNavRoute.WORLD]: 'Monde',
  [NavRoute.WIKI]: 'Wiki',
  [AdminNavRoute.MEMBERS]: 'Vikings',
  [AdminNavRoute.NON_MEMBERS]: 'Âmes perdues',
  [AdminNavRoute.ROLES]: 'Rôles',
  [AdminNavRoute.WIKI_PROPOSALS]: 'Propositions Wiki',
  [AdminNavRoute.WIKI]: 'Pages Wiki',
  [MenuRoute.ABOUT]: 'A propos du site',
  [MenuRoute.ADMIN]: 'Administration',
  [AuthRoute.SIGNIN]: 'Connexion',
  [CandidateRoute.JOIN]: 'Rejoindre le Valhabba',
  [CandidateRoute.MY_APPLICATION]: 'Ma candidature',
};

export const isAdminNavRoute = (route: string): route is AdminNavRoute =>
  Object.values(AdminNavRoute).includes(route as AdminNavRoute);

export const getSigninRoute = (error: AuthError, callbackUrl?: string) =>
  callbackUrl
    ? `${AuthRoute.SIGNIN}?error=${error}&callbackUrl=${callbackUrl}`
    : `${AuthRoute.SIGNIN}?error=${error}`;

export function getRouteParameterAsString(routeParameterValue: OneOrMany<string>): string;
export function getRouteParameterAsString(
  routeParameterValue?: OneOrMany<string>,
): string | undefined;
export function getRouteParameterAsString(routeParameterValue?: OneOrMany<string>) {
  return Array.isArray(routeParameterValue) ? routeParameterValue[0] : routeParameterValue;
}

export const getRoute = (path: string) => `/${serverName}/${path}`;
