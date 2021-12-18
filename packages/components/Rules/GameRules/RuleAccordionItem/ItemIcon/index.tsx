import React from 'react';
import { Box } from '@chakra-ui/react';

const ItemIcon: React.FC = ({ children }) => (
  <Box
    textAlign="center"
    mt="0.2em"
    me="2"
    borderWidth="3px"
    borderColor="teal.500"
    borderStyle="outset"
    w="1.4em"
    h="1.4em"
    lineHeight="0.9em">
    {children}
  </Box>
);

export default ItemIcon;
