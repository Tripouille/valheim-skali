import React from 'react';
import { Box } from '@chakra-ui/react';

const ItemIcon: React.FC = ({ children }) => (
  <Box
    textAlign="center"
    mt="1px"
    me="2"
    bgColor="teal.600"
    borderWidth="1px"
    borderColor="teal.300"
    borderRadius="50%"
    minW="22px"
    h="22px"
    lineHeight="19px">
    {children}
  </Box>
);

export default ItemIcon;
