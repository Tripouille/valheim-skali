import { ObjectId } from 'bson';
import { isFilled } from 'utils/validation';
import { User } from './user';

/** Types */

export interface WikiPageContent {
  title: string;
  content: string;
}

export interface WikiPage extends WikiPageContent {
  _id: string;
  slug: string;
  approvalDate: string;
}

export interface WikiSuggestion extends WikiPageContent {
  date: string;
}

interface WikiProposalBase {
  _id: string;
  authorId: string;
  status: 'proposed' | 'validated' | 'rejected';
  suggestions: WikiSuggestion[];
}

export interface WikiCreationProposal extends WikiProposalBase {
  proposalType: 'creation';
}

export interface WikiEditionProposal extends WikiProposalBase {
  proposalType: 'edition';
  wikiPageId: string;
}

export type WikiProposal = WikiCreationProposal | WikiEditionProposal;

export type WikiPageInDb = Omit<WikiPage, '_id'> & { _id: ObjectId };

export type WikiCreationProposalInDb = Omit<WikiCreationProposal, '_id' | 'authorId'> & {
  _id: ObjectId;
  authorId: ObjectId;
};

export type WikiEditionProposalInDb = Omit<
  WikiEditionProposal,
  '_id' | 'authorId' | 'wikiPageId'
> & {
  _id: ObjectId;
  authorId: ObjectId;
  wikiPageId: ObjectId;
};

export type WikiProposalInDb = WikiCreationProposalInDb | WikiEditionProposalInDb;

export type WikiProposalWithAuthor = WikiProposal & {
  authorName?: string;
};

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
  content: 15000,
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

/** Completing data with author */

export const getWikiProposalWithAuthorName = (wikiProposal: WikiProposal, users?: User[]) => {
  let authorName;
  if (users) {
    const author = users.find(user => user._id === wikiProposal.authorId);
    if (author) authorName = author.nameInGame ?? author.name;
  }
  return { ...wikiProposal, authorName };
};
