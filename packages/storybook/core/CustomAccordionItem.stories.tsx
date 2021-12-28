import { Accordion } from '@chakra-ui/react';
import CustomAccordionItem, {
  CustomAccordionItemProps,
} from '@packages/components/core/CustomAccordionItem';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';

const { defaultExport, StoryFactory } = storybookSetup<CustomAccordionItemProps>(
  CustomAccordionItem,
  {
    decorators: [
      Story => (
        <Accordion>
          <Story />
        </Accordion>
      ),
    ],
  },
);

export default defaultExport;

const title = 'A title';
const subtitle = '[A subtitle]';
const children = 'Content of accordion item';

export const Default = StoryFactory({ title, children });

export const WithSubtitle = StoryFactory({ title, subtitle, children });

export const MultipleItems = () => (
  <>
    <Default {...(Default.args as CustomAccordionItemProps)} />
    <WithSubtitle {...(WithSubtitle.args as CustomAccordionItemProps)} />
  </>
);
