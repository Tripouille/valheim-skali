import { Role, RoleInDb } from '@packages/data/role';
import { AdminNavRoute, AuthRoute, MenuRoute, NavRoute, Route } from './routes';

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
  ROLE = 'ROLE',
  USER = 'USER',
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
  [AdminNavRoute.NON_MEMBERS]: { [PermissionCategory.USER]: PermissionPrivilege.READ },
  [AdminNavRoute.ROLES]: { [PermissionCategory.ROLE]: PermissionPrivilege.READ },
  [MenuRoute.ADMIN]: { [PermissionCategory.USER]: PermissionPrivilege.READ },
  [MenuRoute.ABOUT]: {},
  [AuthRoute.SIGNIN]: {},
};

export const PERMISSION_CATEGORY_TO_LABEL: Record<PermissionCategory, string> = {
  [PermissionCategory.USER]: 'Utilisateurs',
  [PermissionCategory.ROLE]: 'Rôles',
  [PermissionCategory.EVENT]: 'Évenements',
};
export const PERMISSION_PRIVILEGE_TO_LABEL: Record<PermissionPrivilege, string> = {
  [PermissionPrivilege.NONE]: '',
  [PermissionPrivilege.READ]: 'Lecture',
  [PermissionPrivilege.READ_WRITE]: 'Lecture et écriture',
  [PermissionPrivilege.ADMIN]: 'Admin',
  [PermissionPrivilege.SUPER_ADMIN]: 'SuperAdmin',
};

export const isAdminPrivilege = (privilege: PermissionPrivilege) =>
  privilege === PermissionPrivilege.ADMIN || privilege === PermissionPrivilege.SUPER_ADMIN;

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

export enum SpecialRoleName {
  /** Dev who has access to database, has all permissions to SuperAdmin level */
  SUPER_ADMIN = 'SuperAdmin',
  /** Has all permissions to Admin level
   * (this is the only role with write access on roles) */
  ADMIN = 'Admin',
  MEMBER = 'Viking',
}

export const isSpecialRole = (role: Role | RoleInDb) => {
  return Object.values(SpecialRoleName).includes(role.name as SpecialRoleName);
};

type AdminRole = (Role | RoleInDb) & { name: SpecialRoleName.ADMIN | SpecialRoleName.SUPER_ADMIN };

export const ADMIN_ROLE_TO_PRIVILEGE: Record<AdminRole['name'], PermissionPrivilege> = {
  [SpecialRoleName.ADMIN]: PermissionPrivilege.ADMIN,
  [SpecialRoleName.SUPER_ADMIN]: PermissionPrivilege.SUPER_ADMIN,
};

export const isAdminRole = (role: Role | RoleInDb): role is AdminRole =>
  role.name === SpecialRoleName.ADMIN || role.name === SpecialRoleName.SUPER_ADMIN;
