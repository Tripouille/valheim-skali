import axios from 'axios';
import { useQuery } from 'react-query';
import { useUsers } from 'components/pages/Admin/hooks/useUsers';
import { getWikiProposalWithAuthorName, WikiProposal } from 'data/wiki';
import { APIRoute } from 'utils/routes';
import { QueryKeys } from 'utils/queryClient';

const getWikiProposal = (id?: string) => async (): Promise<WikiProposal> => {
  const { data } = await axios.get<WikiProposal>(`${APIRoute.WIKI}/proposals/${id}`);
  return data;
};

export const useWikiProposal = (id?: string) => {
  const { data: users } = useUsers(false);

  const wikiProposalQuery = useQuery([QueryKeys.WIKI_PROPOSALS, id], getWikiProposal(id), {
    enabled: typeof id === 'string',
    select: wikiProposal => getWikiProposalWithAuthorName(wikiProposal, users),
  });

  return wikiProposalQuery;
};
