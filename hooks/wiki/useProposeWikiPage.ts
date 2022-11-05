import axios from 'axios';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { WikiPageContent, WikiProposalWithAuthor } from 'data/wiki';
import useOptimisticMutation from 'hooks/useOptimisticMutation';
import useSession from 'hooks/useSession';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute, getRoute, NavRoute } from 'utils/routes';
import { clearLocalStorageStartingWith } from 'utils/storage';

const proposeWikiPageOnServer = (wikiPageId?: string) => async (pageData: WikiPageContent) => {
  if (wikiPageId) await axios.post(`${APIRoute.WIKI_PROPOSALS}/${wikiPageId}`, pageData);
  else await axios.post(APIRoute.WIKI_PROPOSALS, pageData);
};

const useProposeWikiPage = (wikiPageId?: string) => {
  const router = useRouter();
  const { data: session } = useSession();

  const proposeWikiPage = useOptimisticMutation<QueryKeys.WIKI_PROPOSALS, WikiPageContent>(
    QueryKeys.WIKI_PROPOSALS,
    proposeWikiPageOnServer(wikiPageId),
    (previousWikiProposals, pageData) => {
      if (!session) return previousWikiProposals;
      const newProposal: WikiProposalWithAuthor = {
        _id: 'new',
        authorId: session.user._id ?? 'unknown',
        authorName: session.user.nameInGame ?? session.user.name ?? undefined,
        status: 'proposed',
        suggestions: [{ ...pageData, date: DateTime.now().toISO() }],
        ...(wikiPageId ? { proposalType: 'edition', wikiPageId } : { proposalType: 'creation' }),
      };
      return [...(previousWikiProposals ?? []), newProposal];
    },
    "Votre page a bien été proposée. Elle sera visible dès qu'un modérateur l'aura validée.",
    {
      onSuccess: () => {
        router.push(getRoute(`${NavRoute.WIKI}/proposals`));
        clearLocalStorageStartingWith('wikiFormData');
      },
    },
  );

  return proposeWikiPage;
};

export default useProposeWikiPage;
