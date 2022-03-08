import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { ObjectId } from 'bson';
import { UserInDb, usersCollectionName } from '@packages/data/user';
import { RoleInDb, rolesCollectionName } from '@packages/data/role';
import {
  isSpecialRole,
  PermissionCategory,
  PermissionPrivilege,
  SpecialRolesParameters,
} from '@packages/utils/auth';
import { requirePermissions } from '@packages/api/auth';
import { ServerException } from '@packages/api/common';
import db from '@packages/api/db';

const deleteUser = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE }, req);

  const { id } = req.query as { id: string };

  const user = await db.findOne<UserInDb>(usersCollectionName, { _id: new ObjectId(id) });
  if (!user) throw new ServerException(404);

  const userRoleIds = user.roleIds ?? [];
  const userRoles: RoleInDb[] = await db.find(rolesCollectionName, {
    _id: { $in: userRoleIds },
  });
  for (const userRole of userRoles) {
    if (isSpecialRole(userRole)) {
      await requirePermissions(SpecialRolesParameters[userRole.name].canAssign, req);
    }
  }

  await db.remove<UserInDb>(usersCollectionName, id);

  res.status(200).end();
};

export default deleteUser;
