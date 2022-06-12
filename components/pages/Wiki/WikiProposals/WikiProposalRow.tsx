import { useRouter } from 'next/router';
import { BiBlock, BiCheck } from 'react-icons/bi';
import { GiChoice } from 'react-icons/gi';
import { Td, Tr } from 'components/core/DataDisplay/Table';
import IconButton from 'components/core/Interactive/IconButton';
import Icon from 'components/core/Images/Icon';
import { WikiProposalWithAuthor } from 'data/wiki';
import { CypressProps } from 'utils/types';
import { NavRoute, serverName } from 'utils/routes';
import { rowIconSize, rowIconWidth } from 'theme/admin';

export interface WikiProposalRowProps extends CypressProps {
  wikiProposal: WikiProposalWithAuthor;
}

const WikiProposalRow: React.FC<WikiProposalRowProps> = ({ 'data-cy': dataCy, wikiProposal }) => {
  const router = useRouter();

  const navigateToWikiProposalPage = () => {
    router.push(`/${serverName}${NavRoute.WIKI}/proposals/${wikiProposal._id}`);
  };

  return (
    <Tr
      cursor="pointer"
      onClick={navigateToWikiProposalPage}
      data-cy={dataCy}
      className={wikiProposal.status === 'proposed' ? undefined : 'greyed'}
    >
      <Td>{wikiProposal.suggestions.at(-1)?.title}</Td>
      <Td>{wikiProposal.authorName}</Td>
      <Td>
        {wikiProposal.status === 'proposed' ? (
          <IconButton
            data-cy="edit"
            aria-label="Gérer la proposition"
            title="Gérer la proposition"
            icon={<GiChoice size="30" />}
            variant="ghost"
            size={rowIconSize}
            onClick={navigateToWikiProposalPage}
          />
        ) : wikiProposal.status === 'validated' ? (
          <Icon as={BiCheck} boxSize={rowIconWidth} color="green.300" />
        ) : (
          <Icon as={BiBlock} boxSize={rowIconWidth} color="red.700" />
        )}
      </Td>
    </Tr>
  );
};

export default WikiProposalRow;
