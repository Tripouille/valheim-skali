import { ObjectId } from 'bson';
import { isFilled } from 'utils/validation';

/** Main types */

export interface WikiPageContent {
  title: string;
  content: string;
}
export interface WikiPage extends WikiPageContent {
  _id: string;
  slug: string;
}
export interface WikiProposal extends WikiPageContent {
  _id: string;
  proposalType: 'creation' | 'edition';
  status: 'proposed' | 'validated' | 'rejected';
}

export type WikiPageInDb = Omit<WikiPage, '_id'> & { _id: ObjectId };
export type WikiProposalInDb = Omit<WikiProposal, '_id'> & { _id: ObjectId };

/** Database */

export const wikiPagesCollectionName = 'wikiPages';
export const wikiProposalsCollectionName = 'wikiProposals';

/** Data validation */

export const getWikiPageValidationError = (pageData: Partial<WikiPageContent>): string | null => {
  if (!isFilled(pageData.title)) return 'Le titre est obligatoire.';
  if (!isFilled(pageData.content)) return 'Le contenu est obligatoire.';
  return null;
};

/** Data max length */

export const WIKI_PAGE_VALUES_MAX_LENGTH: Record<keyof WikiPageContent, number> = {
  title: 150,
  content: 5000,
};
