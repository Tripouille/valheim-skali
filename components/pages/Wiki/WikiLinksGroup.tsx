import NextLink from 'next/link';
import { Fragment } from 'react';
import Box from 'components/core/Containers/Box';
import Link from 'components/core/Interactive/Link';
import Heading from 'components/core/Typography/Heading';
import { WikiPage } from 'data/wiki';
import { getRoute, NavRoute } from 'utils/routes';

export interface WikiLinksGroupProps {
  title: string;
  pages: WikiPage[];
}

const WikiLinksGroup: React.FC<WikiLinksGroupProps> = ({ title, pages }) => {
  if (!pages.length) return null;
  return (
    <Box border="2px silver solid" borderRadius="md" p="3">
      <Heading size="sm" textAlign="center" mb="3">
        {title}
      </Heading>
      {pages.map(wikiPage => (
        <Fragment key={wikiPage._id}>
          <NextLink href={getRoute(`${NavRoute.WIKI}/${wikiPage.slug}`)} passHref>
            <Link fontSize="lg">{wikiPage.title}</Link>
          </NextLink>
          <br />
        </Fragment>
      ))}
    </Box>
  );
};

export default WikiLinksGroup;
