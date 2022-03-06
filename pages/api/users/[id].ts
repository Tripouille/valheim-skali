import { NextApiHandler, NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { ObjectId } from 'bson';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import { requirePermissions } from '@packages/utils/api/auth';
import {
  isUpdatableUserData,
  UpdatedUserPartialData,
  UserInDb,
  UserWithInfosInDb,
  USER_NAME_IN_GAME_MAX_LENGTH,
} from '@packages/data/user';
import db from '@packages/utils/api/db';
import { ServerException, updateOneInCollection } from '@packages/utils/api/api';

const collectionName = 'users';

const getUserNewDataForDb = (userNewData: UpdatedUserPartialData): Partial<UserWithInfosInDb> => {
  const userNewDataForDb: Partial<UserWithInfosInDb> = {};
  if (userNewData.roleIds)
    userNewDataForDb.roleIds = userNewData.roleIds.map(roleId => new ObjectId(roleId));
  if (userNewData.nameInGame)
    userNewDataForDb.nameInGame = userNewData.nameInGame.substring(0, USER_NAME_IN_GAME_MAX_LENGTH);
  return userNewDataForDb;
};

const patchUser = async (req: Req, res: Res) => {
  const { id } = req.query as { id: string };

  const userNewData: unknown = req.body;
  if (!isUpdatableUserData(userNewData)) throw new ServerException(400);

  const oldUser = await db.findOne<UserInDb>(collectionName, { _id: new ObjectId(id) });
  if (!oldUser) throw new ServerException(404);

  const userNewDataForDb = getUserNewDataForDb(userNewData);

  const result = await updateOneInCollection<UserInDb>(collectionName, id, {
    ...oldUser,
    ...userNewDataForDb,
  });
  if (!result.ok) throw new ServerException(500);

  res.status(200).json(result.value);
};

const handler: NextApiHandler = async (req: Req, res: Res) => {
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

export default handler;
