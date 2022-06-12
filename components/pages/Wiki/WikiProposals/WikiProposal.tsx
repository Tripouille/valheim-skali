import Head from 'next/head';
import NextLink from 'next/link';
import { BiBlock, BiCheck } from 'react-icons/bi';
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
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';
import { AdminNavRoute, MenuRoute, serverName } from 'utils/routes';

export interface WikiProposalComponentProps {
  wikiProposal: WikiProposalWithAuthor;
}

const WikiProposalComponent: React.FC<WikiProposalComponentProps> = ({ wikiProposal }) => {
  const answerWikiProposal = useAnswerWikiProposal(wikiProposal);

  // const { data } = useSession();
  // const userIsAuthor = data?.user?._id === wikiProposal.authorId;

  return (
    <>
      <Head>
        <title>Skali - {wikiProposal.suggestions.at(-1)?.title ?? ''}</title>
      </Head>
      <Flex as="nav" mb="3" justify="space-between">
        <Secured
          permissions={{ [PermissionCategory.WIKI]: wikiPrivilege.WRITE }}
          fallback={
            //TODO
            <NextLink href={`/${serverName}`} passHref>
              <Link>&larr; Voir toutes mes propositions</Link>
            </NextLink>
          }
        >
          <NextLink href={`/${serverName}${MenuRoute.ADMIN}${AdminNavRoute.WIKI}`} passHref>
            <Link>&larr; Voir toutes les propositions</Link>
          </NextLink>
        </Secured>
        {wikiProposal.status === 'proposed' && (
          <ButtonGroup>
            {/* TODO {userIsAuthor && (
            <Button data-cy="modify" leftIcon={<BiEdit />}>
              Modifier
            </Button>
          )} */}
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
