import { NextApiHandler, NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { ObjectId } from 'bson';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import { requirePermissions } from '@packages/utils/api/auth';
import { isUpdatableUserData, User } from '@packages/data/user';
import db from '@packages/utils/api/db';
import { ServerException, updateOneInCollection } from '@packages/utils/api/api';

const collectionName = 'users';

const putUser = async (req: Req, res: Res) => {
  const { id } = req.query as { id: string };

  const body: Partial<User> = req.body;
  if (!isUpdatableUserData(body)) throw new ServerException(400);

  const oldUser = await db.findOne<User>(collectionName, { _id: new ObjectId(id) });
  if (!oldUser) throw new ServerException(404);

  /** Ensure roles in set after this update : the returned user should be a UserWithInfos */
  const result = await updateOneInCollection<User>(collectionName, id, {
    roles: [],
    ...oldUser,
    ...body,
  });
  if (!result.ok) throw new ServerException(500);

  res.status(200).json(result.value);
};

const handler: NextApiHandler = async (req: Req, res: Res) => {
  try {
    if (req.method === 'PUT') {
      await requirePermissions({ [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE }, req);
      await putUser(req, res);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default handler;
