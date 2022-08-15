import NextLink from 'next/link';
import React from 'react';
import { GiFeather } from 'react-icons/gi';
import Secured from 'components/core/Authentication/Secured';
import Background from 'components/core/Containers/Background';
import { Grid } from 'components/core/Containers/Grid';
import { VStack } from 'components/core/Containers/Stack';
import SimpleGrid from 'components/core/Containers/SimpleGrid';
import IconButton from 'components/core/Interactive/IconButton';
import PageTitle from 'components/core/Typography/PageTitle';
import Text from 'components/core/Typography/Text';
import { FeaturedWikiPages, WIKI_PAGE_TAG_TO_LABEL } from 'data/wiki';
import { NavRoute, ROUTES_TO_LABEL, serverName } from 'utils/routes';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';
import WikiSearchBar from './WikiSearchBar';
import WikiLinksGroup from './WikiLinksGroup';

interface WikiHomeProps {
  featuredWikiPages: FeaturedWikiPages;
}

const WikiHome: React.FC<WikiHomeProps> = ({ featuredWikiPages }) => (
  <Background data-cy="wiki">
    <VStack spacing="7">
      <Grid
        w="full"
        templateColumns={{ base: '1fr', md: '2fr 1fr 2fr' }}
        rowGap={5}
        alignItems="center"
      >
        <PageTitle
          title={ROUTES_TO_LABEL[NavRoute.WIKI]}
          gridColumn={{ base: undefined, md: '2' }}
        />
        <WikiSearchBar />
      </Grid>
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
          title={WIKI_PAGE_TAG_TO_LABEL.starting}
          pages={featuredWikiPages.startingPages}
        />
        <WikiLinksGroup
          title={WIKI_PAGE_TAG_TO_LABEL.essential}
          pages={featuredWikiPages.essentialPages}
        />
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
    </VStack>
  </Background>
);

export default WikiHome;
