import React from 'react';
import Background from 'components/core/Containers/Background';
import Center from 'components/core/Containers/Center';
import Heading from 'components/core/Typography/Heading';

const WorkInProgress: React.FC = () => (
  <Background h="full">
    <Center h="full">
      <Heading fontFamily="Norse">A venir dans une prochaine mise à jour !</Heading>
    </Center>
  </Background>
);

export default WorkInProgress;
