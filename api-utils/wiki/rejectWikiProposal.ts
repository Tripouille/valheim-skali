import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import { ServerException, updateOneInCollection } from 'api-utils/common';
import db from 'api-utils/db';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';
import { WikiProposalInDb, wikiProposalsCollectionName } from 'data/wiki';

const rejectWikiProposal = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.WIKI]: wikiPrivilege.WRITE }, req);

  const { id } = req.query as { id: string };

  const wikiProposal = await db.findOne<WikiProposalInDb>(wikiProposalsCollectionName, {
    _id: new ObjectId(id),
  });
  if (!wikiProposal) throw new ServerException(404);
  if (wikiProposal.status !== 'proposed') throw new ServerException(409);

  const updateStatusResult = await updateOneInCollection<WikiProposalInDb>(
    wikiProposalsCollectionName,
    id,
    { status: 'rejected' },
  );
  if (!updateStatusResult.ok) throw new ServerException(500);

  res.status(200).end();
};

export default rejectWikiProposal;
