import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { ObjectId } from 'bson';
import {
  RoleInDb,
  rolesCollectionName,
  ROLE_NAME_IN_GAME_MAX_LENGTH,
  UpdateRoleData,
} from '@packages/data/role';
import {
  isAdminRole,
  isSpecialRole,
  PermissionCategory,
  PermissionPrivilege,
} from '@packages/utils/auth';
import { requirePermissions } from '@packages/api/auth';
import { ServerException, updateOneInCollection } from '@packages/api/common';
import db from '../db';
import { checkRoleData, deleteNonePrivileges, roleKeyToValueTypeCheck } from './utils';

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

const getRoleNewDataForDb = (roleNewData: UpdateRoleData, role: RoleInDb): RoleInDb => {
  roleNewData.name = roleNewData.name?.substring(0, ROLE_NAME_IN_GAME_MAX_LENGTH);
  roleNewData.permissions = { ...role.permissions, ...roleNewData.permissions };
  roleNewData.requiredPermissionsToAssign = {
    ...role.requiredPermissionsToAssign,
    ...roleNewData.requiredPermissionsToAssign,
  };
  deleteNonePrivileges(roleNewData.permissions);
  deleteNonePrivileges(roleNewData.requiredPermissionsToAssign);
  return roleNewData as RoleInDb;
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

  /** Name cannot already exist */
  const sameNameRole = await db.findOne<RoleInDb>(rolesCollectionName, {
    name: newRole.name,
    _id: { $ne: new ObjectId(id) },
  });
  if (sameNameRole) throw new ServerException(409);

  const result = await updateOneInCollection<RoleInDb>(rolesCollectionName, id, newRole);
  if (!result.ok) throw new ServerException(500);

  res.status(200).json(result.value);
};

export default putRole;
