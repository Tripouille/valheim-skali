import { useQuery, UseQueryResult } from '@tanstack/react-query';
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

export const getWikiProposalsOnServer = async (): Promise<WikiProposal[]> => {
  const { data } = await axios.get<WikiProposal[]>(APIRoute.WIKI_PROPOSALS);
  return data;
};

export const useWikiProposals = (options?: {
  unhandled?: boolean;
  onlyUser?: boolean;
}): UseQueryResult<WikiProposalWithAuthor[]> => {
  const session = useSession();
  const { data: users } = useUsers(false);

  const wikiProposalsQuery = useQuery([QueryKeys.WIKI_PROPOSALS], getWikiProposalsOnServer, {
    enabled: session.hasRequiredPermissions({
      [PermissionCategory.WIKI]: options?.onlyUser ? wikiPrivilege.PROPOSE : wikiPrivilege.WRITE,
    }),
    select: data => {
      const selectedWikiProposals = data.filter(wikiProposal => {
        if (options?.unhandled && wikiProposal.status !== 'proposed') return false;
        if (options?.onlyUser && wikiProposal.authorId !== session.data?.user._id) return false;
        return true;
      });
      sortWikiProposals(selectedWikiProposals);
      return selectedWikiProposals.map(wikiProposal =>
        getWikiProposalWithAuthorName(wikiProposal, users),
      );
    },
  });

  return wikiProposalsQuery;
};
