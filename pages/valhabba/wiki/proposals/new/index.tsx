import React from 'react';
import WikiProposalForm from 'components/pages/Wiki/WikiProposals/WikiProposalForm';
import useProposeWikiPage from 'hooks/wiki/useProposeWikiPage';

const NewWikiCreationProposalPage = () => {
  const proposeWikiPage = useProposeWikiPage();

  return <WikiProposalForm onSubmit={proposeWikiPage} />;
};

export default NewWikiCreationProposalPage;
