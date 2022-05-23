import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import db from 'api-utils/db';
import { WikiPageInDb, wikiPagesCollectionName } from 'data/wiki';
import { getNewWikiPageFromBody } from './utils';

const createWikiPage = async (req: Req, res: Res) => {
  await requirePermissions({}, req);

  const newWikiPage = getNewWikiPageFromBody(req.body);

  const newWikiPageId = await db.insert<WikiPageInDb>(wikiPagesCollectionName, newWikiPage);

  res.status(201).json({ ...newWikiPage, _id: newWikiPageId });

  // revalidateWiki(res);
};

export default createWikiPage;
