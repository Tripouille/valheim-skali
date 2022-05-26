import NextLink from 'next/link';
import React from 'react';
import { BsPlusLg } from 'react-icons/bs';
import Secured from 'components/core/Authentication/Secured';
import Background from 'components/core/Containers/Background';
import { VStack } from 'components/core/Containers/Stack';
import SimpleGrid from 'components/core/Containers/SimpleGrid';
import PageTitle from 'components/core/Typography/PageTitle';
import Text from 'components/core/Typography/Text';
import Button from 'components/core/Interactive/Button';
import WikiLinksGroup from './WikiLinksGroup';
import { NavRoute, serverName } from 'utils/routes';

const WikiHome = () => {
  return (
    <Secured permissions={{}}>
      <Background data-cy="wiki">
        <VStack spacing="7">
          <PageTitle title="Wiki" />
          <Text>
            Voici le wiki créé par la communauté du Valhabba. Il regroupe des informations sur le
            Valhabba et sur Valheim en général, des tutos, des cartes, des personnalités...
          </Text>
          <SimpleGrid
            w="full"
            minChildWidth="370px"
            spacing={[6, null, 8, 16]}
            px={[0, null, 8, 16]}
            py="5"
          >
            <WikiLinksGroup title="Dernières pages" />
            <WikiLinksGroup title="Pour commencer au Valhabba" />
            <WikiLinksGroup title="L'essentiel" />
            <WikiLinksGroup title="Les plus populaires" />
          </SimpleGrid>
          <Secured permissions={{}}>
            <NextLink href={`/${serverName}${NavRoute.WIKI}/new`}>
              <Button data-cy="create-page" as="a" leftIcon={<BsPlusLg />} colorScheme="green">
                Proposer une nouvelle page wiki
              </Button>
            </NextLink>
          </Secured>
        </VStack>
      </Background>
    </Secured>
  );
};

export default WikiHome;
