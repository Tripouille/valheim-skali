import React from 'react';
import SimpleGrid from 'components/core/Containers/SimpleGrid';
import { FeaturedWikiPages, WIKI_PAGE_TAG_TO_LABEL } from 'data/wiki';
import WikiLinksGroup from './WikiLinksGroup';

interface FeaturedWikiPagesComponentProps {
  featuredWikiPages: FeaturedWikiPages;
  pageNumberMax?: number;
}

const FeaturedWikiPagesComponent: React.FC<FeaturedWikiPagesComponentProps> = ({
  featuredWikiPages,
  pageNumberMax = 5,
}) => (
  <SimpleGrid
    w="full"
    minChildWidth="370px"
    spacing={[6, null, 8, 16]}
    px={[0, null, 8, 16]}
    py="5"
  >
    <WikiLinksGroup
      title="Dernières pages"
      pages={featuredWikiPages.lastPages.slice(0, pageNumberMax)}
    />
    <WikiLinksGroup
      title={WIKI_PAGE_TAG_TO_LABEL.starting}
      pages={featuredWikiPages.startingPages.slice(0, pageNumberMax)}
    />
    <WikiLinksGroup
      title={WIKI_PAGE_TAG_TO_LABEL.essential}
      pages={featuredWikiPages.essentialPages.slice(0, pageNumberMax)}
    />
    <WikiLinksGroup
      title="Les plus populaires"
      pages={featuredWikiPages.popularPages.slice(0, pageNumberMax)}
    />
  </SimpleGrid>
);

export default FeaturedWikiPagesComponent;
