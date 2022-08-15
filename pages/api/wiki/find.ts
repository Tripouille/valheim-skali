import { NextApiHandler } from 'next';
import { isRequiredObjectType, ServerException } from 'api-utils/common';
import findWikiPage from 'api-utils/wiki/findWikiPage';

interface WikiPageSearch {
  searchString: string;
}

const searchKeyToValueTypeCheck: Record<keyof WikiPageSearch, (value: unknown) => boolean> = {
  searchString: value => typeof value === 'string',
};

const getSearchString = (body: unknown) => {
  if (!isRequiredObjectType(body, searchKeyToValueTypeCheck)) throw new ServerException(400);
  return body.searchString;
};

const wikiPageFindHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const searchString = getSearchString(req.body);
      const wikiPages = await findWikiPage(searchString);
      res.status(200).json(wikiPages);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default wikiPageFindHandler;
