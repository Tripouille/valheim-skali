import axios from 'axios';
import { useQuery } from 'react-query';
import { WikiProposal } from 'data/wiki';
import { APIRoute } from 'utils/routes';
import { QueryKeys } from 'utils/queryClient';

const getWikiProposal = (id?: string) => async (): Promise<WikiProposal> => {
  const { data } = await axios.get<WikiProposal>(`${APIRoute.WIKI}/proposals/${id}`);
  return data;
};

export const useWikiProposal = (id?: string) => {
  const wikiProposalQuery = useQuery([QueryKeys.WIKI_PROPOSALS, id], getWikiProposal(id), {
    enabled: typeof id === 'string',
  });

  return wikiProposalQuery;
};
