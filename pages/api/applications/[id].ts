import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { ServerException } from 'api-utils/common';
import setApplicationStatus from 'api-utils/applications/setApplicationStatus';
import addApplicationComment from 'api-utils/applications/addApplicationComment';
import editApplicationComment from 'api-utils/applications/editApplicationComment';
import editApplication from 'api-utils/applications/editApplication';
import deleteApplication from 'api-utils/applications/deleteApplication';

const patchApplicationComments = async (req: NextApiRequest, res: NextApiResponse) => {
  if ('_id' in req.body.comment) await editApplicationComment(req, res);
  else await addApplicationComment(req, res);
};

const applicationsHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'PUT') {
      await editApplication(req, res);
    } else if (req.method === 'PATCH') {
      if ('status' in req.body) await setApplicationStatus(req, res);
      else if ('comment' in req.body) await patchApplicationComments(req, res);
      else throw new ServerException(400);
    } else if (req.method === 'DELETE') {
      await deleteApplication(req, res);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default applicationsHandler;
