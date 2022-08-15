import { NextApiHandler } from 'next';
import { ServerException } from 'api-utils/common';
import trackWikiPageView from 'api-utils/wiki/trackWikiPageView';

const trackWikiPageViewHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'PUT') {
      await trackWikiPageView(req, res);
      throw new ServerException(501);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default trackWikiPageViewHandler;
