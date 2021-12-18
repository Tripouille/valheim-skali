import React from 'react';
import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Flex,
  Heading,
} from '@chakra-ui/react';
import ItemIcon from './ItemIcon';

export interface RuleAccordionItemProps {
  index: string;
  title: string;
  subtitle?: string;
}

const RuleAccordionItem: React.FC<RuleAccordionItemProps> = ({
  index,
  title,
  subtitle,
  children,
}) => (
  <AccordionItem id={`gameRulesAccordion${index}`}>
    <h2>
      <AccordionButton>
        <Flex flex="1" textAlign="left">
          <ItemIcon>{index}</ItemIcon>
          <Heading size="l">
            {title}
            {subtitle && (
              <Box as="span" fontWeight="normal" fontSize="xs" ms="2">
                {subtitle}
              </Box>
            )}
          </Heading>
        </Flex>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>{children}</AccordionPanel>
  </AccordionItem>
);

export default RuleAccordionItem;
