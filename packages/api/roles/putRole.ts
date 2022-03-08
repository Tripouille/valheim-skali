import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { ObjectId } from 'bson';
import {
  RoleInDb,
  rolesCollectionName,
  ROLE_NAME_IN_GAME_MAX_LENGTH,
  UpdateRoleData,
} from '@packages/data/role';
import {
  isSpecialRoleName,
  PermissionCategory,
  PermissionPrivilege,
  Permissions,
  SpecialRolesParameters,
} from '@packages/utils/auth';
import { requirePermissions } from '@packages/api/auth';
import { ServerException, updateOneInCollection } from '@packages/api/common';
import db from '../db';

const isPermissions = (value: object): value is Permissions => {
  return Object.entries(value).every(
    ([category, privilege]) =>
      Object.values(PermissionCategory).includes(category as PermissionCategory) &&
      Object.values(PermissionPrivilege).includes(privilege),
  );
};

const isUpdateRoleDataProperty = ([key, value]: [key: string, value: unknown]) => {
  return (
    (key === 'name' && typeof value === 'string') ||
    (key === 'permissions' && typeof value === 'object' && value && isPermissions(value))
  );
};

const isUpdateRoleData = (data: unknown): data is UpdateRoleData => {
  if (!data || typeof data !== 'object') return false;
  if (!Object.entries(data).every(isUpdateRoleDataProperty)) {
    return false;
  }
  return true;
};

const checkPermissionsIfRoleIsSpecial = async (
  role: RoleInDb,
  roleNewData: UpdateRoleData,
  req: Req,
) => {
  if (isSpecialRoleName(role.name)) {
    if (roleNewData.name) throw new ServerException(403);
    await requirePermissions(SpecialRolesParameters[role.name].canEdit, req);
  }
};

const getRoleNewDataForDb = (roleNewData: UpdateRoleData, role: RoleInDb): RoleInDb => {
  roleNewData.name = roleNewData.name?.substring(0, ROLE_NAME_IN_GAME_MAX_LENGTH);
  roleNewData.permissions = { ...role.permissions, ...roleNewData.permissions };
  return roleNewData as RoleInDb;
};

const checkRoleData = (newRole: RoleInDb) => {
  for (const [category, privilege] of Object.entries(newRole.permissions) as [
    PermissionCategory,
    PermissionPrivilege,
  ][]) {
    /** It is forbidden to give ADMIN or SUPER_ADMIN privileges */
    if (privilege === PermissionPrivilege.ADMIN || privilege === PermissionPrivilege.SUPER_ADMIN)
      throw new ServerException(403);
    /** Replace NONE values with undefined to not store and display them uselessly */
    if (privilege === PermissionPrivilege.NONE) delete newRole.permissions[category];
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
};

const putRole = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.ROLE]: PermissionPrivilege.READ_WRITE }, req);

  const { id } = req.query as { id: string };

  const roleNewData: unknown = req.body;
  if (!isUpdateRoleData(roleNewData)) throw new ServerException(400);

  const role = await db.findOne<RoleInDb>(rolesCollectionName, { _id: new ObjectId(id) });
  if (!role) throw new ServerException(404);

  await checkPermissionsIfRoleIsSpecial(role, roleNewData, req);

  const newRole = getRoleNewDataForDb(roleNewData, role);
  checkRoleData(newRole);

  const result = await updateOneInCollection<RoleInDb>(rolesCollectionName, id, newRole);
  if (!result.ok) throw new ServerException(500);

  res.status(200).json(result.value);
};

export default putRole;
