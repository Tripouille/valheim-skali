import { NextApiHandler, NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { ServerException } from 'api-utils/common';
import addOrRemoveWikiPageTag, { Action } from 'api-utils/wiki/addOrRemoveWikiPageTag';

const wikiPageTagsHandler: NextApiHandler = async (req: Req, res: Res) => {
  try {
    if (req.method === 'PATCH') {
      await addOrRemoveWikiPageTag(Action.ADD, req, res);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default wikiPageTagsHandler;
