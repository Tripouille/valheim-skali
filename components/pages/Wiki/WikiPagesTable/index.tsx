import { Table, Th, Thead, Tr, Tbody } from 'components/core/DataDisplay/Table';
import Box from 'components/core/Containers/Box';
import QueryHandler from 'components/core/Disclosure/QueryHandler';
import useWikiPages from 'hooks/wiki/useWikiPages';
import { getCellWidth, rowIconWidth, tableStyleProps } from 'theme/admin';
import WikiPageRow from './WikiPageRow';

const WikiPagesTable = () => {
  const wikiPagesQuery = useWikiPages();
  const wikiPages = wikiPagesQuery.data ?? [];

  return (
    <QueryHandler query={wikiPagesQuery}>
      {wikiPages.length === 0 ? (
        <Box>Aucune page wiki n&apos;a été validée.</Box>
      ) : (
        <Table {...tableStyleProps}>
          <Thead>
            <Tr>
              <Th>Titre</Th>
              <Th width="xs">Tags</Th>
              <Th width={24}>Vues</Th>
              <Th width={getCellWidth(rowIconWidth)}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {wikiPages.map((wikiPage, index) => (
              <WikiPageRow data-cy={`wiki-page-${index}`} key={wikiPage._id} wikiPage={wikiPage} />
            ))}
          </Tbody>
        </Table>
      )}
    </QueryHandler>
  );
};

export default WikiPagesTable;
