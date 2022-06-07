import { useRouter } from 'next/router';
import React from 'react';
import WikiProposalComponent from 'components/pages/Wiki/WikiProposal';
import { getRouteParameterAsString } from 'utils/routes';

const WikiProposalPage = () => {
  const router = useRouter();
  const wikiProposalId = getRouteParameterAsString(router.query.id);

  return <WikiProposalComponent wikiProposalId={wikiProposalId} />;
};

export default WikiProposalPage;
