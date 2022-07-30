import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';
import {
  getWikiProposalWithAuthorName,
  sortWikiProposals,
  WikiProposal,
  WikiProposalWithAuthor,
} from 'data/wiki';
import { useUsers } from 'hooks/users/useUsers';
import useSession from 'hooks/useSession';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';
import { APIRoute } from 'utils/routes';
import { QueryKeys } from 'utils/queryClient';

export const getWikiProposals = async (): Promise<WikiProposal[]> => {
  const { data } = await axios.get<WikiProposal[]>(`${APIRoute.WIKI}/proposals`);
  return data;
};

export const useWikiProposals = (options?: {
  unhandled?: boolean;
  onlyUser?: boolean;
}): UseQueryResult<WikiProposalWithAuthor[]> => {
  const session = useSession();
  const { data: users } = useUsers(false);

  const wikiProposalsQuery = useQuery(QueryKeys.WIKI_PROPOSALS, getWikiProposals, {
    enabled: session.hasRequiredPermissions({
      [PermissionCategory.WIKI]: wikiPrivilege.WRITE,
    }),
    select: data => {
      const selectedWikiProposals = data.filter(wikiProposal => {
        if (options?.unhandled && wikiProposal.status !== 'proposed') return false;
        if (options?.onlyUser && wikiProposal.authorId !== session.data?.user._id) return false;
        return true;
      });
      return sortWikiProposals(selectedWikiProposals).map(wikiProposal =>
        getWikiProposalWithAuthorName(wikiProposal, users),
      );
    },
  });

  return wikiProposalsQuery;
};
