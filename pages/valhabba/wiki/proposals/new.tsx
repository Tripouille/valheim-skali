import React from 'react';
import WikiProposalForm from 'components/pages/Wiki/WikiProposals/WikiProposalForm';
import useProposeWikiPage from 'hooks/wiki/useProposeWikiPage';

const NewWikiProposalPage = () => {
  const createWikiPage = useProposeWikiPage();

  return <WikiProposalForm onSubmit={createWikiPage} />;
};

export default NewWikiProposalPage;
