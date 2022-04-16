import { NextApiHandler } from 'next';
import { ServerException } from 'api-utils/common';
import getEvents from 'api-utils/events/getEvents';
import createEvent from 'api-utils/events/createEvent';

const eventsHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const events = await getEvents(req);
      res.status(200).json(events);
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
