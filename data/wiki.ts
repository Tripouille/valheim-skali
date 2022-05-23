import { ObjectId } from 'bson';
import { isFilled } from 'utils/validation';

/** Main types */

export interface WikiPage {
  _id: string;
  title: string;
  content: string;
}

export type WikiPageInDb = Omit<WikiPage, '_id'> & { _id: ObjectId };

export type CreateWikiPageData = Omit<WikiPage, '_id'>;

/** Database */

export const wikiPagesCollectionName = 'wikiPages';

/** Data validation */

export const getWikiPageValidationError = (
  pageData: Partial<CreateWikiPageData>,
): string | null => {
  if (!isFilled(pageData.title)) return 'Le titre est obligatoire.';
  if (!isFilled(pageData.content)) return 'Le contenu est obligatoire.';
  return null;
};

/** Data max length */

export const WIKI_PAGE_VALUES_MAX_LENGTH: Record<keyof CreateWikiPageData, number> = {
  title: 150,
  content: 5000,
};
