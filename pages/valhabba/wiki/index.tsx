import { GetStaticProps } from 'next';
import React from 'react';
import WikiHome from 'components/pages/Wiki';
import getFeaturedWikiPages from 'api-utils/wiki/getFeaturedWikiPages';

interface WikiHomePageProps {
  featuredWikiPagesSerialized: string;
}

const WikiHomePage: React.FC<WikiHomePageProps> = ({ featuredWikiPagesSerialized }) => (
  <WikiHome featuredWikiPages={JSON.parse(featuredWikiPagesSerialized)} />
);

export const getStaticProps: GetStaticProps = async () => {
  const featuredWikiPages = await getFeaturedWikiPages();

  return { props: { featuredWikiPagesSerialized: JSON.stringify(featuredWikiPages) } };
};

export default WikiHomePage;
