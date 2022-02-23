import { storybookSetup } from '@packages/utils/Storybook/setup';
import { StoryCategory } from '@packages/utils/Storybook/constants';
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
