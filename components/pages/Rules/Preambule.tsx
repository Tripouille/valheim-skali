import React from 'react';
import { Accordion, TitleAccordionItem } from 'components/core/Disclosure/Accordion';
import InAFewPoints from './Preambule/InAFewPoints';
import InAFewSentences from './Preambule/InAFewSentences';

const Preambule: React.FC = () => (
  <Accordion defaultIndex={[0, 1]} allowMultiple>
    <TitleAccordionItem id="preambule-1" title="En quelques points :">
      <InAFewPoints />
    </TitleAccordionItem>
    <TitleAccordionItem id="preambule-2" title="En quelques phrases :">
      <InAFewSentences />
    </TitleAccordionItem>
  </Accordion>
);

export default Preambule;
