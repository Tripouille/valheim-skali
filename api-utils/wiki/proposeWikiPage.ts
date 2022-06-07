import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { getSession } from 'next-auth/react';
import { DateTime } from 'luxon';
import { requirePermissions } from 'api-utils/auth';
import db from 'api-utils/db';
import { WikiProposalInDb, wikiProposalsCollectionName } from 'data/wiki';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';
import { getWikiPageContentFromBody } from './utils';
import { ServerException } from 'api-utils/common';

const createWikiPage = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.WIKI]: wikiPrivilege.PROPOSE }, req);

  const session = await getSession({ req });
  if (!session || !session.user._id) throw new ServerException(401);

  const wikiPageContent = getWikiPageContentFromBody(req.body);
  const wikiProposal: Omit<WikiProposalInDb, '_id'> = {
    authorId: new ObjectId(session.user._id),
    proposalType: 'creation',
    status: 'proposed',
    suggestions: [{ ...wikiPageContent, date: DateTime.now().toISO() }],
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
