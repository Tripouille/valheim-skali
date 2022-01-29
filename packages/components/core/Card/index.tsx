import React from 'react';
import { chakra, useStyleConfig } from '@chakra-ui/react';
import { CardSize, CardVariant } from '@packages/theme/components/Card';
import Flex from '@packages/components/core/Flex';

export interface CardProps {
  className?: string;
  variant?: CardVariant;
  size?: CardSize;
}

const Card: React.FC<CardProps> = ({ children, className, size, variant }) => {
  const styles = useStyleConfig('Card', { size, variant });

  return (
    <Flex
      align="center"
      justify="center"
      borderWidth="5px"
      borderStyle="double"
      borderColor="gray.800"
      p={2}
      __css={styles}
      className={className}
    >
      {children}
    </Flex>
  );
};

export default chakra(Card);
