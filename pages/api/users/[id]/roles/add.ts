import { NextApiHandler, NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { ObjectId } from 'bson';
import {
  isSpecialRoleName,
  PermissionCategory,
  PermissionPrivilege,
  SpecialRolesParameters,
} from '@packages/utils/auth';
import { requirePermissions } from '@packages/utils/api/auth';
import { isUpdateUserRolesData, UserInDb, usersCollectionName } from '@packages/data/user';
import db from '@packages/utils/api/db';
import { ServerException, updateOneInCollection } from '@packages/utils/api/api';
import { Role, rolesCollectionName } from '@packages/data/role';

const addRoleToUser = async (req: Req, res: Res) => {
  const { id } = req.query as { id: string };

  if (!isUpdateUserRolesData(req.body)) throw new ServerException(400);
  const roleToAddId = new ObjectId(req.body.roleId);

  const user = await db.findOne<UserInDb>(usersCollectionName, { _id: new ObjectId(id) });
  if (!user) throw new ServerException(404);
  const userOldRoles = 'roleIds' in user ? user.roleIds : [];

  const roleToAdd = await db.findOne<Role>(rolesCollectionName, { _id: roleToAddId });
  if (!roleToAdd) throw new ServerException(404);

  if (isSpecialRoleName(roleToAdd.name)) {
    await requirePermissions(SpecialRolesParameters[roleToAdd.name].canAssign, req);
  }

  const result = await updateOneInCollection<UserInDb>(usersCollectionName, id, {
    roleIds: [...userOldRoles, roleToAddId],
  });
  if (!result.ok) throw new ServerException(500);

  res.status(200).json(result.value);
};

const userRolesHandler: NextApiHandler = async (req: Req, res: Res) => {
  try {
    if (req.method === 'PATCH') {
      await requirePermissions({ [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE }, req);
      await addRoleToUser(req, res);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default userRolesHandler;
