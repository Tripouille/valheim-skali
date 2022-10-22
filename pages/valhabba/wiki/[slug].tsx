import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useRef } from 'react';
import { ServerException } from 'api-utils/common';
import getWikiPage from 'api-utils/wiki/getWikiPage';
import getWikiPages from 'api-utils/wiki/getWikiPages';
import WikiPageComponent from 'components/pages/Wiki/WikiPage';
import { WikiPage } from 'data/wiki';
import useWikiPage from 'hooks/wiki/useWikiPage';

interface WikiPageProps {
  wikiPageSerialized: string;
}

const WikiPagePage: React.FC<WikiPageProps> = ({ wikiPageSerialized }) => {
  const initialWikiPage = useRef<WikiPage>(JSON.parse(wikiPageSerialized)).current;

  const wikiPageQuery = useWikiPage(initialWikiPage._id, { initialData: initialWikiPage });

  return <WikiPageComponent wikiPage={wikiPageQuery.data} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const wikiPages = await getWikiPages();

  const paths = wikiPages.map(wikiPage => ({ params: { slug: wikiPage.slug } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params || typeof params.slug !== 'string') throw new ServerException(404);

    const wikiPage = await getWikiPage({ slug: params.slug });

    return { props: { wikiPageSerialized: JSON.stringify(wikiPage) } };
  } catch (e) {
    if (e instanceof ServerException) return { notFound: true };
    else throw e;
  }
};

export default WikiPagePage;
