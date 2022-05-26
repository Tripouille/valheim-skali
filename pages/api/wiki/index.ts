import { NextApiHandler } from 'next';
import { ServerException } from 'api-utils/common';
import createWikiPage from 'api-utils/wiki/createWikiPage';

const wikiHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      await createWikiPage(req, res);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default wikiHandler;
