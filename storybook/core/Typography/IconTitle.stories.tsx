import { MdComputer } from 'react-icons/md';
import IconTitle, { IconTitleProps } from 'components/core/Typography/IconTitle';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

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
