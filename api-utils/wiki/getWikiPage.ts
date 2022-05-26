import { WikiPageInDb, wikiPagesCollectionName } from 'data/wiki';
import db from '../db';
import { ServerException } from 'api-utils/common';

const getWikiPage = async (slug: string) => {
  const wikiPage = await db.findOne<WikiPageInDb>(wikiPagesCollectionName, { slug });
  if (!wikiPage) throw new ServerException(404);

  return wikiPage;
};

export default getWikiPage;
