import axios from 'axios';
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
    console.log('addOrRemoveWikiPageTagOnServer');
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
  const addWikiPageTag = useOptimisticMutation<QueryKeys.WIKI, WikiPageTag>(
    QueryKeys.WIKI,
    addOrRemoveWikiPageTagOnServer(wikiPage, AddOrRemoveAction.ADD),
    (previousWikiPages, updatedTag) => {
      const oldWikiPageTags = wikiPage.tags;
      return getUpdatedWikiPages(previousWikiPages, wikiPage, [...oldWikiPageTags, updatedTag]);
    },
    'La page wiki a bien été mise à jour avec un nouveau tag.',
  );

  const removeWikiPageTag = useOptimisticMutation<QueryKeys.WIKI, WikiPageTag>(
    QueryKeys.WIKI,
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
  );

  return { addWikiPageTag, removeWikiPageTag };
};

export default useUpdateWikiPageTags;
