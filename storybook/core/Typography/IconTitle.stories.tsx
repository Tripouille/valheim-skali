import { MdComputer } from 'react-icons/md';
import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import IconTitle, { IconTitleProps } from 'components/core/Typography/IconTitle';

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
