import Heading, { HeadingProps } from 'components/core/Typography/Heading';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

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
