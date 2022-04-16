import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { ObjectId } from 'bson';
import {
  UpdateUserData,
  UserInDb,
  usersCollectionName,
  USER_NAME_IN_GAME_MAX_LENGTH,
} from '@packages/data/user';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import { requirePermissions } from '@packages/api/auth';
import { isRequiredObjectType, ServerException, updateOneInCollection } from '@packages/api/common';
import db from '@packages/api/db';

const updateUserKeyToValueTypeCheck: Record<keyof UpdateUserData, (value: unknown) => boolean> = {
  nameInGame: value => value === undefined || typeof value === 'string',
};

const isUpdateUserData = (data: unknown): data is UpdateUserData =>
  isRequiredObjectType(data, updateUserKeyToValueTypeCheck);

const transformUserDataForDb = (userNewData: UpdateUserData) => {
  userNewData.nameInGame = userNewData.nameInGame?.substring(0, USER_NAME_IN_GAME_MAX_LENGTH);
};

const patchUser = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE }, req);

  const { id } = req.query as { id: string };

  const userNewData: unknown = req.body;
  if (!isUpdateUserData(userNewData)) throw new ServerException(400);
  transformUserDataForDb(userNewData);

  const user = await db.findOne<UserInDb>(usersCollectionName, { _id: new ObjectId(id) });
  if (!user) throw new ServerException(404);

  const result = await updateOneInCollection<UserInDb>(usersCollectionName, id, userNewData);
  if (!result.ok) throw new ServerException(500);

  res.status(200).end();
};

export default patchUser;
