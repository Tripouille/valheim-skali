import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import {
  TitleAccordionItem,
  TitleAccordionItemProps,
  Accordion,
} from 'components/core/Disclosure/Accordion';

const { defaultExport, StoryFactory } = storybookSetup<TitleAccordionItemProps>(
  TitleAccordionItem,
  StoryCategory.CORE_DISCLOSURE,
  {
    decorators: [
      Story => (
        <Accordion allowMultiple>
          <Story />
        </Accordion>
      ),
    ],
  },
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
