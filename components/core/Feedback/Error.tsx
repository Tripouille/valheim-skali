import React from 'react';
import Background from 'components/core/Containers/Background';
import Center from 'components/core/Containers/Center';
import { Children } from 'utils/types';

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
