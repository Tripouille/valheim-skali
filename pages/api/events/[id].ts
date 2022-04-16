import { NextApiHandler } from 'next';
import { ServerException } from 'api/common';
import putEvent from 'api/events/putEvent';
import deleteEvent from 'api/events/deleteEvent';

const eventsHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'PUT') {
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
