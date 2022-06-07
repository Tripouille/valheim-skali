import { Table, Th, Thead, Tr, Tbody } from 'components/core/DataDisplay/Table';
import { WikiProposalWithAuthor } from 'data/wiki';
import { adminTableStyleProps, getCellWidth, rowIconWidth } from '../utils';
import WikiProposalRow from './WikiProposalRow';

export interface WikiProposalsTableProps {
  wikiProposals?: WikiProposalWithAuthor[];
}

const WikiProposalsTable: React.FC<WikiProposalsTableProps> = ({ wikiProposals = [] }) => {
  if (wikiProposals.length === 0) return null;

  return (
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
  );
};

export default WikiProposalsTable;
