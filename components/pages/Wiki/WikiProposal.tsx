import Background from 'components/core/Containers/Background';
import { VStack } from 'components/core/Containers/Stack';
import QueryHandler from 'components/core/Disclosure/QueryHandler';
import PageTitle from 'components/core/Typography/PageTitle';
import Text from 'components/core/Typography/Text';
import { useWikiProposal } from './hooks/useWikiProposal';

export interface WikiProposalComponentProps {
  wikiProposalId: string;
}

const WikiProposalComponent: React.FC<WikiProposalComponentProps> = ({ wikiProposalId }) => {
  const wikiProposalQuery = useWikiProposal(wikiProposalId);
  const wikiProposal = wikiProposalQuery.data;
  const lastSuggestion = wikiProposal?.suggestions.at(-1);

  return (
    <Background data-cy="events">
      <QueryHandler query={wikiProposalQuery}>
        <VStack spacing="7">
          <PageTitle title={lastSuggestion?.title ?? ''} />
          <Text>{lastSuggestion?.content}</Text>
        </VStack>
      </QueryHandler>
    </Background>
  );
};

export default WikiProposalComponent;
