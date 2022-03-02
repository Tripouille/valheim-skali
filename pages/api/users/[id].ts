import { NextApiHandler } from 'next';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import { patchOneInCollection } from '@packages/utils/api/api';
import { requirePermissions } from '@packages/utils/api/auth';

const collectionName = 'users';

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'PATCH') {
      await requirePermissions({ [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE }, req);
      await patchOneInCollection(collectionName, req, res);
    }
  } catch (e) {
    if (e instanceof Error) res.status(401).end();
    else throw e;
  }
};

export default handler;
