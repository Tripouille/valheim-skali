import { NextApiHandler, NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { ServerException } from 'api-utils/common';
import deleteUser from 'api-utils/users/deleteUser';
import patchUser from 'api-utils/users/patchUser';

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
