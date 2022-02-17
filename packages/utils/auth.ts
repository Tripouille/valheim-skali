import { AdminNavRoutes, Routes } from './routes';

export interface AuthConfig {
  needAuth?: { permissions?: Permissions };
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
  READ,
  WRITE,
}

export type Permissions = {
  [key in PermissionCategory]?: PermissionPrivilege;
};

export const ROUTES_TO_PERMISSIONS: Record<Routes | AdminNavRoutes, Permissions> = {
  [AdminNavRoutes.MEMBERS]: { [PermissionCategory.USER]: PermissionPrivilege.READ },
  [AdminNavRoutes.USERS]: { [PermissionCategory.USER]: PermissionPrivilege.READ },
  [AdminNavRoutes.ROLES]: { [PermissionCategory.ROLE]: PermissionPrivilege.READ },
  [Routes.ADMIN]: { [PermissionCategory.USER]: PermissionPrivilege.READ },
  [Routes.ABOUT]: {},
  [Routes.SIGNIN]: {},
};

export const userHasRequiredPermissions = (
  userPermissions: Permissions,
  requiredPermissions?: Permissions,
) => {
  if (!requiredPermissions) return true;
  for (const c in requiredPermissions) {
    const category = c as PermissionCategory;
    if ((userPermissions[category] ?? -1) < (requiredPermissions[category] ?? -1)) return false;
  }
  return true;
};
