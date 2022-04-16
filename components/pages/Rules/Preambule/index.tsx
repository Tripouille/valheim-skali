import React from 'react';
import { Accordion, TitleAccordionItem } from 'components/core/Disclosure/Accordion';
import LongVersion from './LongVersion';
import ShortVersion from './ShortVersion';

const Preambule: React.FC = () => (
  <Accordion defaultIndex={[0, 1]} allowMultiple>
    <TitleAccordionItem id="preambule-short" title="En très court :">
      <ShortVersion />
    </TitleAccordionItem>
    <TitleAccordionItem id="preambule-long" title="En un peu plus long :">
      <LongVersion />
    </TitleAccordionItem>
  </Accordion>
);

export default Preambule;
