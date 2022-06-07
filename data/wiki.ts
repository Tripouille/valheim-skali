import { ObjectId } from 'bson';
import { isFilled } from 'utils/validation';

/** Types */

export interface WikiPageContent {
  title: string;
  content: string;
}

export interface WikiPage extends WikiPageContent {
  _id: string;
  slug: string;
}

export interface WikiSuggestion extends WikiPageContent {
  date: string;
}

export interface WikiProposal {
  _id: string;
  authorId: string;
  proposalType: 'creation' | 'edition';
  status: 'proposed' | 'validated' | 'rejected';
  suggestions: WikiSuggestion[];
}

export type WikiPageInDb = Omit<WikiPage, '_id'> & { _id: ObjectId };
export type WikiProposalInDb = Omit<WikiProposal, '_id' | 'authorId'> & {
  _id: ObjectId;
  authorId: ObjectId;
};

export interface WikiProposalWithAuthor extends WikiProposal {
  authorName?: string;
}

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

/** Sorting */

export const sortWikiProposals = (wikiProposals: WikiProposal[]) =>
  wikiProposals.sort((proposal1, proposal2) => {
    if (proposal1.status === 'proposed' && proposal2.status !== 'proposed') {
      return -1;
    } else if (proposal1.status !== 'proposed' && proposal2.status === 'proposed') {
      return 1;
    }
    return (proposal1.suggestions.at(-1)?.date ?? '') < (proposal2.suggestions.at(-1)?.date ?? '')
      ? 1
      : -1;
  });
