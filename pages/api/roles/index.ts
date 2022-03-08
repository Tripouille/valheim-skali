import { NextApiHandler } from 'next';
import { ServerException } from '@packages/api/common';
import getRoles from '@packages/api/roles/getRoles';

const rolesHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      await getRoles(req, res);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default rolesHandler;
