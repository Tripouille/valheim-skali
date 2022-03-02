import { NextApiHandler } from 'next';
import { handlerWithoutId } from '@packages/utils/api/api';
import { Role } from '@packages/data/role';

const collectionName = 'roles';

const handler: NextApiHandler = async (req, res) => {
  await handlerWithoutId<Role>(collectionName, req, res);
};

export default handler;
