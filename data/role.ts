import { ObjectId } from 'bson';
import { CommonPermissionPrivilege, Permissions } from 'utils/permissions';

/** Main types */

export interface Role {
  _id: string;
  name: string;
  permissions: Permissions;
  requiredPermissionsToAssign: Permissions;
}

export type RoleInDb = Omit<Role, '_id'> & {
  _id: ObjectId;
};

export type CreateRoleData = Omit<Role, '_id'>;

/** Database */

export const rolesCollectionName = 'roles';

/** Data validation */

export const getRoleValidationError = (roleFormData: Partial<CreateRoleData>): string | null => {
  if (!roleFormData.name?.length) return 'Le nom est obligatoire.';
  return null;
};

/** Data max length */

export const ROLE_NAME_IN_GAME_MAX_LENGTH = 15;

/** Special roles */

export enum SpecialRoleName {
  /** Dev who has access to database, has all permissions to SuperAdmin level */
  SUPER_ADMIN = 'SuperAdmin',
  /** Has all permissions to Admin level
   * (this is the only role with write access on roles) */
  ADMIN = 'Admin',
  MEMBER = 'Viking',
  VISITOR = 'Visiteur',
}

export const isSpecialRole = (role: Role | RoleInDb) => {
  return Object.values(SpecialRoleName).includes(role.name as SpecialRoleName);
};

type AdminRole = (Role | RoleInDb) & { name: SpecialRoleName.ADMIN | SpecialRoleName.SUPER_ADMIN };

export const ADMIN_ROLE_TO_PRIVILEGE: Record<AdminRole['name'], CommonPermissionPrivilege> = {
  [SpecialRoleName.ADMIN]: CommonPermissionPrivilege.ADMIN,
  [SpecialRoleName.SUPER_ADMIN]: CommonPermissionPrivilege.SUPER_ADMIN,
};

export const isAdminRole = (role: Role | RoleInDb): role is AdminRole =>
  role.name === SpecialRoleName.ADMIN || role.name === SpecialRoleName.SUPER_ADMIN;

/** Sorting */

export const compareRolesFromName = (role1?: Role, role2?: Role) => {
  if (role1 && role2) {
    if (role1.name === SpecialRoleName.SUPER_ADMIN || role2.name === SpecialRoleName.SUPER_ADMIN) {
      return role1.name === SpecialRoleName.SUPER_ADMIN ? -1 : 1;
    } else if (role1.name === SpecialRoleName.ADMIN || role2.name === SpecialRoleName.ADMIN) {
      return role1.name === SpecialRoleName.ADMIN ? -1 : 1;
    }
    return role1.name < role2.name ? -1 : 1;
  } else return 1;
};
