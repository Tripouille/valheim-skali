import { useRouter } from 'next/router';
import { IoIosEye } from 'react-icons/io';
import { Td, Tr } from 'components/core/DataDisplay/Table';
import IconButton from 'components/core/Interactive/IconButton';
import { WikiPage } from 'data/wiki';
import { rowIconSize } from 'theme/admin';
import { NavRoute, serverName } from 'utils/routes';
import { CypressProps } from 'utils/types';

export interface WikiPageRowProps extends CypressProps {
  wikiPage: WikiPage;
}

const WikiPageRow: React.FC<WikiPageRowProps> = ({ 'data-cy': dataCy, wikiPage }) => {
  const router = useRouter();

  const navigateToWikiPage = () => {
    router.push(`/${serverName}${NavRoute.WIKI}/${wikiPage.slug}`);
  };

  return (
    <Tr cursor="pointer" onClick={navigateToWikiPage} data-cy={dataCy}>
      <Td>{wikiPage.title}</Td>
      <Td></Td>
      <Td>{wikiPage.views}</Td>
      <Td>
        <IconButton
          data-cy="see"
          aria-label="Voir la page"
          title="Voir la page"
          icon={<IoIosEye size="30" />}
          variant="ghost"
          size={rowIconSize}
          onClick={navigateToWikiPage}
        />
      </Td>
    </Tr>
  );
};

export default WikiPageRow;
