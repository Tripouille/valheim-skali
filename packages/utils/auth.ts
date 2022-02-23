import { AdminNavRoute, AuthRoute, MenuRoute, NavRoute, Route } from './routes';

export interface AuthConfig {
  needAuth?: { permissions: Permissions };
}

export type ComponentWithAuth<PropTypes = Record<string, never>> = React.FC<PropTypes> & AuthConfig;

export enum SessionStatus {
  LOADING = 'loading',
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
}

export enum AuthError {
  CALLBACK = 'Callback',
  SESSION_REQUIRED = 'SessionRequired',
}

export enum PermissionCategory {
  USER = 'USER',
  ROLE = 'ROLE',
  EVENT = 'EVENT',
}

export enum PermissionPrivilege {
  NONE,
  READ,
  READ_WRITE,
}

export type Permissions = {
  [key in PermissionCategory]?: PermissionPrivilege;
};

export const ROUTES_TO_PERMISSIONS: Record<Route, Permissions> = {
  [NavRoute.HOME]: {},
  [NavRoute.RULES]: {},
  [NavRoute.EVENTS]: {},
  [NavRoute.TRADE]: {},
  [NavRoute.MODS]: {},
  [NavRoute.WORLD]: {},
  [AdminNavRoute.MEMBERS]: { [PermissionCategory.USER]: PermissionPrivilege.READ },
  [AdminNavRoute.USERS]: { [PermissionCategory.USER]: PermissionPrivilege.READ },
  [AdminNavRoute.ROLES]: { [PermissionCategory.ROLE]: PermissionPrivilege.READ },
  [MenuRoute.ADMIN]: { [PermissionCategory.USER]: PermissionPrivilege.READ },
  [MenuRoute.ABOUT]: {},
  [AuthRoute.SIGNIN]: {},
};

export const userHasRequiredPermissions = (
  userPermissions: Permissions,
  requiredPermissions: Permissions,
) => {
  for (const c in requiredPermissions) {
    const category = c as PermissionCategory;
    if ((userPermissions[category] ?? -1) < (requiredPermissions[category] ?? -1)) return false;
  }
  return true;
};
