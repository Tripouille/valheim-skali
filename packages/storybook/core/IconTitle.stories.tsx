import IconTitle, { IconTitleProps } from '@packages/components/core/IconTitle';
import { MdComputer } from 'react-icons/md';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';

const { defaultExport, StoryFactory } = storybookSetup<IconTitleProps>(IconTitle);

export default defaultExport;

export const Default = StoryFactory({
  title: 'title',
  size: 'md',
  icon: MdComputer,
  iconColor: 'red',
});
