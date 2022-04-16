import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { ObjectId } from 'bson';
import { RoleInDb, rolesCollectionName } from 'data/role';
import { UserInDb, usersCollectionName } from 'data/user';
import { isSpecialRole, PermissionCategory, PermissionPrivilege } from 'utils/auth';
import { requirePermissions } from 'api/auth';
import { ServerException } from 'api/common';
import db from 'api/db';

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
