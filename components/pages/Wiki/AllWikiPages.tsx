import NextLink from 'next/link';
import React from 'react';
import { WikiPage } from 'data/wiki';
import { NavRoute, ROUTES_TO_LABEL, serverName } from 'utils/routes';
import Background from 'components/core/Containers/Background';
import PageTitle from 'components/core/Typography/PageTitle';
import Text from 'components/core/Typography/Text';
import Link from 'components/core/Interactive/Link';

export interface AllWikiPagesProps {
  wikiPages: WikiPage[];
}

const AllWikiPages: React.FC<AllWikiPagesProps> = ({ wikiPages }) => (
  <Background>
    <PageTitle title={ROUTES_TO_LABEL[NavRoute.WIKI]} />
    {wikiPages.map(wikiPage => (
      <Text key={wikiPage._id}>
        <NextLink href={`/${serverName}/wiki/${wikiPage.slug}`}>
          <Link>{wikiPage.title}</Link>
        </NextLink>
      </Text>
    ))}
  </Background>
);

export default AllWikiPages;
