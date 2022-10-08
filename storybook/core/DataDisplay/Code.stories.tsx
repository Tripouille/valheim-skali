import Code, { CodeProps } from 'components/core/DataDisplay/Code';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

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
