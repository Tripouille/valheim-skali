import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { ObjectId } from 'bson';
import { Role, rolesCollectionName } from 'data/role';
import { UpdateUserRolesData, UserInDb, usersCollectionName } from 'data/user';
import { PermissionCategory, rolePrivilege, userPrivilege } from 'utils/permissions';
import { isRequiredObjectType, ServerException, updateOneInCollection } from 'api-utils/common';
import { requirePermissions } from 'api-utils/auth';
import db from 'api-utils/db';

export enum Action {
  ADD,
  REMOVE,
}

const updateUserRolesKeyToValueTypeCheck: Record<
  keyof UpdateUserRolesData,
  (value: unknown) => boolean
> = {
  roleId: value => typeof value === 'string',
};

const isUpdateUserRolesData = (data: unknown): data is UpdateUserRolesData =>
  isRequiredObjectType(data, updateUserRolesKeyToValueTypeCheck);

const getUserNewRoles: Record<
  Action,
  (oldRoles: ObjectId[], roleToMoveId: ObjectId) => ObjectId[]
> = {
  [Action.ADD]: (oldRoles, roleToAddId) => [...oldRoles, roleToAddId],
  [Action.REMOVE]: (oldRoles, roleToRemoveId) =>
    oldRoles.filter(roleId => !roleId.equals(roleToRemoveId)),
};

const addOrRemoveRoleToUser = async (action: Action, req: Req, res: Res) => {
  await requirePermissions(
    {
      [PermissionCategory.USER]: userPrivilege.READ_WRITE,
      [PermissionCategory.ROLE]: rolePrivilege.READ,
    },
    req,
  );

  const { id } = req.query as { id: string };

  if (!isUpdateUserRolesData(req.body)) throw new ServerException(400);
  const roleToMoveId = new ObjectId(req.body.roleId);

  const user = await db.findOne<UserInDb>(usersCollectionName, { _id: new ObjectId(id) });
  if (!user) throw new ServerException(404);

  const userOldRoleIds = user.roleIds ?? [];

  const userHasRole = userOldRoleIds.some(roleId => roleId.equals(roleToMoveId));
  if (action === Action.REMOVE && !userHasRole) throw new ServerException(404);
  if (action === Action.ADD && userHasRole) throw new ServerException(409);

  const roleToMove = await db.findOne<Role>(rolesCollectionName, { _id: roleToMoveId });
  if (!roleToMove) throw new ServerException(404);

  await requirePermissions(roleToMove.requiredPermissionsToAssign, req);

  const result = await updateOneInCollection<UserInDb>(usersCollectionName, id, {
    roleIds: getUserNewRoles[action](userOldRoleIds, roleToMoveId),
  });
  if (!result.ok) throw new ServerException(500);

  res.status(200).end();
};

export default addOrRemoveRoleToUser;
