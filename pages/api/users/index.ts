import { NextApiHandler } from 'next';
import { pullCollection } from '@packages/utils/api/api';
import { User } from '@packages/data/user';
import { requirePermissions } from '@packages/utils/api/auth';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';

const collectionName = 'users';

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      await requirePermissions({ [PermissionCategory.USER]: PermissionPrivilege.READ }, req);
      await pullCollection<User>(collectionName, req, res);
    }
  } catch (e) {
    if (e instanceof Error) res.status(401).end();
    else throw e;
  }
};

export default handler;
