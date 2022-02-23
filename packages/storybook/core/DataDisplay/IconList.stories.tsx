import { FaArrowCircleRight } from 'react-icons/fa';
import { StoryCategory } from '@packages/utils/Storybook/constants';
import { storybookSetup } from '@packages/utils/Storybook/setup';
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
