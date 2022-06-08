import {
  getWikiPageValidationError,
  WIKI_PAGE_VALUES_MAX_LENGTH,
  WikiPageContent,
} from 'data/wiki';
import { isRequiredObjectType, ServerException } from 'api-utils/common';

const wikiPageContentKeyToValueTypeCheck: Record<
  keyof WikiPageContent,
  (value: unknown) => boolean
> = {
  title: value => typeof value === 'string',
  content: value => typeof value === 'string',
};

const isWikiPageContent = (data: unknown): data is WikiPageContent =>
  isRequiredObjectType(data, wikiPageContentKeyToValueTypeCheck);

const isValidWikiPageContent = (wikiPageData: WikiPageContent) =>
  getWikiPageValidationError(wikiPageData) === null;

const shortenTextData = (newWikiPage: WikiPageContent) => {
  newWikiPage.title = newWikiPage.title.substring(0, WIKI_PAGE_VALUES_MAX_LENGTH.title);
  newWikiPage.content = newWikiPage.content.substring(0, WIKI_PAGE_VALUES_MAX_LENGTH.content);
};

export const getWikiPageContentFromBody = (body: unknown): WikiPageContent => {
  if (!isWikiPageContent(body)) throw new ServerException(400);
  if (!isValidWikiPageContent(body)) throw new ServerException(400);
  shortenTextData(body);

  return body;
};