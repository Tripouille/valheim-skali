import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import { ServerException, updateOneInCollection } from 'api-utils/common';
import db from 'api-utils/db';
import {
  RoleInDb,
  rolesCollectionName,
  CreateRoleData,
  isAdminRole,
  isSpecialRole,
  SpecialRoleName,
} from 'data/role';
import { rolePrivilege, PermissionCategory } from 'utils/permissions';
import {
  checkRoleData,
  isCreateRoleData,
  revalidatePermissionsDependentPages,
  transformRoleForDb,
} from './utils';

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
  await requirePermissions({ [PermissionCategory.ROLE]: rolePrivilege.ADMIN }, req);

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

  revalidatePermissionsDependentPages(res);
};

export default putRole;
