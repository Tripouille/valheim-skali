import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { WikiPage, WikiProposal } from 'data/wiki';
import { QueryKeys } from 'utils/queryClient';
import { AdminNavRoute, APIRoute, MenuRoute, NavRoute, serverName } from 'utils/routes';
import { displayErrorToast, displaySuccessToast } from 'utils/toast';
import { getMessageFromError } from 'utils/error';

const updateWikiProposalOnServer =
  (wikiProposal: WikiProposal) => async (answer: 'validated' | 'rejected') => {
    const { data: result } = await axios.put<WikiPage | undefined>(
      `${APIRoute.WIKI_PROPOSALS}/${wikiProposal._id}/answer`,
      { answer },
    );
    return result;
  };

const useAnswerWikiProposal = (wikiProposal: WikiProposal) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: answerWikiProposal } = useMutation(updateWikiProposalOnServer(wikiProposal), {
    onError: error => displayErrorToast({ title: getMessageFromError(error) }),
    onSuccess: (newWikiPage, answer) => {
      displaySuccessToast({
        title: `La page wiki "${wikiProposal.suggestions[0].title}" a bien été ${
          answer === 'validated' ? 'validée' : 'rejetée'
        }.`,
      });
      if (answer === 'validated') {
        queryClient.setQueryData([QueryKeys.WIKI_PAGES, newWikiPage?._id], newWikiPage);
        router.push(`/${serverName}${NavRoute.WIKI}/${newWikiPage?.slug}`);
      } else {
        queryClient.refetchQueries(QueryKeys.WIKI_PROPOSALS);
        router.push(`/${serverName}${MenuRoute.ADMIN}${AdminNavRoute.WIKI_PROPOSALS}`);
      }
    },
    onSettled: () => queryClient.invalidateQueries(QueryKeys.WIKI_PROPOSALS),
  });

  return answerWikiProposal;
};

export default useAnswerWikiProposal;
