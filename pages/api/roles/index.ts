import { NextApiHandler } from 'next';
import { Role, rolesCollectionName } from '@packages/data/role';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import { requirePermissions } from '@packages/api/auth';
import { pullCollection, ServerException } from '@packages/api/common';

const rolesHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      await requirePermissions({ [PermissionCategory.ROLE]: PermissionPrivilege.READ }, req);
      await pullCollection<Role>(rolesCollectionName, req, res);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default rolesHandler;
