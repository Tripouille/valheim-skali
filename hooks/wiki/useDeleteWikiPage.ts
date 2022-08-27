import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { WikiPage } from 'data/wiki';
import useOptimisticMutation from 'hooks/useOptimisticMutation';
import { APIRoute } from 'utils/routes';
import { QueryKeys, QueryTypes } from 'utils/queryClient';

const deleteWikiPageOnServer = (deletedWikiPage: WikiPage) => async () => {
  await axios.delete(`${APIRoute.WIKI}/${deletedWikiPage._id}`);
};

const getUpdatedWikiPages =
  (deletedWikiPage: WikiPage) => (previousWikiPages: QueryTypes[QueryKeys.WIKI_PAGES]) =>
    previousWikiPages?.filter(wikiPage => wikiPage._id !== deletedWikiPage._id) ?? [];

const useDeleteWikiPage = (deletedWikiPage: WikiPage) => {
  const queryClient = useQueryClient();

  const deleteWikiPage = useOptimisticMutation(
    QueryKeys.WIKI_PAGES,
    deleteWikiPageOnServer(deletedWikiPage),
    getUpdatedWikiPages(deletedWikiPage),
    'La page wiki a bien été supprimée.',
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.FEATURED_WIKI_PAGES]);
        queryClient.invalidateQueries([QueryKeys.WIKI_PROPOSALS]);
      },
    },
  );

  return deleteWikiPage;
};

export default useDeleteWikiPage;
