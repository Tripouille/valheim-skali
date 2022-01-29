import { action } from '@storybook/addon-actions';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';
import { StoryCategory } from '@packages/utils/constants';
import { Accordion, AccordionProps, TitleAccordionItem } from '@packages/components/core/Accordion';

const { defaultExport, StoryFactory } = storybookSetup<AccordionProps>(
  Accordion,
  {},
  StoryCategory.CORE,
  Accordion.displayName,
);

export default defaultExport;

export const Default = StoryFactory({
  allowMultiple: false,
  allowToggle: false,
  defaultIndex: [],
  onChange: action('an accordion item was expanded or collapsed'),
  reduceMotion: false,
  children: (
    <>
      <TitleAccordionItem title="Accordion item title">Body of accordion item</TitleAccordionItem>
      <TitleAccordionItem title="Accordion item title 2">
        Body of accordion item 2
      </TitleAccordionItem>
      <TitleAccordionItem title="Accordion item title 3">
        Body of accordion item 3
      </TitleAccordionItem>
    </>
  ),
});
