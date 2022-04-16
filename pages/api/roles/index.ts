import { NextApiHandler } from 'next';
import { ServerException } from 'api-utils/common';
import getRoles from 'api-utils/roles/getRoles';
import createRole from 'api-utils/roles/createRole';

const rolesHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      await getRoles(req, res);
    } else if (req.method === 'POST') {
      await createRole(req, res);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default rolesHandler;
