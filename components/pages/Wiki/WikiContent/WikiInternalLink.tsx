import NextLink from 'next/link';
import QueryHandler from 'components/core/Disclosure/QueryHandler';
import Link from 'components/core/Interactive/Link';
import useFindWikiPages from 'hooks/wiki/useFindWikiPages';
import { serverName } from 'utils/routes';
import { CypressProps } from 'utils/types';

interface WikiInternalLinkProps extends CypressProps {
  pageName: string;
  label: string;
}

const WikiInternalLink: React.FC<WikiInternalLinkProps> = ({ pageName, label }) => {
  const findWikiPagesQuery = useFindWikiPages(pageName, 3);
  const firstWikiPageSlug = findWikiPagesQuery.data?.[0]?.slug;

  return (
    <QueryHandler query={findWikiPagesQuery} loadingComponent={<Link color="white">{label}</Link>}>
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
