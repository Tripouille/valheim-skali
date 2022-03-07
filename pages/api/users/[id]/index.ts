import { NextApiHandler, NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import { requirePermissions } from '@packages/api/auth';
import { ServerException } from '@packages/api/common';
import { patchUser } from '@packages/api/users/patchUser';

const userHandler: NextApiHandler = async (req: Req, res: Res) => {
  try {
    if (req.method === 'PATCH') {
      await requirePermissions({ [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE }, req);
      await patchUser(req, res);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default userHandler;
