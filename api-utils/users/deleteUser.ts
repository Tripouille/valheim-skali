import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { ObjectId } from 'bson';
import { UserInDb, usersCollectionName } from 'data/user';
import { RoleInDb, rolesCollectionName } from 'data/role';
import { PermissionCategory, userPrivilege } from 'utils/permissions';
import { requirePermissions } from 'api-utils/auth';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';

const deleteUser = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.USER]: userPrivilege.READ_WRITE }, req);

  const { id } = req.query as { id: string };

  const user = await db.findOne<UserInDb>(usersCollectionName, { _id: new ObjectId(id) });
  if (!user) throw new ServerException(404);

  const userRoleIds = user.roleIds ?? [];
  const userRoles: RoleInDb[] = await db.find<RoleInDb>(rolesCollectionName, {
    _id: { $in: userRoleIds },
  });
  for (const userRole of userRoles) {
    await requirePermissions(userRole.requiredPermissionsToAssign, req);
  }

  await db.remove<UserInDb>(usersCollectionName, id);

  res.status(200).end();
};

export default deleteUser;
