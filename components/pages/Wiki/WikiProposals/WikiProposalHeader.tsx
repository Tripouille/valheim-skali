import NextLink from 'next/link';
import { BiBlock, BiCheck, BiEdit } from 'react-icons/bi';
import Secured from 'components/core/Authentication/Secured';
import Flex from 'components/core/Containers/Flex';
import Button from 'components/core/Interactive/Button';
import ButtonGroup from 'components/core/Interactive/ButtonGroup';
import Link from 'components/core/Interactive/Link';
import { ActionPopover } from 'components/core/Overlay/Popover';
import Text from 'components/core/Typography/Text';
import { WikiProposalWithAuthor } from 'data/wiki';
import useSession from 'hooks/useSession';
import useAnswerWikiProposal from 'hooks/wiki/useAnswerWikiProposal';
import useWikiPage from 'hooks/wiki/useWikiPage';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';
import { AdminNavRoute, MenuRoute, NavRoute, serverName } from 'utils/routes';

interface WikiProposalHeaderProps {
  wikiProposal: WikiProposalWithAuthor;
}

const WikiProposalHeader: React.FC<WikiProposalHeaderProps> = ({ wikiProposal }) => {
  const answerWikiProposal = useAnswerWikiProposal(wikiProposal);

  const wikiPageQuery = useWikiPage(wikiProposal.wikiPageId);
  const wikiPageSlug = wikiPageQuery.data?.slug;

  const session = useSession();
  const userIsAuthor = session.data?.user?._id === wikiProposal.authorId;

  const statusText =
    wikiProposal.status === 'validated' ? (
      <Text fontStyle="italic" color="green.200">
        Validée
      </Text>
    ) : (
      <Text fontStyle="italic" color="red.600">
        Rejetée
      </Text>
    );

  return (
    <>
      <Flex mb="3" justify="space-between">
        <nav>
          {wikiPageSlug && (
            <NextLink href={`/${serverName}${NavRoute.WIKI}/${wikiPageSlug}`} passHref>
              <Link display="block">
                &larr;{' '}
                {wikiProposal.status === 'validated'
                  ? 'Voir la page wiki'
                  : 'Voir la page wiki originale'}
              </Link>
            </NextLink>
          )}
          <Secured permissions={{ [PermissionCategory.WIKI]: wikiPrivilege.WRITE }}>
            <NextLink
              href={`/${serverName}${MenuRoute.ADMIN}${AdminNavRoute.WIKI_PROPOSALS}`}
              passHref
            >
              <Link display="block">&larr; Voir toutes les propositions</Link>
            </NextLink>
          </Secured>
          <NextLink href={`/${serverName}${NavRoute.WIKI}/proposals`} passHref>
            <Link display="block">&larr; Voir toutes mes propositions</Link>
          </NextLink>
        </nav>
        {wikiProposal.status === 'proposed' ? (
          <ButtonGroup>
            {userIsAuthor && (
              <NextLink
                href={`/${serverName}${NavRoute.WIKI}/proposals/edit/${wikiProposal._id}`}
                passHref
              >
                <Button as="a" data-cy="modify" leftIcon={<BiEdit />}>
                  Modifier
                </Button>
              </NextLink>
            )}
            <Secured permissions={{ [PermissionCategory.WIKI]: wikiPrivilege.WRITE }}>
              <ActionPopover
                data-cy="reject"
                action={() => answerWikiProposal('rejected')}
                label="Rejeter"
                confirmBody="Êtes-vous sûr de vouloir rejeter cette proposition ?"
                colorScheme="red"
                leftIcon={<BiBlock />}
              />
              <ActionPopover
                data-cy="validate"
                action={() => answerWikiProposal('validated')}
                label="Valider"
                confirmBody="Êtes-vous sûr de vouloir valider cette page wiki ?"
                colorScheme="green"
                leftIcon={<BiCheck />}
              />
            </Secured>
          </ButtonGroup>
        ) : (
          statusText
        )}
      </Flex>
    </>
  );
};

export default WikiProposalHeader;
