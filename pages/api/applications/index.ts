import { NextApiHandler } from 'next';
import createApplication from 'api-utils/applications/createApplication';
import getApplications from 'api-utils/applications/getApplications';
import { ServerException } from 'api-utils/common';

const applicationsHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      await getApplications(req, res);
    } else if (req.method === 'POST') {
      await createApplication(req, res);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default applicationsHandler;
