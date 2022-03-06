import { NextApiHandler } from 'next';
import { pullCollection, ServerException } from '@packages/utils/api/api';
import { UserInDb, usersCollectionName } from '@packages/data/user';
import { requirePermissions } from '@packages/utils/api/auth';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';

const usersHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      await requirePermissions({ [PermissionCategory.USER]: PermissionPrivilege.READ }, req);
      await pullCollection<UserInDb>(usersCollectionName, req, res);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default usersHandler;
