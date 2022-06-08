import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';
import { sortWikiProposals, WikiProposal, WikiProposalWithAuthor } from 'data/wiki';
import { APIRoute } from 'utils/routes';
import { QueryKeys } from 'utils/queryClient';
import useSession from 'utils/hooks/useSession';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';
import { useUsers } from './useUsers';

export const getWikiProposals = async (): Promise<WikiProposal[]> => {
  const { data } = await axios.get<WikiProposal[]>(`${APIRoute.WIKI}/proposals`);
  return data;
};

export const useWikiProposals = (options?: {
  unhandled?: boolean;
}): UseQueryResult<WikiProposalWithAuthor[]> => {
  const session = useSession();
  const { data: users } = useUsers(false);

  const wikiProposalsQuery = useQuery(QueryKeys.WIKI_PROPOSALS, getWikiProposals, {
    enabled: session.hasRequiredPermissions({
      [PermissionCategory.WIKI]: wikiPrivilege.WRITE,
    }),
    select: data => {
      const selectedWikiProposals = options?.unhandled
        ? data.filter(wikiProposal => wikiProposal.status === 'proposed')
        : data;
      return sortWikiProposals(selectedWikiProposals).map(wikiProposal => {
        let authorName;
        if (users) {
          const author = users.find(user => user._id === wikiProposal.authorId);
          if (author) authorName = author.nameInGame ?? author.name;
        }
        return { ...wikiProposal, authorName };
      });
    },
  });

  return wikiProposalsQuery;
};
