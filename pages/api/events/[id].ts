import { NextApiHandler } from 'next';
import { ServerException } from 'api-utils/common';
import deleteEvent from 'api-utils/events/deleteEvent';
import getEvent from 'api-utils/events/getEvent';
import putEvent from 'api-utils/events/putEvent';

const eventsHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      await getEvent(req, res);
    } else if (req.method === 'PUT') {
      await putEvent(req, res);
    } else if (req.method === 'DELETE') {
      await deleteEvent(req, res);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default eventsHandler;
