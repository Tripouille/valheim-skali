import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { ObjectId } from 'bson';
import {
  RoleInDb,
  rolesCollectionName,
  ROLE_NAME_IN_GAME_MAX_LENGTH,
  UpdateRoleData,
} from '@packages/data/role';
import {
  isAdminPrivilege,
  isAdminRole,
  isSpecialRole,
  PermissionCategory,
  PermissionPrivilege,
  Permissions,
} from '@packages/utils/auth';
import { requirePermissions } from '@packages/api/auth';
import { ServerException, updateOneInCollection } from '@packages/api/common';
import db from '../db';

const isPermissions = (value: unknown): value is Permissions => {
  return (
    typeof value === 'object' &&
    !!value &&
    Object.entries(value).every(
      ([category, privilege]) =>
        Object.values(PermissionCategory).includes(category as PermissionCategory) &&
        Object.values(PermissionPrivilege).includes(privilege),
    )
  );
};

const roleKeyToValueTypeCheck: Record<keyof UpdateRoleData, (value: unknown) => boolean> = {
  name: value => typeof value === 'string',
  permissions: value => isPermissions(value),
  requiredPermissionsToAssign: value => isPermissions(value),
};

const isUpdateRoleDataProperty = ([key, value]: [key: string, value: unknown]) => {
  return (
    Object.keys(roleKeyToValueTypeCheck).includes(key) &&
    roleKeyToValueTypeCheck[key as keyof UpdateRoleData](value)
  );
};

const isUpdateRoleData = (data: unknown): data is UpdateRoleData => {
  if (!data || typeof data !== 'object') return false;
  if (!Object.entries(data).every(isUpdateRoleDataProperty)) {
    return false;
  }
  return true;
};

const checkPermissionsIfRoleIsSpecial = async (role: RoleInDb, roleNewData: UpdateRoleData) => {
  if (isSpecialRole(role)) {
    if (roleNewData.name || isAdminRole(role)) throw new ServerException(403);
  }
};

const deleteNonePrivileges = (permissions: Permissions) => {
  for (const [category, privilege] of Object.entries(permissions) as [
    PermissionCategory,
    PermissionPrivilege,
  ][]) {
    if (privilege === PermissionPrivilege.NONE) delete permissions[category];
  }
};

const getRoleNewDataForDb = (roleNewData: UpdateRoleData, role: RoleInDb): RoleInDb => {
  roleNewData.name = roleNewData.name?.substring(0, ROLE_NAME_IN_GAME_MAX_LENGTH);
  roleNewData.permissions = { ...role.permissions, ...roleNewData.permissions };
  roleNewData.requiredPermissionsToAssign = {
    ...role.requiredPermissionsToAssign,
    ...roleNewData.requiredPermissionsToAssign,
  };
  deleteNonePrivileges(role.permissions);
  deleteNonePrivileges(role.requiredPermissionsToAssign);
  return roleNewData as RoleInDb;
};

const checkRoleData = (newRole: RoleInDb) => {
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

const putRole = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.ROLE]: PermissionPrivilege.READ_WRITE }, req);

  const { id } = req.query as { id: string };

  const roleNewData: unknown = req.body;
  if (!isUpdateRoleData(roleNewData)) throw new ServerException(400);

  const role = await db.findOne<RoleInDb>(rolesCollectionName, { _id: new ObjectId(id) });
  if (!role) throw new ServerException(404);

  await checkPermissionsIfRoleIsSpecial(role, roleNewData);

  const newRole = getRoleNewDataForDb(roleNewData, role);
  checkRoleData(newRole);

  const result = await updateOneInCollection<RoleInDb>(rolesCollectionName, id, newRole);
  if (!result.ok) throw new ServerException(500);

  res.status(200).json(result.value);
};

export default putRole;
