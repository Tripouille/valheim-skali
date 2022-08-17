import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { WikiPage, WikiPageTag } from 'data/wiki';
import useOptimisticMutation from 'hooks/useOptimisticMutation';
import { APIRoute } from 'utils/routes';
import { QueryKeys } from 'utils/queryClient';

enum AddOrRemoveAction {
  ADD = 'add',
  REMOVE = 'remove',
}

const addOrRemoveWikiPageTagOnServer =
  (wikiPage: WikiPage, action: AddOrRemoveAction) => async (tag: WikiPageTag) => {
    await axios.patch(`${APIRoute.WIKI}/${wikiPage._id}/tags/${action}`, { tag });
  };

const getUpdatedWikiPages = (
  previousWikiPages: WikiPage[],
  updatedWikiPage: WikiPage,
  newWikiPageTags: WikiPageTag[],
) =>
  previousWikiPages.map(wikiPage =>
    wikiPage._id === updatedWikiPage._id ? { ...wikiPage, tags: newWikiPageTags } : wikiPage,
  );

const useUpdateWikiPageTags = (wikiPage: WikiPage) => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries([QueryKeys.FEATURED_WIKI_PAGES]);
  };

  const addWikiPageTag = useOptimisticMutation<QueryKeys.WIKI_PAGES, WikiPageTag>(
    QueryKeys.WIKI_PAGES,
    addOrRemoveWikiPageTagOnServer(wikiPage, AddOrRemoveAction.ADD),
    (previousWikiPages, updatedTag) => {
      const oldWikiPageTags = wikiPage.tags;
      return getUpdatedWikiPages(previousWikiPages, wikiPage, [...oldWikiPageTags, updatedTag]);
    },
    'La page wiki a bien été mise à jour avec un nouveau tag.',
    { onSuccess },
  );

  const removeWikiPageTag = useOptimisticMutation<QueryKeys.WIKI_PAGES, WikiPageTag>(
    QueryKeys.WIKI_PAGES,
    addOrRemoveWikiPageTagOnServer(wikiPage, AddOrRemoveAction.REMOVE),
    (previousWikiPages, updatedTag) => {
      const oldWikiPageTags = wikiPage.tags;
      return getUpdatedWikiPages(
        previousWikiPages,
        wikiPage,
        oldWikiPageTags.filter(tag => tag !== updatedTag),
      );
    },
    'La page wiki a bien été mise à jour sans le tag.',
    { onSuccess },
  );

  return { addWikiPageTag, removeWikiPageTag };
};

export default useUpdateWikiPageTags;
