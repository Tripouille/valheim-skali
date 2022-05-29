import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import db from 'api-utils/db';
import { WikiProposal, WikiProposalInDb, wikiProposalsCollectionName } from 'data/wiki';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';
import { getWikiPageContentFromBody } from './utils';

const createWikiPage = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.WIKI]: wikiPrivilege.PROPOSE }, req);

  const wikiPageContent = getWikiPageContentFromBody(req.body);
  const wikiProposal: Omit<WikiProposal, '_id'> = {
    ...wikiPageContent,
    proposalType: 'creation',
    status: 'proposed',
  };

  const wikiProposalId = await db.insert<WikiProposalInDb>(
    wikiProposalsCollectionName,
    wikiProposal,
  );

  res.status(201).json({ ...wikiProposal, _id: wikiProposalId });

  // TODO : old code for inserting and updating slug of new wiki page, to move to validation
  // const newWikiPageId = await db.insert<WikiPageInDb>(wikiPagesCollectionName, newWikiPage);

  // res.status(201).json({ ...newWikiPage, _id: newWikiPageId });

  // const pageWithSameSlug = await db.findOne<WikiPageInDb>(wikiPagesCollectionName, {
  //   slug: newWikiPage.slug,
  //   _id: { $ne: new ObjectId(newWikiPageId) },
  // });
  // if (pageWithSameSlug)
  //   updateOneInCollection(wikiPagesCollectionName, newWikiPageId, {
  //     slug: newWikiPage.slug + '-' + newWikiPageId,
  //   });

  // TODO
  // revalidateWiki(res);
};

export default createWikiPage;
