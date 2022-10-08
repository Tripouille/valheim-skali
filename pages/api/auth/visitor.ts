import { NextApiHandler } from 'next';
import { getVisitorPermissions } from 'api-utils/auth';
import { ServerException } from 'api-utils/common';

const eventsHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const visitorPermissions = await getVisitorPermissions();
      res.status(200).json(visitorPermissions);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default eventsHandler;
