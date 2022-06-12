import Head from 'next/head';
import NextLink from 'next/link';
import { BiBlock, BiCheck, BiEdit } from 'react-icons/bi';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  chakra,
} from '@chakra-ui/react';
import { WikiProposalWithAuthor } from 'data/wiki';
import Secured from 'components/core/Authentication/Secured';
import { Accordion } from 'components/core/Disclosure/Accordion';
import Flex from 'components/core/Containers/Flex';
import Link from 'components/core/Interactive/Link';
import Heading from 'components/core/Typography/Heading';
import Text from 'components/core/Typography/Text';
import ButtonGroup from 'components/core/Interactive/ButtonGroup';
import Button from 'components/core/Interactive/Button';
import useAnswerWikiProposal from 'hooks/wiki/useAnswerWikiProposal';
import useSession from 'hooks/useSession';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';
import { AdminNavRoute, MenuRoute, NavRoute, serverName } from 'utils/routes';

export interface WikiProposalComponentProps {
  wikiProposal: WikiProposalWithAuthor;
}

const WikiProposalComponent: React.FC<WikiProposalComponentProps> = ({ wikiProposal }) => {
  const answerWikiProposal = useAnswerWikiProposal(wikiProposal);

  const session = useSession();
  const userIsAuthor = session.data?.user?._id === wikiProposal.authorId;

  return (
    <>
      <Head>
        <title>Skali - {wikiProposal.suggestions.at(-1)?.title ?? ''}</title>
      </Head>
      <Flex mb="3" justify="space-between">
        <nav>
          <Secured permissions={{ [PermissionCategory.WIKI]: wikiPrivilege.WRITE }}>
            <NextLink href={`/${serverName}${MenuRoute.ADMIN}${AdminNavRoute.WIKI}`} passHref>
              <Link display="block">&larr; Voir toutes les propositions</Link>
            </NextLink>
          </Secured>
          <NextLink href={`/${serverName}${NavRoute.WIKI}/proposals`} passHref>
            <Link display="block">&larr; Voir toutes mes propositions</Link>
          </NextLink>
        </nav>
        {wikiProposal.status === 'proposed' && (
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
              <Button
                data-cy="validate"
                colorScheme="red"
                leftIcon={<BiBlock />}
                onClick={() => answerWikiProposal('rejected')}
              >
                Rejeter
              </Button>
              <Button
                data-cy="validate"
                colorScheme="green"
                leftIcon={<BiCheck />}
                onClick={() => answerWikiProposal('validated')}
              >
                Valider
              </Button>
            </Secured>
          </ButtonGroup>
        )}
      </Flex>
      {wikiProposal.authorName && (
        <chakra.address textAlign="end">Proposé par {wikiProposal.authorName}</chakra.address>
      )}
      <Accordion defaultIndex={[0]} allowMultiple w="full">
        {wikiProposal.suggestions.map((suggestion, index) => (
          <AccordionItem as="article" key={index}>
            <AccordionButton display="grid" gridTemplateColumns="1fr 5fr 1fr">
              <chakra.time
                gridArea={{ base: '1 / 2', lg: '1 / 1' }}
                isTruncated
                textAlign={{ base: undefined, lg: 'start' }}
                alignSelf="start"
                fontStyle="italic"
              >
                {new Date(suggestion.date).toLocaleString(undefined, {
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </chakra.time>
              <Heading gridArea={{ base: '2 / span 3', lg: '1 / 2' }} minWidth={0}>
                {suggestion.title}
              </Heading>
              <AccordionIcon gridArea="1 / 3" justifySelf="end" alignSelf="start" />
            </AccordionButton>
            <AccordionPanel>
              <Text>{suggestion.content}</Text>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default WikiProposalComponent;
