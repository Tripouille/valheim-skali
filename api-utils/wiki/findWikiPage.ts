import db from 'api-utils/db';
import { WikiPageInDb, wikiPagesCollectionName } from 'data/wiki';

const findWikiPage = async (searchString: string): Promise<WikiPageInDb[]> => {
  const wikiPages = await db.find<WikiPageInDb>(
    wikiPagesCollectionName,
    { $or: [{ title: searchString }, { slug: searchString }] },
    { projection: { slug: 1 } },
  );

  return wikiPages;
};

export default findWikiPage;
