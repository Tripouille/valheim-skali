import { NextApiHandler } from 'next';
import { Role, rolesCollectionName } from '@packages/data/role';
import { requirePermissions } from '@packages/utils/api/auth';
import { pullCollection, ServerException } from '@packages/utils/api/api';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';

const rolesHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      await requirePermissions({ [PermissionCategory.ROLE]: PermissionPrivilege.READ }, req);
      await pullCollection<Role>(rolesCollectionName, req, res);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default rolesHandler;
