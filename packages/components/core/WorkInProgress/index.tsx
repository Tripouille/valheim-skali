import React from 'react';
import { Center, Heading } from '@chakra-ui/react';
import Background from '@packages/components/core/Background';

const WorkInProgress: React.FC = () => (
  <Background h="full">
    <Center h="full">
      <Heading fontFamily="Norse" textAlign="center">
        A venir dans une prochaine mise à jour !
      </Heading>
    </Center>
  </Background>
);

export default WorkInProgress;
