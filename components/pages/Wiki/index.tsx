import NextLink from 'next/link';
import React from 'react';
import { GiFeather } from 'react-icons/gi';
import Secured from 'components/core/Authentication/Secured';
import Background from 'components/core/Containers/Background';
import { VStack } from 'components/core/Containers/Stack';
import SimpleGrid from 'components/core/Containers/SimpleGrid';
import Link from 'components/core/Interactive/Link';
import IconButton from 'components/core/Interactive/IconButton';
import PageTitle from 'components/core/Typography/PageTitle';
import Text from 'components/core/Typography/Text';
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
        <NextLink href={`/${serverName}${NavRoute.WIKI}/proposals`} passHref>
          <IconButton
            data-cy="participate"
            as="a"
            icon={<GiFeather />}
            aria-label="Participer au wiki"
            title="Participer au wiki"
            alignSelf="end"
          />
        </NextLink>
      </Secured>
      <NextLink href={`/${serverName}${NavRoute.WIKI}/all`}>
        <Link alignSelf="end">Lien temporaire pour voir toutes les pages</Link>
      </NextLink>
    </VStack>
  </Background>
);

export default WikiHome;
