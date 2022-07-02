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
  WikiPageContent,
} from 'data/wiki';
import { slugify } from 'utils/format';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';

const createWikiPage = async (pageContent: WikiPageContent, wikiProposalId: string) => {
  const newWikiPage: Omit<WikiPageInDb, '_id'> = {
    title: pageContent.title,
    content: pageContent.content,
    slug: slugify(pageContent.title),
    approvalDate: DateTime.now().toISO(),
    tags: [],
  };

  const pageWithSameSlug = await db.findOne<WikiPageInDb>(wikiPagesCollectionName, {
    slug: newWikiPage.slug,
  });
  if (pageWithSameSlug) newWikiPage.slug = newWikiPage.slug + '-' + wikiProposalId;

  const newWikiPageId = await db.insert<WikiPageInDb>(wikiPagesCollectionName, newWikiPage);

  return { ...newWikiPage, _id: newWikiPageId };
};

const editWikiPage = async (
  pageContent: WikiPageContent,
  wikiProposalId: string,
  wikiPageId: string,
) => {
  const newWikiPage: Omit<WikiPageInDb, '_id' | 'approvalDate' | 'tags'> = {
    title: pageContent.title,
    content: pageContent.content,
    slug: slugify(pageContent.title),
  };

  const pageWithSameSlug = await db.findOne<WikiPageInDb>(wikiPagesCollectionName, {
    slug: newWikiPage.slug,
    _id: { $ne: new ObjectId(wikiPageId) },
  });
  if (pageWithSameSlug) newWikiPage.slug = newWikiPage.slug + '-' + wikiProposalId;

  const result = await updateOneInCollection<WikiPageInDb>(
    wikiPagesCollectionName,
    wikiPageId,
    newWikiPage,
  );
  if (!result.ok) throw new ServerException(500);

  return result.value;
};

const validateWikiProposal = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.WIKI]: wikiPrivilege.WRITE }, req);

  const { id } = req.query as { id: string };

  const wikiProposal = await db.findOne<WikiProposalInDb>(wikiProposalsCollectionName, {
    _id: new ObjectId(id),
  });
  if (!wikiProposal) throw new ServerException(404);
  if (wikiProposal.status !== 'proposed') throw new ServerException(409);

  const lastSuggestion = wikiProposal.suggestions[0];

  let newWikiPage;
  if (wikiProposal.proposalType === 'creation')
    newWikiPage = await createWikiPage(lastSuggestion, id);
  else if (wikiProposal.proposalType === 'edition')
    newWikiPage = await editWikiPage(lastSuggestion, id, wikiProposal.wikiPageId.toString());

  const updateStatusResult = await updateOneInCollection<WikiProposalInDb>(
    wikiProposalsCollectionName,
    id,
    { status: 'validated' },
  );
  if (!updateStatusResult.ok) throw new ServerException(500);

  res.status(200).json(newWikiPage);
};

export default validateWikiProposal;
