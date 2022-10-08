import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import { isRequiredObjectType, ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import {
  UpdateWikiPageTagsData,
  WikiPageInDb,
  wikiPagesCollectionName,
  WikiPageTag,
  wikiPageTags,
} from 'data/wiki';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';
import { revalidateWikiPage } from './utils';

export enum Action {
  ADD,
  REMOVE,
}

const updateWikiPageTagsKeyToValueTypeCheck: Record<
  keyof UpdateWikiPageTagsData,
  (value: unknown) => boolean
> = {
  tag: value => typeof value === 'string' && wikiPageTags.includes(value as WikiPageTag),
};

const isUpdateWikiPageTagsData = (data: unknown): data is UpdateWikiPageTagsData =>
  isRequiredObjectType(data, updateWikiPageTagsKeyToValueTypeCheck);

const addOrRemoveWikiPageTag = async (action: Action, req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.WIKI]: wikiPrivilege.WRITE }, req);

  const { id } = req.query as { id: string };

  if (!isUpdateWikiPageTagsData(req.body)) throw new ServerException(400);
  const tag = req.body.tag;

  const wikiPage = await db.findOne<WikiPageInDb>(wikiPagesCollectionName, {
    _id: new ObjectId(id),
  });
  if (!wikiPage) throw new ServerException(404);

  const wikiPageOldTags = wikiPage.tags;

  const wikiPageHasTag = wikiPageOldTags.includes(tag);
  if (action === Action.REMOVE && !wikiPageHasTag) throw new ServerException(404);
  if (action === Action.ADD && wikiPageHasTag) throw new ServerException(409);

  const result = await db.updateOne<WikiPageInDb>(
    wikiPagesCollectionName,
    { _id: new ObjectId(id) },
    action === Action.ADD ? { $push: { tags: tag } } : { $pull: { tags: tag } },
  );
  if (!result.ok) throw new ServerException(500);

  res.status(200).end();

  revalidateWikiPage('featured', res);
};

export default addOrRemoveWikiPageTag;
