import { Flex, chakra } from '@chakra-ui/react';

export interface CardProps {
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <Flex
      align="center"
      justify="center"
      bgColor="rgba(45, 55, 72, 0.95)"
      borderWidth="5px"
      borderStyle="double"
      borderColor="gray.800"
      p={2}
      className={className}>
      {children}
    </Flex>
  );
};

export default chakra(Card);
