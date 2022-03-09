import { NextApiHandler } from 'next';
import { ServerException } from '@packages/api/common';
import putRole from '@packages/api/roles/putRole';
import deleteRole from '@packages/api/roles/deleteRole';

const rolesHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'PUT') {
      await putRole(req, res);
    } else if (req.method === 'DELETE') {
      await deleteRole(req, res);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default rolesHandler;
