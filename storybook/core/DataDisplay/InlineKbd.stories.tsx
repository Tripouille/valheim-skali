import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import InlineKbd, { InlineKbdProps } from 'components/core/DataDisplay/InlineKbd';

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
