import Icon, { IconProps } from 'components/core/Images/Icon';
import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import { GiVillage } from 'react-icons/gi';

const { defaultExport, StoryFactory } = storybookSetup<IconProps>(Icon, StoryCategory.CORE_IMAGES);

export default defaultExport;

export const Default = StoryFactory({
  as: GiVillage,
  viewBox: '0 0 24 24',
  boxSize: '4em',
  color: 'white',
  focusable: false,
  role: '',
});
