import { GetStaticProps } from 'next';
import React from 'react';
import getFeaturedWikiPages from 'api-utils/wiki/getFeaturedWikiPages';
import WikiHome from 'components/pages/Wiki';
import useFeaturedWikiPages from 'hooks/wiki/useFeaturedWikiPages';

interface WikiHomePageProps {
  SSRFeaturedWikiPages: string;
}

const WikiHomePage: React.FC<WikiHomePageProps> = ({ SSRFeaturedWikiPages }) => {
  console.log('SSRFeaturedWikiPages', SSRFeaturedWikiPages);
  const { data: featuredWikiPages } = useFeaturedWikiPages({
    placeholderData: JSON.parse(SSRFeaturedWikiPages),
  });

  return <WikiHome featuredWikiPages={featuredWikiPages} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const featuredWikiPages = await getFeaturedWikiPages();

  return { props: { SSRFeaturedWikiPages: JSON.stringify(featuredWikiPages) } };
};

export default WikiHomePage;
