import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { WikiPageInDb, wikiPagesCollectionName } from 'data/wiki';
import { requirePermissions } from 'api-utils/auth';
import db from 'api-utils/db';
import { updateOneInCollection } from 'api-utils/common';
import { getNewWikiPageFromBody } from './utils';

const createWikiPage = async (req: Req, res: Res) => {
  await requirePermissions({}, req);

  const newWikiPage = getNewWikiPageFromBody(req.body);

  const newWikiPageId = await db.insert<WikiPageInDb>(wikiPagesCollectionName, newWikiPage);

  res.status(201).json({ ...newWikiPage, _id: newWikiPageId });

  const pageWithSameSlug = await db.findOne<WikiPageInDb>(wikiPagesCollectionName, {
    slug: newWikiPage.slug,
    _id: { $ne: new ObjectId(newWikiPageId) },
  });
  if (pageWithSameSlug)
    updateOneInCollection(wikiPagesCollectionName, newWikiPageId, {
      slug: newWikiPage.slug + '-' + newWikiPageId,
    });

  // revalidateWiki(res);
};

export default createWikiPage;
