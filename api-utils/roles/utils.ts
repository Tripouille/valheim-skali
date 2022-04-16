import { CreateRoleData, getRoleValidationError, ROLE_NAME_IN_GAME_MAX_LENGTH } from 'data/role';
import { isAdminPrivilege, PermissionCategory, PermissionPrivilege, Permissions } from 'utils/auth';
import { isFilled } from 'utils/validation';
import { isRequiredObjectType, ServerException, isObject } from 'api-utils/common';

/** Validate body shape */

const isPermissions = (value: unknown): value is Permissions => {
  return (
    isObject(value) &&
    Object.entries(value).every(
      ([category, privilege]) =>
        Object.values(PermissionCategory).includes(category as PermissionCategory) &&
        Object.values(PermissionPrivilege).includes(privilege as PermissionPrivilege),
    )
  );
};

const roleKeyToValueTypeCheck: Record<keyof CreateRoleData, (value: unknown) => boolean> = {
  name: value => typeof value === 'string',
  permissions: value => isPermissions(value),
  requiredPermissionsToAssign: value => isPermissions(value),
};

export const isCreateRoleData = (data: unknown): data is CreateRoleData =>
  isRequiredObjectType(data, roleKeyToValueTypeCheck);

/** Prepare for DB */

const deleteNonePrivileges = (permissions: Permissions) => {
  for (const [category, privilege] of Object.entries(permissions) as [
    PermissionCategory,
    PermissionPrivilege,
  ][]) {
    if (privilege === PermissionPrivilege.NONE) delete permissions[category];
  }
};

export const transformRoleForDb = (role: CreateRoleData) => {
  role.name = role.name?.substring(0, ROLE_NAME_IN_GAME_MAX_LENGTH);
  deleteNonePrivileges(role.permissions);
  deleteNonePrivileges(role.requiredPermissionsToAssign);
};

/** Specific validations of role data */

export const checkRoleData = (newRole: CreateRoleData) => {
  /** Name cannot be empty */
  if (getRoleValidationError(newRole) !== null) throw new ServerException(400);
  if (!isFilled(newRole.name)) throw new ServerException(400);
  /** It is forbidden to give admin privileges */
  for (const privilege of Object.values(newRole.permissions)) {
    if (isAdminPrivilege(privilege)) throw new ServerException(403);
  }
  /** It is forbidden to have USER READ_WRITE but not ROLE READ on a role,
   * because editing a user means assigning roles to it
   */
  if (
    (newRole.permissions[PermissionCategory.USER] ?? PermissionPrivilege.NONE) >=
      PermissionPrivilege.READ_WRITE &&
    (newRole.permissions[PermissionCategory.ROLE] ?? PermissionPrivilege.NONE) <
      PermissionPrivilege.READ
  ) {
    throw new ServerException(403);
  }
  /** A role must require at least user write permission to be assigned */
  if (
    (newRole.requiredPermissionsToAssign[PermissionCategory.USER] ?? PermissionPrivilege.NONE) <
    PermissionPrivilege.READ_WRITE
  ) {
    throw new ServerException(403);
  }
  /** A role with user write permission must require admin privilege to be assigned */
  if (
    (newRole.permissions[PermissionCategory.USER] ?? PermissionPrivilege.NONE) >=
      PermissionPrivilege.READ_WRITE &&
    (newRole.requiredPermissionsToAssign[PermissionCategory.USER] ?? PermissionPrivilege.NONE) <
      PermissionPrivilege.ADMIN
  ) {
    throw new ServerException(403);
  }
};
