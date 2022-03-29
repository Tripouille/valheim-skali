import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { ObjectId } from 'bson';
import { RoleInDb, rolesCollectionName, CreateRoleData } from '@packages/data/role';
import {
  isAdminRole,
  isSpecialRole,
  PermissionCategory,
  PermissionPrivilege,
  SpecialRoleName,
} from '@packages/utils/auth';
import { requirePermissions } from '@packages/api/auth';
import { ServerException, updateOneInCollection } from '@packages/api/common';
import db from '@packages/api/db';
import { checkRoleData, isCreateRoleData, transformRoleForDb } from './utils';

const checkPermissionsIfRoleIsSpecial = async (role: RoleInDb, roleNewData: CreateRoleData) => {
  if (isSpecialRole(role)) {
    if (
      roleNewData.name !== role.name ||
      (role.name === SpecialRoleName.VISITOR &&
        roleNewData.requiredPermissionsToAssign &&
        roleNewData.requiredPermissionsToAssign[PermissionCategory.USER] !==
          role.requiredPermissionsToAssign[PermissionCategory.USER]) ||
      isAdminRole(role)
    )
      throw new ServerException(403);
  }
};

const putRole = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.ROLE]: PermissionPrivilege.READ_WRITE }, req);

  const { id } = req.query as { id: string };

  const newRole: unknown = req.body;
  if (!isCreateRoleData(newRole)) throw new ServerException(400);

  const role = await db.findOne<RoleInDb>(rolesCollectionName, { _id: new ObjectId(id) });
  if (!role) throw new ServerException(404);

  await checkPermissionsIfRoleIsSpecial(role, newRole);

  transformRoleForDb(newRole);
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
