import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { WikiPageContent } from 'data/wiki';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute, NavRoute, serverName } from 'utils/routes';
import { displayErrorToast, displaySuccessToast } from 'utils/toast';
import { getMessageFromError } from 'utils/error';

const addWikiSuggestionOnServer =
  (wikiProposalId?: string) => async (pageData: WikiPageContent) => {
    await axios.put(`${APIRoute.WIKI_PROPOSALS}/${wikiProposalId}`, pageData);
  };

const useAddWikiSuggestion = (wikiProposalId?: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: answerWikiProposal } = useMutation(addWikiSuggestionOnServer(wikiProposalId), {
    onError: error => displayErrorToast({ title: getMessageFromError(error) }),
    onSuccess: () => {
      displaySuccessToast({
        title: 'La proposition wiki a bien été modifiée.',
      });
      router.push(`/${serverName}${NavRoute.WIKI}/proposals/${wikiProposalId}`);
    },
    onSettled: () => queryClient.invalidateQueries([QueryKeys.WIKI_PROPOSALS, wikiProposalId]),
  });

  return answerWikiProposal;
};

export default useAddWikiSuggestion;
