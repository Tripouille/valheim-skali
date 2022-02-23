import { MdComputer } from 'react-icons/md';
import { storybookSetup } from '@packages/utils/Storybook/setup';
import { StoryCategory } from '@packages/utils/Storybook/constants';
import IconTitle, { IconTitleProps } from '@packages/components/core/Typography/IconTitle';

const { defaultExport, StoryFactory } = storybookSetup<IconTitleProps>(
  IconTitle,
  StoryCategory.CORE_TYPOGRAPHY,
);

export default defaultExport;

export const Default = StoryFactory({
  title: 'title',
  size: 'md',
  icon: MdComputer,
  iconColor: 'red',
});
