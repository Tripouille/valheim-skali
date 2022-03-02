import { NextApiHandler } from 'next';
import { handlerWithId } from '@packages/utils/api/api';
import { User } from '@packages/data/user';

const collectionName = 'users';

const handler: NextApiHandler = async (req, res) => {
  await handlerWithId<User>(collectionName, req, res);
};

export default handler;
