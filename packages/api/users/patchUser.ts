import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { ObjectId } from 'bson';
import {
  UpdateUserData,
  UserInDb,
  usersCollectionName,
  UserWithInfosInDb,
  USER_NAME_IN_GAME_MAX_LENGTH,
} from '@packages/data/user';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import { requirePermissions } from '@packages/api/auth';
import { ServerException, updateOneInCollection } from '@packages/api/common';
import db from '@packages/api/db';

const isUpdateUserDataProperty = ([key, value]: [key: string, value: unknown]) => {
  return key === 'nameInGame' && typeof value === 'string';
};
const isUpdateUserData = (data: unknown): data is UpdateUserData => {
  if (!data || typeof data !== 'object') return false;
  if (!Object.entries(data).every(isUpdateUserDataProperty)) {
    return false;
  }
  return true;
};

const getUserNewDataForDb = (userNewData: UpdateUserData): Partial<UserWithInfosInDb> => {
  const userNewDataForDb: Partial<UserWithInfosInDb> = {};
  if (userNewData.nameInGame !== undefined)
    userNewDataForDb.nameInGame = userNewData.nameInGame.substring(0, USER_NAME_IN_GAME_MAX_LENGTH);
  return userNewDataForDb;
};

export const patchUser = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE }, req);

  const { id } = req.query as { id: string };

  const userNewData: unknown = req.body;
  if (!isUpdateUserData(userNewData)) throw new ServerException(400);

  const oldUser = await db.findOne<UserInDb>(usersCollectionName, { _id: new ObjectId(id) });
  if (!oldUser) throw new ServerException(404);

  const result = await updateOneInCollection<UserInDb>(
    usersCollectionName,
    id,
    getUserNewDataForDb(userNewData),
  );
  if (!result.ok) throw new ServerException(500);

  res.status(200).json(result.value);
};
