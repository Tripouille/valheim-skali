import { NextApiHandler } from 'next';
import { ServerException } from 'api/common';
import putRole from 'api/roles/putRole';
import deleteRole from 'api/roles/deleteRole';

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
