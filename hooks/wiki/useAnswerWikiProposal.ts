import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { WikiProposal } from 'data/wiki';
import { QueryKeys } from 'utils/queryClient';
import { AdminNavRoute, APIRoute, MenuRoute, serverName } from 'utils/routes';
import { displayErrorToast, displaySuccessToast } from 'utils/toast';
import { getMessageFromError } from 'utils/error';

const updateWikiProposalOnServer =
  (wikiProposal: WikiProposal) => async (answer: 'validated' | 'rejected') => {
    await axios.put(`${APIRoute.WIKI}/proposals/${wikiProposal._id}/answer`, { answer });
  };

const useAnswerWikiProposal = (wikiProposal: WikiProposal) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: answerWikiProposal } = useMutation(updateWikiProposalOnServer(wikiProposal), {
    onError: error => displayErrorToast({ title: getMessageFromError(error) }),
    onSuccess: (_, answer) => {
      displaySuccessToast({
        title: `La page wiki "${wikiProposal.suggestions.at(-1)?.title}" a bien été ${
          answer === 'validated' ? 'validée' : 'rejetée'
        }.`,
      });
      router.push(`/${serverName}${MenuRoute.ADMIN}${AdminNavRoute.WIKI}`);
    },
    onSettled: () => queryClient.invalidateQueries(QueryKeys.WIKI_PROPOSALS),
  });

  return answerWikiProposal;
};

export default useAnswerWikiProposal;
