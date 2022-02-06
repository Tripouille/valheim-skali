import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';
import InlineKbd, { InlineKbdProps } from '@packages/components/core/DataDisplay/InlineKbd';

const { defaultExport, StoryFactory } = storybookSetup<InlineKbdProps>(InlineKbd, {
  decorators: [
    Story => (
      <>
        Appuyez sur <Story /> pour ...
      </>
    ),
  ],
});

export default defaultExport;

export const Default = StoryFactory({ children: 'A' });
