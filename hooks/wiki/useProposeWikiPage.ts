import { useRouter } from 'next/router';
import axios from 'axios';
import { useMutation } from 'react-query';
import { WikiPageContent } from 'data/wiki';
import { getMessageFromError } from 'utils/error';
import { APIRoute, NavRoute, serverName } from 'utils/routes';
import { displayErrorToast, displaySuccessToast } from 'utils/toast';

const proposeWikiPageOnServer = (wikiPageId?: string) => async (pageData: WikiPageContent) => {
  if (wikiPageId) await axios.post(`${APIRoute.WIKI}/proposals/${wikiPageId}`, pageData);
  else await axios.post(`${APIRoute.WIKI}/proposals`, pageData);
};

const useProposeWikiPage = (wikiPageId?: string) => {
  const router = useRouter();

  const { mutate: proposeWikiPage } = useMutation(proposeWikiPageOnServer(wikiPageId), {
    onError: error => displayErrorToast({ title: getMessageFromError(error) }),
    onSuccess: () => {
      displaySuccessToast({
        title:
          "Votre page a bien été proposée. Elle sera visible dès qu'un modérateur l'aura validée.",
      });
      router.push(`/${serverName}${NavRoute.WIKI}/proposals`);
    },
  });

  return proposeWikiPage;
};

export default useProposeWikiPage;
