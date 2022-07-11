import NextLink from 'next/link';
import QueryHandler from 'components/core/Disclosure/QueryHandler';
import Link from 'components/core/Interactive/Link';
import useFindWikiPage from 'hooks/wiki/useFindWikiPage';
import { serverName } from 'utils/routes';
import { CypressProps } from 'utils/types';

interface WikiInternalLinkProps extends CypressProps {
  pageName: string;
  label: string;
}

const WikiInternalLink: React.FC<WikiInternalLinkProps> = ({ pageName, label }) => {
  const findWikiPageQuery = useFindWikiPage(pageName);
  const firstWikiPageSlug = findWikiPageQuery.data?.[0]?.slug;

  return (
    <QueryHandler query={findWikiPageQuery} loadingComponent={<Link color="white">{label}</Link>}>
      {firstWikiPageSlug ? (
        <NextLink href={`/${serverName}/wiki/${firstWikiPageSlug}`} passHref>
          <Link>{label}</Link>
        </NextLink>
      ) : (
        <Link color="red.600">{label}</Link>
      )}
    </QueryHandler>
  );
};

export default WikiInternalLink;
