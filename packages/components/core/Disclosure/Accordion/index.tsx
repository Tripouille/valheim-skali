import React from 'react';
import {
  Accordion as ChakraAccordion,
  AccordionProps as ChakraAccordionProps,
  AccordionItem as ChakraAccordionItem,
  AccordionItemProps as ChakraAccordionItemProps,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';
import Heading from '@packages/components/core/Typography/Heading';
import Box from '@packages/components/core/Containers/Box';
import { Children } from '@packages/utils/types';

export type AccordionProps = ChakraAccordionProps;

export const Accordion: React.FC<AccordionProps> = chakraAccordionProps => (
  <ChakraAccordion {...chakraAccordionProps}></ChakraAccordion>
);

export interface TitleAccordionItemProps extends ChakraAccordionItemProps {
  title: string;
  subtitle?: string;
  children: Children;
}

export const TitleAccordionItem: React.FC<TitleAccordionItemProps> = ({
  title,
  subtitle,
  children,
  ...chakraAccordionItemProps
}) => (
  <ChakraAccordionItem {...chakraAccordionItemProps}>
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
