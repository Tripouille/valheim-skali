import React from 'react';
import {
  Accordion as ChakraAccordion,
  AccordionProps as ChakraAccordionProps,
  AccordionItem as ChakraAccordionItem,
  AccordionItemProps as ChakraAccordionItemProps,
  AccordionButton as ChakraAccordionButton,
  AccordionButtonProps as ChakraAccordionButtonProps,
  AccordionPanel as ChakraAccordionPanel,
  AccordionPanelProps as ChakraAccordionPanelProps,
  AccordionIcon,
} from '@chakra-ui/react';
import Heading from 'components/core/Typography/Heading';
import Box from 'components/core/Containers/Box';
import { Children } from 'utils/types';

export type AccordionProps = ChakraAccordionProps;

export const Accordion: React.FC<AccordionProps> = chakraAccordionProps => (
  <ChakraAccordion {...chakraAccordionProps}></ChakraAccordion>
);

export type AccordionItemProps = ChakraAccordionItemProps;

export const AccordionItem: React.FC<AccordionItemProps> = chakraAccordionItemProps => (
  <ChakraAccordionItem {...chakraAccordionItemProps}></ChakraAccordionItem>
);

export type AccordionButtonProps = ChakraAccordionButtonProps;

export const AccordionButton: React.FC<AccordionButtonProps> = chakraAccordionButtonProps => (
  <ChakraAccordionButton {...chakraAccordionButtonProps}></ChakraAccordionButton>
);

export type AccordionPanelProps = ChakraAccordionPanelProps;

export const AccordionPanel: React.FC<AccordionPanelProps> = chakraAccordionPanelProps => (
  <ChakraAccordionPanel {...chakraAccordionPanelProps}></ChakraAccordionPanel>
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
  ...accordionItemProps
}) => (
  <AccordionItem {...accordionItemProps}>
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
