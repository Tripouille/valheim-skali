import React from 'react';
import Background from '@packages/components/core/Containers/Background';
import Center from '@packages/components/core/Containers/Center';

const NotFound: React.FC = () => (
  <Background h="full">
    <Center h="full" fontSize="xl">
      404 - La page que vous recherchez n&apos;existe pas ¯\_(ツ)_/¯
    </Center>
  </Background>
);

export default NotFound;
