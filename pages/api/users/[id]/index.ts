import { NextApiHandler, NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { ServerException } from '@packages/api/common';
import patchUser from '@packages/api/users/patchUser';
import deleteUser from '@packages/api/users/deleteUser';

const userHandler: NextApiHandler = async (req: Req, res: Res) => {
  try {
    if (req.method === 'PATCH') {
      await patchUser(req, res);
    } else if (req.method === 'DELETE') {
      await deleteUser(req, res);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default userHandler;
