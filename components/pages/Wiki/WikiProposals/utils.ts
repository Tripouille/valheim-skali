import { WikiPage, WikiPageContent, WikiProposal } from 'data/wiki';
import { debounce } from 'utils/delay';

export const getWikiFormDataLocalStorageKey = ({
  wikiProposal,
  wikiPage,
}: {
  wikiProposal?: WikiProposal;
  wikiPage?: WikiPage;
}) => {
  let storageKey = 'wikiFormData-';
  if (wikiProposal) storageKey += wikiProposal._id;
  else if (wikiPage) storageKey += wikiPage._id;
  else storageKey += 'new';
  return storageKey;
};

export const saveWikiFormDataToLocalStorage = debounce(
  ({
    wikiFormData,
    wikiProposal,
    wikiPage,
  }: {
    wikiFormData: Partial<WikiPageContent>;
    wikiProposal?: WikiProposal;
    wikiPage?: WikiPage;
  }) => {
    localStorage.setItem(
      getWikiFormDataLocalStorageKey({ wikiProposal, wikiPage }),
      JSON.stringify(wikiFormData),
    );
  },
  1000,
);
