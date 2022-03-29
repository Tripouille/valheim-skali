import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import {
  CreateRoleData,
  RoleInDb,
  rolesCollectionName,
  ROLE_NAME_IN_GAME_MAX_LENGTH,
} from '@packages/data/role';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import { requirePermissions } from '@packages/api/auth';
import { ServerException } from '@packages/api/common';
import db from '@packages/api/db';
import { checkRoleData, deleteNonePrivileges, isCreateRoleData } from './utils';

const getRoleDataForDb = (roleData: CreateRoleData): RoleInDb => {
  roleData.name = roleData.name?.substring(0, ROLE_NAME_IN_GAME_MAX_LENGTH);
  deleteNonePrivileges(roleData.permissions);
  deleteNonePrivileges(roleData.requiredPermissionsToAssign);
  return roleData as RoleInDb;
};

const createRole = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.ROLE]: PermissionPrivilege.READ_WRITE }, req);

  const roleData: unknown = req.body;
  if (!isCreateRoleData(roleData)) throw new ServerException(400);

  const newRole = getRoleDataForDb(roleData);
  checkRoleData(newRole);

  /** Name cannot already exist */
  const sameNameRole = await db.findOne<RoleInDb>(rolesCollectionName, { name: newRole.name });
  if (sameNameRole) throw new ServerException(409);

  const newRoleId = await db.insert<RoleInDb>(rolesCollectionName, newRole);

  res.status(200).json({ ...newRole, _id: newRoleId });
};

export default createRole;
