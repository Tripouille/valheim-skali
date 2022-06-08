import { VStack } from 'components/core/Containers/Stack';
import PageTitle from 'components/core/Typography/PageTitle';
import Text from 'components/core/Typography/Text';
import { WikiProposal } from 'data/wiki';

export interface WikiProposalComponentProps {
  wikiProposal: WikiProposal;
}

const WikiProposalComponent: React.FC<WikiProposalComponentProps> = ({ wikiProposal }) => {
  const lastSuggestion = wikiProposal.suggestions.at(-1);

  return (
    <VStack spacing="7">
      <PageTitle title={lastSuggestion?.title ?? ''} />
      <Text>{lastSuggestion?.content}</Text>
    </VStack>
  );
};

export default WikiProposalComponent;
