import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { ObjectId } from 'bson';
import { RoleInDb, rolesCollectionName } from '@packages/data/role';
import { UserInDb, usersCollectionName } from '@packages/data/user';
import { isSpecialRole, PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import { requirePermissions } from '@packages/api/auth';
import { ServerException } from '@packages/api/common';
import db from '@packages/api/db';

const deleteRole = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.ROLE]: PermissionPrivilege.READ_WRITE }, req);

  const { id } = req.query as { id: string };

  const role = await db.findOne<RoleInDb>(rolesCollectionName, { _id: new ObjectId(id) });
  if (!role) throw new ServerException(404);

  if (isSpecialRole(role)) throw new ServerException(403);

  /** Check that no user has this role */
  const userWithRole = await db.findOne<UserInDb>(usersCollectionName, {
    roleIds: new ObjectId(id),
  });
  if (userWithRole) throw new ServerException(409);

  await db.remove<RoleInDb>(rolesCollectionName, id);

  res.status(200).end();
};

export default deleteRole;