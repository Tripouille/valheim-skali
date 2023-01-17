import NextLink from 'next/link';
import QueryHandler from 'components/core/Disclosure/QueryHandler';
import Link from 'components/core/Interactive/Link';
import useFindWikiPages from 'hooks/wiki/useFindWikiPages';
import { getRoute, NavRoute } from 'utils/routes';
import { CypressProps } from 'utils/types';
import ExternalLink from './ExternalLink';

interface WikiLinkProps extends CypressProps {
  pageName: string;
  label: string;
  external?: boolean;
}

const WikiLink: React.FC<WikiLinkProps> = ({ pageName, label, external }) => {
  const findWikiPagesQuery = useFindWikiPages(pageName, 3);
  const firstWikiPageSlug = findWikiPagesQuery.data?.[0]?.slug;

  return (
    <QueryHandler query={findWikiPagesQuery} loadingComponent={<Link color="white">{label}</Link>}>
      {firstWikiPageSlug ? (
        external ? (
          <ExternalLink href={getRoute(`${NavRoute.WIKI}/${firstWikiPageSlug}`)} withIcon>
            {label}
          </ExternalLink>
        ) : (
          <NextLink href={getRoute(`${NavRoute.WIKI}/${firstWikiPageSlug}`)} passHref>
            <Link>{label}</Link>
          </NextLink>
        )
      ) : (
        <Link color="red.600">{label}</Link>
      )}
    </QueryHandler>
  );
};

export default WikiLink;
