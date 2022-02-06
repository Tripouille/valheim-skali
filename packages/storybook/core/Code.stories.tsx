import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';
import Code, { CodeProps } from '@packages/components/core/DataDisplay/Code';

const { defaultExport, StoryFactory } = storybookSetup<CodeProps>(Code);

export default defaultExport;

export const Default = StoryFactory({
  colorScheme: 'gray',
  variant: 'subtle',
  children: 'Some code',
});
