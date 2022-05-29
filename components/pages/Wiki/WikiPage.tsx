import React from 'react';
import Background from 'components/core/Containers/Background';
import { VStack } from 'components/core/Containers/Stack';
import PageTitle from 'components/core/Typography/PageTitle';
import Text from 'components/core/Typography/Text';
import { WikiPage } from 'data/wiki';

export interface WikiPageComponentProps {
  wikiPage: WikiPage;
}

const WikiPageComponent: React.FC<WikiPageComponentProps> = ({ wikiPage }) => {
  return (
    <Background>
      <VStack spacing="7">
        <PageTitle title={wikiPage.title} />
        <Text>{wikiPage.content}</Text>
      </VStack>
    </Background>
  );
};

export default WikiPageComponent;
