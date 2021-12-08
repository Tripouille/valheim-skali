import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/accordion';
import { Box } from '@chakra-ui/layout';
import LongVersion from './LongVersion';
import ShortVersion from './ShortVersion';

const Preambule: React.FC = () => (
  <Accordion defaultIndex={[0, 1]} allowMultiple>
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            En très court :
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <ShortVersion />
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            En un peu plus long :
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <LongVersion />
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

export default Preambule;
