import { useRouter } from 'next/router';
import React from 'react';
import { useQueryClient } from 'react-query';
import Background from 'components/core/Containers/Background';
import QueryHandler from 'components/core/Disclosure/QueryHandler';
import WikiProposalComponent from 'components/pages/Wiki/WikiProposals/WikiProposal';
import { WikiProposal } from 'data/wiki';
import { useWikiProposal } from 'hooks/wiki/useWikiProposal';
import { getRouteParameterAsString } from 'utils/routes';
import { QueryKeys, QueryTypes } from 'utils/queryClient';

const WikiProposalPage = () => {
  const router = useRouter();
  const wikiProposalId = getRouteParameterAsString(router.query.id);

  const queryClient = useQueryClient();
  const wikiProposalQuery = useWikiProposal(wikiProposalId);

  const getFallbackWikiProposal = () => {
    if (!wikiProposalId || wikiProposalQuery.data) return null;
    const wikiProposals = queryClient.getQueryData<QueryTypes[QueryKeys.WIKI_PROPOSALS]>(
      QueryKeys.WIKI_PROPOSALS,
    );
    return wikiProposals?.find(wikiProposal => wikiProposal._id === wikiProposalId);
  };
  const fallbackWikiProposal = getFallbackWikiProposal();

  return (
    <Background data-cy="events">
      <QueryHandler query={wikiProposalQuery} fallbackData={fallbackWikiProposal}>
        <WikiProposalComponent
          wikiProposal={(wikiProposalQuery.data ?? fallbackWikiProposal) as WikiProposal}
        />
      </QueryHandler>
    </Background>
  );
};

export default WikiProposalPage;
