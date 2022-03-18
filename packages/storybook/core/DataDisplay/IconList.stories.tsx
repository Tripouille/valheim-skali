import { FaArrowCircleRight } from 'react-icons/fa';
import { StoryCategory } from '@packages/storybook/config/constants';
import { storybookSetup } from '@packages/storybook/config/setup';
import IconList, { IconListProps } from '@packages/components/core/DataDisplay/IconList';

const { defaultExport, StoryFactory } = storybookSetup<IconListProps>(
  IconList,
  StoryCategory.CORE_DATA_DISPLAY,
);

export default defaultExport;

export const Default = StoryFactory({
  list: ['Item 1', 'Item 2', 'Item 3'],
  icon: FaArrowCircleRight,
  iconColor: 'blue.200',
});
Default.argTypes = {
  icon: { control: false },
};
