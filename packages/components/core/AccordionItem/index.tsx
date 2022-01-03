import React from 'react';
import {
  AccordionItem as ChakraAccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Heading,
} from '@chakra-ui/react';
import { Children } from '@packages/utils/types';

export interface AccordionItemProps {
  title: string;
  subtitle?: string;
  children: Children;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, subtitle, children }) => (
  <ChakraAccordionItem id={title}>
    <AccordionButton>
      <Heading size="l" flex="1" textAlign="left">
        {title}
        {subtitle && (
          <Box as="span" fontWeight="normal" fontSize="xs" ms="2">
            {subtitle}
          </Box>
        )}
      </Heading>
      <AccordionIcon />
    </AccordionButton>
    <AccordionPanel pb={4}>{children}</AccordionPanel>
  </ChakraAccordionItem>
);

export default AccordionItem;
