import { WikiPageInDb, wikiPagesCollectionName } from 'data/wiki';
import db from '../db';

const getWikiPages = async () => {
  const wikiPages = await db.find<WikiPageInDb>(wikiPagesCollectionName);
  return wikiPages;
};

export default getWikiPages;
