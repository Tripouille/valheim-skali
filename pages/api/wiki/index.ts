import { NextApiHandler } from 'next';
import { ServerException } from 'api-utils/common';
import proposeWikiPage from 'api-utils/wiki/proposeWikiPage';

const wikiHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      await proposeWikiPage(req, res);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default wikiHandler;
