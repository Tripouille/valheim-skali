import axios from 'axios';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WikiPageContent } from 'data/wiki';
import { getMessageFromError } from 'utils/error';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute, getRoute, NavRoute } from 'utils/routes';
import { clearLocalStorageStartingWith } from 'utils/storage';
import { displayErrorToast, displaySuccessToast } from 'utils/toast';

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
      router.push(getRoute(`${NavRoute.WIKI}/proposals/${wikiProposalId}`));
      clearLocalStorageStartingWith('wikiFormData');
    },
    onSettled: () => queryClient.invalidateQueries([QueryKeys.WIKI_PROPOSALS, wikiProposalId]),
  });

  return answerWikiProposal;
};

export default useAddWikiSuggestion;
