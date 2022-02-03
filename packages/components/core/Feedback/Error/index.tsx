import React from 'react';
import Background from '@packages/components/core/Containers/Background';
import Center from '@packages/components/core/Containers/Center';
import { Children } from '@packages/utils/types';

export interface ErrorProps {
  children: Children;
}

const Error: React.FC = ({ children }) => (
  <Background h="full">
    <Center h="full" fontSize="xl">
      {children}
    </Center>
  </Background>
);

export default Error;
