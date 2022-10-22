import NextLink from 'next/link';
import { BsPlusLg } from 'react-icons/bs';
import Background from 'components/core/Containers/Background';
import { Grid } from 'components/core/Containers/Grid';
import { VStack } from 'components/core/Containers/Stack';
import Button from 'components/core/Interactive/Button';
import Link from 'components/core/Interactive/Link';
import PageTitle from 'components/core/Typography/PageTitle';
import WikiProposalsTable from 'components/pages/Wiki/WikiProposals/WikiProposalsTable';
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
        <NextLink href={`/${serverName}${NavRoute.WIKI}/proposals/new`} passHref>
          <Button
            data-cy="propose"
            as="a"
            leftIcon={<BsPlusLg />}
            colorScheme="green"
            textAlign="center"
          >
            Proposer une nouvelle page wiki
          </Button>
        </NextLink>
        <WikiProposalsTable onlyUser />
      </VStack>
    </Background>
  );
};

export default UserWikiProposals;
