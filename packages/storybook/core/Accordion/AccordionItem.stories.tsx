import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';
import { StoryCategory } from '@packages/utils/constants';
import {
  TitleAccordionItem,
  TitleAccordionItemProps,
  Accordion,
} from '@packages/components/core/Accordion';

const { defaultExport, StoryFactory } = storybookSetup<TitleAccordionItemProps>(
  TitleAccordionItem,
  {
    decorators: [
      Story => (
        <Accordion allowMultiple>
          <Story />
        </Accordion>
      ),
    ],
  },
  StoryCategory.CORE,
  Accordion.displayName,
);

export default defaultExport;

export const Default = StoryFactory({
  isDisabled: false,
  isFocusable: false,
  title: 'A title',
  subtitle: '[A subtitle]',
  children: 'Content of accordion item',
});
