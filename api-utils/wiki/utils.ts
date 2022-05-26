import {
  CreateWikiPageData,
  CreateWikiPageDataWithSlug,
  getWikiPageValidationError,
  WIKI_PAGE_VALUES_MAX_LENGTH,
} from 'data/wiki';
import { isRequiredObjectType, ServerException } from 'api-utils/common';
import { slugify } from 'utils/format';

const wikiPageKeyToValueTypeCheck: Record<keyof CreateWikiPageData, (value: unknown) => boolean> = {
  title: value => typeof value === 'string',
  content: value => typeof value === 'string',
};

const isCreateWikiPageData = (data: unknown): data is CreateWikiPageData =>
  isRequiredObjectType(data, wikiPageKeyToValueTypeCheck);

const isValidWikiPage = (wikiPageData: CreateWikiPageData) =>
  getWikiPageValidationError(wikiPageData) === null;

const shortenTextData = (newWikiPage: CreateWikiPageData) => {
  newWikiPage.title = newWikiPage.title.substring(0, WIKI_PAGE_VALUES_MAX_LENGTH.title);
  newWikiPage.content = newWikiPage.content.substring(0, WIKI_PAGE_VALUES_MAX_LENGTH.content);
};

export const getNewWikiPageFromBody = (body: unknown): CreateWikiPageDataWithSlug => {
  if (!isCreateWikiPageData(body)) throw new ServerException(400);
  if (!isValidWikiPage(body)) throw new ServerException(400);

  const newWikiPage: CreateWikiPageDataWithSlug = { ...body, slug: slugify(body.title) };
  shortenTextData(newWikiPage);

  return newWikiPage;
};
