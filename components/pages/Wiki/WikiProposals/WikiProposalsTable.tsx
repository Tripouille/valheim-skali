import { Table, Th, Thead, Tr, Tbody } from 'components/core/DataDisplay/Table';
import QueryHandler from 'components/core/Disclosure/QueryHandler';
import { tableStyleProps, getCellWidth, rowIconWidth } from 'theme/admin';
import { useWikiProposals } from 'hooks/wiki/useWikiProposals';
import WikiProposalRow from './WikiProposalRow';

export interface WikiProposalsTableProps {
  onlyUser?: boolean;
}

const WikiProposalsTable: React.FC<WikiProposalsTableProps> = ({ onlyUser }) => {
  const wikiProposalsQuery = useWikiProposals({ onlyUser });
  const wikiProposals = wikiProposalsQuery.data ?? [];

  if (wikiProposals.length === 0)
    return (
      <>
        {onlyUser
          ? "Vous n'avez encore proposé aucune page wiki."
          : "Aucune page wiki n'a été proposée."}
      </>
    );

  return (
    <QueryHandler query={wikiProposalsQuery}>
      <Table {...tableStyleProps}>
        <Thead>
          <Tr>
            <Th>Titre</Th>
            {!onlyUser && <Th width={{ base: '24', md: '40', '2xl': 'xs' }}>Auteur</Th>}
            <Th width={getCellWidth(rowIconWidth)}></Th>
          </Tr>
        </Thead>
        <Tbody>
          {wikiProposals.map((wikiProposal, index) => (
            <WikiProposalRow
              data-cy={`wiki-proposal-${index}`}
              key={wikiProposal._id}
              wikiProposal={wikiProposal}
              onlyUser={onlyUser}
            />
          ))}
        </Tbody>
      </Table>
    </QueryHandler>
  );
};

export default WikiProposalsTable;
