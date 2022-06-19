import { NextApiHandler } from 'next';
import { ServerException } from 'api-utils/common';
import getWikiPage from 'api-utils/wiki/getWikiPage';

const wikiPageHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const { id } = req.query as { id: string };
      const wikiPage = await getWikiPage({ id });
      res.status(200).json(wikiPage);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default wikiPageHandler;
