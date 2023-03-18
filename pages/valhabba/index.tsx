import { GetStaticProps } from 'next';
import React from 'react';
import getFeaturedWikiPages from 'api-utils/wiki/getFeaturedWikiPages';
import Home, { HomePageProps } from 'components/pages/Home';

const ServerHomePage: React.FC<HomePageProps> = ({ SSRFeaturedWikiPages }) => (
  <Home SSRFeaturedWikiPages={SSRFeaturedWikiPages} />
);

export const getStaticProps: GetStaticProps = async () => {
  const featuredWikiPages = await getFeaturedWikiPages();

  return { props: { SSRFeaturedWikiPages: JSON.stringify(featuredWikiPages) } };
};

export default ServerHomePage;
