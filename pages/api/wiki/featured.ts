import { NextApiHandler } from 'next';
import { ServerException } from 'api-utils/common';
import getFeaturedWikiPages from 'api-utils/wiki/getFeaturedWikiPages';

const featuredWikiPagesHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const featuredWikiPages = await getFeaturedWikiPages();
      res.status(200).json(featuredWikiPages);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default featuredWikiPagesHandler;
