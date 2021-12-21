import React from 'react';
import { chakra } from '@chakra-ui/react';
import Card from '@packages/components/Card';

const NotFoundPage: React.FC = () => (
  <Card w="xl" h="3xs">
    <chakra.h1 fontSize="xl">
      404 - La page que vous recherchez n&apos;existe pas ¯\_(ツ)_/¯
    </chakra.h1>
  </Card>
);

export default NotFoundPage;
