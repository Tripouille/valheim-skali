import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { getSession } from 'next-auth/react';
import { DateTime } from 'luxon';
import { requirePermissions } from 'api-utils/auth';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import { WikiProposalInDb, wikiProposalsCollectionName } from 'data/wiki';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';
import { getWikiPageContentFromBody } from './utils';

const addWikiSuggestion = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.WIKI]: wikiPrivilege.PROPOSE }, req);

  const { id } = req.query as { id: string };

  const wikiProposal = await db.findOne<WikiProposalInDb>(wikiProposalsCollectionName, {
    _id: new ObjectId(id),
  });
  if (!wikiProposal) throw new ServerException(404);
  if (wikiProposal.status !== 'proposed') throw new ServerException(409);

  const session = await getSession({ req });
  if (session?.user._id !== wikiProposal.authorId.toString()) throw new ServerException(401);

  const wikiPageContent = getWikiPageContentFromBody(req.body);

  const updateWikiProposalResult = await db.updateOne<WikiProposalInDb>(
    wikiProposalsCollectionName,
    { _id: new ObjectId(id) },
    {
      $push: {
        suggestions: {
          $each: [{ ...wikiPageContent, date: DateTime.now().toISO() }],
          $sort: { date: -1 },
        },
      },
    },
  );
  if (!updateWikiProposalResult.ok) throw new ServerException(500);

  res.status(200).end();

  // TODO
  // revalidateWiki(res);
};

export default addWikiSuggestion;
