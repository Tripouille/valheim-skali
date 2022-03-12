import { NextApiHandler } from 'next';
import { ServerException } from '@packages/api/common';
import getEvents from '@packages/api/events/getEvents';
import createEvent from '@packages/api/events/createEvent';

const eventsHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      await getEvents(req, res);
    } else if (req.method === 'POST') {
      await createEvent(req, res);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default eventsHandler;
