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
import { WikiPage } from 'data/wiki';
import { NavRoute, ROUTES_TO_LABEL, serverName } from 'utils/routes';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';
import WikiLinksGroup from './WikiLinksGroup';

interface WikiHomeProps {
  featuredWikiPages: {
    lastPages: WikiPage[];
    startingPages: WikiPage[];
    essentialPages: WikiPage[];
    popularPages: WikiPage[];
  };
}

const WikiHome: React.FC<WikiHomeProps> = ({ featuredWikiPages }) => (
  <Background data-cy="wiki">
    <VStack spacing="7">
      <PageTitle title={ROUTES_TO_LABEL[NavRoute.WIKI]} />
      <Text textAlign="center">
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
        <WikiLinksGroup title="Dernières pages" pages={featuredWikiPages.lastPages} />
        <WikiLinksGroup
          title="Pour commencer au Valhabba"
          pages={featuredWikiPages.startingPages}
        />
        <WikiLinksGroup title="L'essentiel" pages={featuredWikiPages.essentialPages} />
        <WikiLinksGroup title="Les plus populaires" pages={featuredWikiPages.popularPages} />
      </SimpleGrid>
      <Secured permissions={{ [PermissionCategory.WIKI]: wikiPrivilege.PROPOSE }}>
        <NextLink href={`/${serverName}${NavRoute.WIKI}/new`} passHref>
          <Button data-cy="create-page" as="a" leftIcon={<BsPlusLg />} colorScheme="green">
            Proposer une nouvelle page wiki
          </Button>
        </NextLink>
      </Secured>
      <NextLink href={`/${serverName}${NavRoute.WIKI}/all`}>
        Temp: lien pour voir toutes les pages
      </NextLink>
    </VStack>
  </Background>
);

export default WikiHome;
