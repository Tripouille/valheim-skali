import { storybookSetup } from '@packages/utils/Storybook/setup';
import { StoryCategory } from '@packages/utils/Storybook/constants';
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
