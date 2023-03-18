import db from 'api-utils/db';
import { WikiPageInDb, wikiPagesCollectionName } from 'data/wiki';

const getFeaturedWikiPages = async () => {
  const collection = await db.connectToCollection<WikiPageInDb>(wikiPagesCollectionName);

  return {
    lastPages: await collection
      .find()
      .project({ title: 1, approvalDate: 1, slug: 1 })
      .sort({ approvalDate: -1 })
      .limit(10)
      .toArray(),
    startingPages: await collection
      .find<WikiPageInDb>({ tags: 'starting' })
      .project({ title: 1, slug: 1 })
      .limit(10)
      .toArray(),
    essentialPages: await collection
      .find<WikiPageInDb>({ tags: 'essential' })
      .project({ title: 1, slug: 1 })
      .limit(10)
      .toArray(),
    popularPages: await collection
      .find()
      .project({ title: 1, slug: 1 })
      .sort({ views: -1 })
      .limit(10)
      .toArray(),
  };
};

export default getFeaturedWikiPages;
