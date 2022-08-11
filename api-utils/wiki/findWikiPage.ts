import db from 'api-utils/db';
import { WikiPageInDb, wikiPagesCollectionName } from 'data/wiki';

const getResultScore = (wikiPage: WikiPageInDb, regex: RegExp) => {
  let score = wikiPage.title.search(regex);
  if (score === -1) score = wikiPage.slug.search(regex);
  return score;
};

const findWikiPage = async (searchString: string): Promise<WikiPageInDb[]> => {
  const regex = new RegExp(searchString.trim(), 'i');
  const mongoRegex = { $regex: regex };
  const wikiPages = await db.find<WikiPageInDb>(
    wikiPagesCollectionName,
    { $or: [{ title: mongoRegex }, { slug: mongoRegex }] },
    { projection: { slug: 1, title: 1 } },
  );

  wikiPages.sort((page1, page2) => getResultScore(page1, regex) - getResultScore(page2, regex));

  return wikiPages;
};

export default findWikiPage;
