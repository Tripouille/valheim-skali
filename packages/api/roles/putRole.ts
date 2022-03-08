import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import {
  RoleInDb,
  rolesCollectionName,
  ROLE_NAME_IN_GAME_MAX_LENGTH,
  UpdateRoleData,
} from '@packages/data/role';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import { requirePermissions } from '@packages/api/auth';
import { ServerException, updateOneInCollection } from '@packages/api/common';

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

const getRoleNewDataForDb = (roleNewData: UpdateRoleData): Partial<RoleInDb> => {
  if (roleNewData.name !== undefined)
    roleNewData.name = roleNewData.name.substring(0, ROLE_NAME_IN_GAME_MAX_LENGTH);
  return roleNewData;
};

const putRole = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.ROLE]: PermissionPrivilege.READ_WRITE }, req);

  const { id } = req.query as { id: string };

  const roleNewData: unknown = req.body;
  if (!isUpdateRoleData(roleNewData)) throw new ServerException(400);

  const result = await updateOneInCollection<RoleInDb>(
    rolesCollectionName,
    id,
    getRoleNewDataForDb(roleNewData),
  );
  if (!result.ok) throw new ServerException(500);

  res.status(200).json(result.value);
};

export default putRole;
