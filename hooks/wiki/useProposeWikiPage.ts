import { useRouter } from 'next/router';
import axios from 'axios';
import { useMutation } from 'react-query';
import { WikiPageContent } from 'data/wiki';
import { getMessageFromError } from 'utils/error';
import { APIRoute, NavRoute, serverName } from 'utils/routes';
import { displayErrorToast, displaySuccessToast } from 'utils/toast';

const createWikiPageOnServer = async (pageData: WikiPageContent) => {
  await axios.post(`${APIRoute.WIKI}/proposals`, pageData);
};

const useCreateWikiPage = () => {
  const router = useRouter();

  const { mutate: createWikiPage } = useMutation(createWikiPageOnServer, {
    onError: error => displayErrorToast({ title: getMessageFromError(error) }),
    onSuccess: () => {
      displaySuccessToast({
        title:
          "Votre page a bien été proposée. Elle sera visible dès qu'un modérateur l'aura validée.",
      });
      router.push(`/${serverName}${NavRoute.WIKI}/proposals`);
    },
  });

  return createWikiPage;
};

export default useCreateWikiPage;
