import { NextApiHandler } from 'next';
import getMyApplication from 'api-utils/applications/getMyApplication';
import { ServerException } from 'api-utils/common';

const myApplicationHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      await getMyApplication(req, res);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default myApplicationHandler;
