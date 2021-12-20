import React from 'react';
import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Heading,
} from '@chakra-ui/react';

export interface CustomAccordionItemProps {
  title: string;
  subtitle?: string;
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
