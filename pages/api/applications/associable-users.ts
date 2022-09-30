import { NextApiHandler } from 'next';
import getAssociableUsers from 'api-utils/applications/getAssociableUsers';
import { ServerException } from 'api-utils/common';

const applicationsUsersHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      await getAssociableUsers(req, res);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default applicationsUsersHandler;
