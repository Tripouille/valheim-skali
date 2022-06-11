import { ObjectId } from 'bson';
import { DateTime } from 'luxon';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import { ServerException, updateOneInCollection } from 'api-utils/common';
import db from 'api-utils/db';
import {
  WikiPageInDb,
  wikiPagesCollectionName,
  WikiProposalInDb,
  wikiProposalsCollectionName,
  WikiSuggestion,
} from 'data/wiki';
import { slugify } from 'utils/format';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';

const validateWikiProposal = async (req: Req, res: Res) => {
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
    { status: 'validated' },
  );
  if (!updateStatusResult.ok) throw new ServerException(500);

  const lastSuggestion = wikiProposal.suggestions.at(-1) as WikiSuggestion;
  const newWikiPage: Omit<WikiPageInDb, '_id'> = {
    title: lastSuggestion.title,
    content: lastSuggestion.content,
    slug: slugify(lastSuggestion.title),
    approvalDate: DateTime.now().toISO(),
  };

  const pageWithSameSlug = await db.findOne<WikiPageInDb>(wikiPagesCollectionName, {
    slug: newWikiPage.slug,
  });
  if (pageWithSameSlug) newWikiPage.slug = newWikiPage.slug + '-' + id;

  const newWikiPageId = await db.insert<WikiPageInDb>(wikiPagesCollectionName, newWikiPage);

  res.status(200).json({ ...newWikiPage, _id: newWikiPageId });
};

export default validateWikiProposal;
