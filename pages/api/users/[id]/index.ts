import { NextApiHandler, NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { ObjectId } from 'bson';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import { requirePermissions } from '@packages/utils/api/auth';
import {
  UpdateUserData,
  UserInDb,
  usersCollectionName,
  UserWithInfosInDb,
  USER_NAME_IN_GAME_MAX_LENGTH,
} from '@packages/data/user';
import db from '@packages/utils/api/db';
import { ServerException, updateOneInCollection } from '@packages/utils/api/api';

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

const patchUser = async (req: Req, res: Res) => {
  const { id } = req.query as { id: string };

  const userNewData: unknown = req.body;
  if (!isUpdateUserData(userNewData)) throw new ServerException(400);

  const oldUser = await db.findOne<UserInDb>(usersCollectionName, { _id: new ObjectId(id) });
  if (!oldUser) throw new ServerException(404);

  const userNewDataForDb = getUserNewDataForDb(userNewData);

  const result = await updateOneInCollection<UserInDb>(usersCollectionName, id, userNewDataForDb);
  if (!result.ok) throw new ServerException(500);

  res.status(200).json(result.value);
};

const userHandler: NextApiHandler = async (req: Req, res: Res) => {
  try {
    if (req.method === 'PATCH') {
      await requirePermissions({ [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE }, req);
      await patchUser(req, res);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default userHandler;
