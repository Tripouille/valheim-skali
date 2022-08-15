import { useRouter } from 'next/router';
import { BiBlock, BiCheck } from 'react-icons/bi';
import { GiChoice } from 'react-icons/gi';
import Secured from 'components/core/Authentication/Secured';
import { Td, Tr } from 'components/core/DataDisplay/Table';
import IconButton from 'components/core/Interactive/IconButton';
import Icon from 'components/core/Images/Icon';
import { WikiProposalWithAuthor } from 'data/wiki';
import { rowIconSize, rowIconWidth } from 'theme/admin';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';
import { NavRoute, serverName } from 'utils/routes';
import { CypressProps } from 'utils/types';

export interface WikiProposalRowProps extends CypressProps {
  wikiProposal: WikiProposalWithAuthor;
  onlyUser?: boolean;
}

const WikiProposalRow: React.FC<WikiProposalRowProps> = ({
  'data-cy': dataCy,
  wikiProposal,
  onlyUser,
}) => {
  const router = useRouter();

  const navigateToWikiProposalPage = () => {
    router.push(`/${serverName}${NavRoute.WIKI}/proposals/${wikiProposal._id}`);
  };

  const getSettledIcon = (status: 'validated' | 'rejected') => {
    if (status === 'validated')
      return (
        <Icon data-cy="validated-icon" as={BiCheck} boxSize={rowIconWidth} color="green.300" />
      );
    else
      return <Icon data-cy="rejected-icon" as={BiBlock} boxSize={rowIconWidth} color="red.700" />;
  };

  return (
    <Tr
      cursor="pointer"
      onClick={navigateToWikiProposalPage}
      data-cy={dataCy}
      className={wikiProposal.status === 'proposed' ? undefined : 'greyed'}
    >
      <Td>{wikiProposal.suggestions[0].title}</Td>
      {!onlyUser && <Td>{wikiProposal.authorName}</Td>}
      <Td>
        {wikiProposal.status === 'proposed' ? (
          <Secured permissions={{ [PermissionCategory.WIKI]: wikiPrivilege.WRITE }}>
            <IconButton
              data-cy="edit"
              aria-label="Gérer la proposition"
              title="Gérer la proposition"
              icon={<GiChoice size="30" />}
              variant="ghost"
              size={rowIconSize}
              onClick={navigateToWikiProposalPage}
            />
          </Secured>
        ) : (
          getSettledIcon(wikiProposal.status)
        )}
      </Td>
    </Tr>
  );
};

export default WikiProposalRow;
