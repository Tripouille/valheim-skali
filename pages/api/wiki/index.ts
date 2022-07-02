import { NextApiHandler } from 'next';
import { ServerException } from 'api-utils/common';
import getWikiPages from 'api-utils/wiki/getWikiPages';

const wikiPagesHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const wikiPages = await getWikiPages();
      res.status(200).json(wikiPages);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default wikiPagesHandler;
