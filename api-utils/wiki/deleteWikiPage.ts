import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import { WikiPageInDb, wikiPagesCollectionName, wikiProposalsCollectionName } from 'data/wiki';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';
import { revalidateWikiPage } from './utils';

const deleteWikiPage = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.WIKI]: wikiPrivilege.WRITE }, req);

  const { id } = req.query as { id: string };

  const wikiPage = await db.findOne<WikiPageInDb>(wikiPagesCollectionName, {
    _id: new ObjectId(id),
  });
  if (!wikiPage) throw new ServerException(404);

  await db.remove<WikiPageInDb>(wikiPagesCollectionName, id);

  const wikiProposalsCollection = await db.connectToCollection<WikiPageInDb>(
    wikiProposalsCollectionName,
  );
  await wikiProposalsCollection.deleteMany({ wikiPageId: new ObjectId(id) });

  res.status(200).end();

  revalidateWikiPage(wikiPage.slug, res);
  revalidateWikiPage('featured', res);
};

export default deleteWikiPage;
