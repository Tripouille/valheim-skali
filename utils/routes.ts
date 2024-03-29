import { AuthError } from './auth';
import { OneOrMany } from './types';

export enum APIRoute {
  USERS = '/api/users',
  ROLES = '/api/roles',
  EVENTS = '/api/events',
  WIKI = '/api/wiki',
  WIKI_PROPOSALS = '/api/wiki/proposals',
  APPLICATIONS = '/api/applications',
  APPLICATION_ASSOCIABLE_USERS = '/api/applications/associable-users',
  MY_APPLICATION = '/api/applications/me',
  RULES_QUESTIONNAIRE = '/api/rules-questionnaire',
  SESSION = '/api/auth/session',
  VISITOR = '/api/auth/visitor',
}

export enum NavRoute {
  HOME = '',
  RULES = 'rules',
  MY_APPLICATION = 'applications/me',
  APPLICATIONS = 'applications',
  EVENTS = 'events',
  WIKI = 'wiki',
  PHOTOS = 'photos',
}
export enum OldNavRoute {
  TRADE = 'trade',
  MODS = 'mods',
  WORLD = 'world',
}
export enum AdminNavRoute {
  MEMBERS = 'members',
  NON_MEMBERS = 'non-members',
  ROLES = 'roles',
  WIKI_PROPOSALS = 'wiki-proposals',
  WIKI = 'wiki-pages',
  RULES_QUESTIONNAIRE = 'rules-questionnaire',
}
export enum MenuRoute {
  ABOUT = 'about',
  ADMIN = 'admin',
}
export enum AuthRoute {
  SIGNIN = 'auth/signin',
}
export enum HiddenRoute {
  JOIN = 'join',
}
export type Route = NavRoute | AdminNavRoute | MenuRoute | AuthRoute | OldNavRoute | HiddenRoute;

/** Maps navigation routes to displayed labels (e.g.., in navbar) */
export const ROUTES_TO_LABEL: Record<Route, string> = {
  [NavRoute.HOME]: 'Skali',
  [NavRoute.RULES]: 'Règlement',
  [NavRoute.MY_APPLICATION]: 'Ma candidature',
  [NavRoute.APPLICATIONS]: 'Candidatures',
  [NavRoute.EVENTS]: 'Événements',
  [OldNavRoute.TRADE]: 'Commerce',
  [OldNavRoute.MODS]: 'Mods',
  [OldNavRoute.WORLD]: 'Monde',
  [NavRoute.WIKI]: 'Wiki',
  [NavRoute.PHOTOS]: 'Photos',
  [AdminNavRoute.MEMBERS]: 'Vikings',
  [AdminNavRoute.NON_MEMBERS]: 'Âmes perdues',
  [AdminNavRoute.ROLES]: 'Rôles',
  [AdminNavRoute.WIKI_PROPOSALS]: 'Propositions Wiki',
  [AdminNavRoute.WIKI]: 'Pages Wiki',
  [AdminNavRoute.RULES_QUESTIONNAIRE]: 'Questionnaire Règlement',
  [MenuRoute.ABOUT]: 'A propos du site',
  [MenuRoute.ADMIN]: 'Administration',
  [AuthRoute.SIGNIN]: 'Connexion',
  [HiddenRoute.JOIN]: 'Rejoindre le Valhabba',
};

export const isAdminNavRoute = (route: string): route is AdminNavRoute =>
  Object.values(AdminNavRoute).includes(route as AdminNavRoute);

export const getSigninRoute = (error: AuthError, callbackUrl?: string) =>
  callbackUrl
    ? `/${AuthRoute.SIGNIN}?error=${error}&callbackUrl=${callbackUrl}`
    : `/${AuthRoute.SIGNIN}?error=${error}`;

export function getRouteParameterAsString(routeParameterValue: OneOrMany<string>): string;
export function getRouteParameterAsString(
  routeParameterValue?: OneOrMany<string>,
): string | undefined;
export function getRouteParameterAsString(routeParameterValue?: OneOrMany<string>) {
  return Array.isArray(routeParameterValue) ? routeParameterValue[0] : routeParameterValue;
}

const serverName = 'valhabba';
export const getRoute = (path: string) => `/${serverName}/${path}`;
