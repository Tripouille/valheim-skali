import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import Heading, { HeadingProps } from '@packages/components/core/Typography/Heading';

const { defaultExport, StoryFactory } = storybookSetup<HeadingProps>(
  Heading,
  StoryCategory.CORE_TYPOGRAPHY,
);

export default defaultExport;

export const Default = StoryFactory({
  orientation: 'horizontal',
  size: 'xl',
  children: 'A heading',
});
