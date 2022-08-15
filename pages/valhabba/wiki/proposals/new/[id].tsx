import { useRouter } from 'next/router';
import React from 'react';
import QueryHandler from 'components/core/Disclosure/QueryHandler';
import WikiProposalForm from 'components/pages/Wiki/WikiProposals/WikiProposalForm';
import useProposeWikiPage from 'hooks/wiki/useProposeWikiPage';
import useWikiPage from 'hooks/wiki/useWikiPage';
import { getRouteParameterAsString } from 'utils/routes';

const NewWikiEditionProposalPage = () => {
  const router = useRouter();
  const wikiPageId = getRouteParameterAsString(router.query.id);

  const wikiPageQuery = useWikiPage(wikiPageId);

  const proposeWikiPageEdition = useProposeWikiPage(wikiPageId);

  return (
    <QueryHandler query={wikiPageQuery}>
      <WikiProposalForm wikiPage={wikiPageQuery.data} onSubmit={proposeWikiPageEdition} />
    </QueryHandler>
  );
};

export default NewWikiEditionProposalPage;
