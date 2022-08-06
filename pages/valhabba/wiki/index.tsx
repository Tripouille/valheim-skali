import { GetStaticProps } from 'next';
import React from 'react';
import WikiHome from 'components/pages/Wiki';
import getFeaturedWikiPages from 'api-utils/wiki/getFeaturedWikiPages';
import useFeaturedWikiPages from 'hooks/wiki/useFeaturedWikiPages';

interface WikiHomePageProps {
  initialFeaturedWikiPagesSerialized: string;
}

const WikiHomePage: React.FC<WikiHomePageProps> = ({ initialFeaturedWikiPagesSerialized }) => {
  const { data: featuredWikiPages } = useFeaturedWikiPages({
    initialData: JSON.parse(initialFeaturedWikiPagesSerialized),
  });

  return <WikiHome featuredWikiPages={featuredWikiPages} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const featuredWikiPages = await getFeaturedWikiPages();

  return { props: { initialFeaturedWikiPagesSerialized: JSON.stringify(featuredWikiPages) } };
};

export default WikiHomePage;
