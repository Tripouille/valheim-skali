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
  NONE = '0_NONE',
  READ = '1_READ',
  READ_WRITE = '2_READ_WRITE',
  ADMIN = '3_ADMIN', // special privilege for admin actions
  SUPER_ADMIN = '4_SUPER_ADMIN', // special privilege for owner actions
}

export type Permissions = Partial<Record<PermissionCategory, PermissionPrivilege>>;

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
    if (
      (userPermissions[category] ?? PermissionPrivilege.NONE) <
      (requiredPermissions[category] ?? PermissionPrivilege.NONE)
    )
      return false;
  }
  return true;
};

export enum SpecialRole {
  /** Dev who has access to database, has all permissions to SuperAdmin level */
  SUPER_ADMIN = 'SuperAdmin',
  /** Has all permissions to Admin level
   * (this is the only role with write access on roles) */
  ADMIN = 'Admin',
  MEMBER = 'Viking',
}
interface SpecialRoleParameters {
  canRead: Permissions;
  canAssign: Permissions;
  canEdit: Permissions;
}
// Special role can't be deleted and have the following restrictions to see/edit them
export const SpecialRolesParameters: Record<SpecialRole, SpecialRoleParameters> = {
  [SpecialRole.SUPER_ADMIN]: {
    canRead: { [PermissionCategory.ROLE]: PermissionPrivilege.SUPER_ADMIN },
    canAssign: { [PermissionCategory.ROLE]: PermissionPrivilege.SUPER_ADMIN },
    canEdit: { [PermissionCategory.ROLE]: PermissionPrivilege.SUPER_ADMIN },
  },
  [SpecialRole.ADMIN]: {
    canRead: { [PermissionCategory.ROLE]: PermissionPrivilege.READ },
    canAssign: { [PermissionCategory.ROLE]: PermissionPrivilege.SUPER_ADMIN },
    canEdit: { [PermissionCategory.ROLE]: PermissionPrivilege.SUPER_ADMIN },
  },
  [SpecialRole.MEMBER]: {
    canRead: { [PermissionCategory.ROLE]: PermissionPrivilege.READ },
    canAssign: { [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE },
    canEdit: { [PermissionCategory.ROLE]: PermissionPrivilege.READ_WRITE },
  },
};

export const isSpecialRoleName = (roleName: string): roleName is SpecialRole => {
  return Object.values(SpecialRole).includes(roleName as SpecialRole);
};
