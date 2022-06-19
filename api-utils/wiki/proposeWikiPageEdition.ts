import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { getSession } from 'next-auth/react';
import { DateTime } from 'luxon';
import { requirePermissions } from 'api-utils/auth';
import db from 'api-utils/db';
import { WikiEditionProposalInDb, wikiProposalsCollectionName } from 'data/wiki';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';
import { getWikiPageContentFromBody } from './utils';
import { ServerException } from 'api-utils/common';

const proposeWikiPageEdition = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.WIKI]: wikiPrivilege.PROPOSE }, req);

  const { id: wikiPageId } = req.query as { id: string };

  const session = await getSession({ req });
  if (!session || !session.user._id) throw new ServerException(401);

  const wikiPageContent = getWikiPageContentFromBody(req.body);
  const wikiProposal: Omit<WikiEditionProposalInDb, '_id'> = {
    authorId: new ObjectId(session.user._id),
    proposalType: 'edition',
    wikiPageId: new ObjectId(wikiPageId),
    status: 'proposed',
    suggestions: [{ ...wikiPageContent, date: DateTime.now().toISO() }],
  };

  const wikiProposalId = await db.insert<WikiEditionProposalInDb>(
    wikiProposalsCollectionName,
    wikiProposal,
  );

  res.status(201).json({ ...wikiProposal, _id: wikiProposalId });

  // TODO
  // revalidateWiki(res);
};

export default proposeWikiPageEdition;
