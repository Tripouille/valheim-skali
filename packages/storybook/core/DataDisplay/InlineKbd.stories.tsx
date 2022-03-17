import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import InlineKbd, { InlineKbdProps } from '@packages/components/core/DataDisplay/InlineKbd';

const { defaultExport, StoryFactory } = storybookSetup<InlineKbdProps>(
  InlineKbd,
  StoryCategory.CORE_DATA_DISPLAY,
  {
    decorators: [
      Story => (
        <>
          Appuyez sur <Story /> pour ...
        </>
      ),
    ],
  },
);

export default defaultExport;

export const Default = StoryFactory({ children: 'A' });
