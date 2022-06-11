import db from 'api-utils/db';
import { WikiPageInDb, wikiPagesCollectionName } from 'data/wiki';

const getFeaturedWikiPages = async () => {
  const collection = await db.connectToCollection<WikiPageInDb>(wikiPagesCollectionName);

  return {
    lastPages: await collection
      .find()
      .project({ title: 1, approvalDate: 1 })
      .sort({ approvalDate: -1 })
      .limit(5)
      .toArray(),
    startingPages: await collection
      .find({ tags: 'starting' })
      .project({ title: 1, approvalDate: 1 })
      .limit(5)
      .toArray(),
    essentialPages: await collection
      .find({ tags: 'essential' })
      .project({ title: 1, approvalDate: 1 })
      .limit(5)
      .toArray(),
    popularPages: await collection
      .find()
      .project({ title: 1, approvalDate: 1 })
      .sort({ views: -1 })
      .limit(5)
      .toArray(),
  };
};

export default getFeaturedWikiPages;
