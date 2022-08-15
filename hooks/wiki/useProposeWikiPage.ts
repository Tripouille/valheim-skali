import { useRouter } from 'next/router';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { WikiPageContent } from 'data/wiki';
import { getMessageFromError } from 'utils/error';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute, NavRoute, serverName } from 'utils/routes';
import { displayErrorToast, displaySuccessToast } from 'utils/toast';

const proposeWikiPageOnServer = (wikiPageId?: string) => async (pageData: WikiPageContent) => {
  if (wikiPageId) await axios.post(`${APIRoute.WIKI_PROPOSALS}/${wikiPageId}`, pageData);
  else await axios.post(APIRoute.WIKI_PROPOSALS, pageData);
};

const useProposeWikiPage = (wikiPageId?: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: proposeWikiPage } = useMutation(proposeWikiPageOnServer(wikiPageId), {
    onError: error => displayErrorToast({ title: getMessageFromError(error) }),
    onSuccess: () => {
      displaySuccessToast({
        title:
          "Votre page a bien été proposée. Elle sera visible dès qu'un modérateur l'aura validée.",
      });
      queryClient.invalidateQueries(QueryKeys.WIKI_PROPOSALS);
      router.push(`/${serverName}${NavRoute.WIKI}/proposals`);
    },
  });

  return proposeWikiPage;
};

export default useProposeWikiPage;
