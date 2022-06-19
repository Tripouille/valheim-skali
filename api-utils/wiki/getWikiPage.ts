import { ObjectId } from 'bson';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import { WikiPageInDb, wikiPagesCollectionName } from 'data/wiki';

const getWikiPage = async ({ slug, id }: { slug?: string; id?: string }) => {
  const wikiPage = await db.findOne<WikiPageInDb>(
    wikiPagesCollectionName,
    slug ? { slug } : { _id: new ObjectId(id) },
  );
  if (!wikiPage) throw new ServerException(404);

  return wikiPage;
};

export default getWikiPage;
