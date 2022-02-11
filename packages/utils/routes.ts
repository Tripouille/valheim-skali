import { AuthError } from './constants';

export enum APIRoutes {
  USERS = '/api/users',
}

export enum NavRoutes {
  HOME = '/',
  RULES = '/rules',
  EVENTS = '/events',
  TRADE = '/trade',
  MODS = '/mods',
  WORLD = '/world',
}

enum AuthRoutes {
  SIGNIN = '/auth/signin',
}

export const getSigninRoute = (error: AuthError, callbackUrl: string) =>
  `${AuthRoutes.SIGNIN}?error=${error}&callbackUrl=${callbackUrl}`;
