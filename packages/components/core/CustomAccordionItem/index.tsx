import React from 'react';
import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Heading,
} from '@chakra-ui/react';
import { Children } from '@packages/utils/types';

export interface CustomAccordionItemProps {
  title: string;
  subtitle?: string;
  children: Children;
}

const CustomAccordionItem: React.FC<CustomAccordionItemProps> = ({ title, subtitle, children }) => (
  <AccordionItem id={title}>
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
  </AccordionItem>
);

export default CustomAccordionItem;
