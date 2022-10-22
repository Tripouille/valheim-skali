import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { getSession } from 'next-auth/react';
import { requirePermissions } from 'api-utils/auth';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import { WikiProposalInDb, wikiProposalsCollectionName } from 'data/wiki';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';

const getWikiProposal = async (req: Req, res: Res) => {
  const { id } = req.query as { id: string };

  const wikiProposal = await db.findOne<WikiProposalInDb>(wikiProposalsCollectionName, {
    _id: new ObjectId(id),
  });
  if (!wikiProposal) throw new ServerException(404);

  const session = await getSession({ req });
  if (!session || !session.user._id) throw new ServerException(401);
  if (wikiProposal.authorId.toString() !== session.user._id) {
    await requirePermissions({ [PermissionCategory.WIKI]: wikiPrivilege.WRITE }, req);
  }

  res.status(200).json(wikiProposal);
};

export default getWikiProposal;
