import Heading, { HeadingProps } from '@packages/components/core/Heading';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';

const { defaultExport, StoryFactory } = storybookSetup<HeadingProps>(Heading);

export default defaultExport;

export const Default = StoryFactory({
  orientation: 'horizontal',
  size: 'xl',
  children: 'A heading',
});
