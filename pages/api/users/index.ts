import { NextApiHandler } from 'next';
import { handlerWithoutId } from '@packages/utils/api';
import { User } from '@packages/data/user';

const collectionName = 'users';

const handler: NextApiHandler = async (req, res) => {
  await handlerWithoutId<User>(collectionName, req, res);
};

export default handler;
