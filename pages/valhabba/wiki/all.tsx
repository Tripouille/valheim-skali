import { GetStaticProps } from 'next';
import React from 'react';
import { ServerException } from 'api-utils/common';
import getWikiPages from 'api-utils/wiki/getWikiPages';
import AllWikiPages from 'components/pages/Wiki/AllWikiPages';

interface AllWikiPagesPageProps {
  wikiPagesSerialized: string;
}

const AllWikiPagesPage: React.FC<AllWikiPagesPageProps> = ({ wikiPagesSerialized }) => {
  return <AllWikiPages wikiPages={JSON.parse(wikiPagesSerialized)} />;
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const wikiPages = await getWikiPages();

    return { props: { wikiPagesSerialized: JSON.stringify(wikiPages) } };
  } catch (e) {
    if (e instanceof ServerException) return { notFound: true };
    else throw e;
  }
};

export default AllWikiPagesPage;
