import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { ObjectId } from 'bson';
import { Role, rolesCollectionName } from '@packages/data/role';
import { UpdateUserRolesData, UserInDb, usersCollectionName } from '@packages/data/user';
import { hasOwnProperty } from '@packages/utils/types';
import {
  isSpecialRoleName,
  PermissionCategory,
  PermissionPrivilege,
  SpecialRolesParameters,
} from '@packages/utils/auth';
import { ServerException, updateOneInCollection } from '@packages/api/common';
import { requirePermissions } from '@packages/api/auth';
import db from '@packages/api/db';

export enum Action {
  ADD,
  REMOVE,
}

const getUserNewRoles: Record<
  Action,
  (oldRoles: ObjectId[], roleToMoveId: ObjectId) => ObjectId[]
> = {
  [Action.ADD]: (oldRoles, roleToAddId) => [...oldRoles, roleToAddId],
  [Action.REMOVE]: (oldRoles, roleToRemoveId) =>
    oldRoles.filter(roleId => !roleId.equals(roleToRemoveId)),
};

const isUpdateUserRolesData = (data: unknown): data is UpdateUserRolesData => {
  return (
    !!data &&
    typeof data === 'object' &&
    hasOwnProperty(data, 'roleId') &&
    typeof data.roleId === 'string'
  );
};

export const addOrRemoveRoleToUser = async (action: Action, req: Req, res: Res) => {
  await requirePermissions(
    {
      [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE,
      [PermissionCategory.ROLE]: PermissionPrivilege.READ,
    },
    req,
  );

  const { id } = req.query as { id: string };

  if (!isUpdateUserRolesData(req.body)) throw new ServerException(400);
  const roleToMoveId = new ObjectId(req.body.roleId);

  const user = await db.findOne<UserInDb>(usersCollectionName, { _id: new ObjectId(id) });
  if (!user) throw new ServerException(404);

  const userOldRoles = 'roleIds' in user ? user.roleIds : [];
  if (action === Action.REMOVE && !userOldRoles.some(roleId => roleId.equals(roleToMoveId)))
    throw new ServerException(404);

  const roleToMove = await db.findOne<Role>(rolesCollectionName, { _id: roleToMoveId });
  if (!roleToMove) throw new ServerException(404);

  if (isSpecialRoleName(roleToMove.name)) {
    await requirePermissions(SpecialRolesParameters[roleToMove.name].canAssign, req);
  }

  const result = await updateOneInCollection<UserInDb>(usersCollectionName, id, {
    roleIds: getUserNewRoles[action](userOldRoles, roleToMoveId),
  });
  if (!result.ok) throw new ServerException(500);

  res.status(200).json(result.value);
};
