import NextLink from 'next/link';
import { BsPlusLg } from 'react-icons/bs';
import { Grid } from '@chakra-ui/react';
import Background from 'components/core/Containers/Background';
import PageTitle from 'components/core/Typography/PageTitle';
import WikiProposalsTable from 'components/pages/Wiki/WikiProposals/WikiProposalsTable';
import Button from 'components/core/Interactive/Button';
import { VStack } from 'components/core/Containers/Stack';
import Link from 'components/core/Interactive/Link';
import { NavRoute, serverName } from 'utils/routes';

const UserWikiProposals = () => {
  return (
    <Background>
      <VStack spacing="7">
        <Grid templateColumns="1fr auto 1fr" gap="5" width="full">
          <NextLink href={`/${serverName}${NavRoute.WIKI}`} passHref>
            <Link>&larr; Retour au wiki</Link>
          </NextLink>
          <PageTitle title="Mes propositions wiki" size="xl" />
        </Grid>
        <WikiProposalsTable onlyUser />
        <NextLink href={`/${serverName}${NavRoute.WIKI}/proposals/new`} passHref>
          <Button
            data-cy="participate"
            as="a"
            leftIcon={<BsPlusLg />}
            colorScheme="green"
            textAlign="center"
          >
            Proposer une nouvelle page wiki
          </Button>
        </NextLink>
      </VStack>
    </Background>
  );
};

export default UserWikiProposals;
