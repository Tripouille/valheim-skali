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
import { APIRoute } from 'utils/routes';
import { QueryKeys } from 'utils/queryClient';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';

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
      return sortWikiProposals(selectedWikiProposals).map(wikiProposal =>
        getWikiProposalWithAuthorName(wikiProposal, users),
      );
    },
  });

  return wikiProposalsQuery;
};
