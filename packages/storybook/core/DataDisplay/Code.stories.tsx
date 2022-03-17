import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import Code, { CodeProps } from '@packages/components/core/DataDisplay/Code';

const { defaultExport, StoryFactory } = storybookSetup<CodeProps>(
  Code,
  StoryCategory.CORE_DATA_DISPLAY,
);

export default defaultExport;

export const Default = StoryFactory({
  colorScheme: 'gray',
  variant: 'subtle',
  children: 'Some code',
});
