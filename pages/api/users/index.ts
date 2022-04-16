import { NextApiHandler } from 'next';
import { ServerException } from '@packages/api/common';
import getUsers from '@packages/api/users/getUsers';

const usersHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') await getUsers(req, res);
    else throw new ServerException(501);
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default usersHandler;
