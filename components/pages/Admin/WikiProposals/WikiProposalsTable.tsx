import { Table, Th, Thead, Tr, Tbody } from 'components/core/DataDisplay/Table';
import QueryHandler from 'components/core/Disclosure/QueryHandler';
import { useWikiProposals } from '../hooks/useWikiProposals';
import { adminTableStyleProps, getCellWidth, rowIconWidth } from '../utils';
import WikiProposalRow from './WikiProposalRow';

const WikiProposalsTable = () => {
  const wikiProposalsQuery = useWikiProposals();
  const wikiProposals = wikiProposalsQuery.data ?? [];

  if (wikiProposals.length === 0) return <>Aucune page wiki n&apos;a été proposée.</>;

  return (
    <QueryHandler query={wikiProposalsQuery}>
      <Table {...adminTableStyleProps}>
        <Thead>
          <Tr>
            <Th>Titre</Th>
            <Th width={{ base: '24', md: '40', '2xl': 'xs' }}>Auteur</Th>
            <Th width={getCellWidth(rowIconWidth)}></Th>
          </Tr>
        </Thead>
        <Tbody>
          {wikiProposals.map((wikiProposal, index) => (
            <WikiProposalRow
              data-cy={`wiki-proposal-${index}`}
              key={wikiProposal._id}
              wikiProposal={wikiProposal}
            />
          ))}
        </Tbody>
      </Table>
    </QueryHandler>
  );
};

export default WikiProposalsTable;
