import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getWikiProposalWithAuthorName, WikiProposal, WikiProposalWithAuthor } from 'data/wiki';
import { useUsers } from 'hooks/users/useUsers';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';

const getWikiProposal = (id?: string) => async (): Promise<WikiProposal> => {
  const { data } = await axios.get<WikiProposal>(`${APIRoute.WIKI_PROPOSALS}/${id}`);
  return data;
};

export const useWikiProposal = (id?: string): UseQueryResult<WikiProposalWithAuthor> => {
  const { data: users } = useUsers(false);

  const wikiProposalQuery = useQuery([QueryKeys.WIKI_PROPOSALS, id], getWikiProposal(id), {
    enabled: typeof id === 'string',
    select: wikiProposal => getWikiProposalWithAuthorName(wikiProposal, users),
  });

  return wikiProposalQuery;
};
