import Icon, { IconProps } from '@packages/components/core/Icon';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';
import { GiVillage } from 'react-icons/gi';

const { defaultExport, StoryFactory } = storybookSetup<IconProps>(Icon);

export default defaultExport;

export const Default = StoryFactory({
  as: GiVillage,
  viewBox: '0 0 24 24',
  boxSize: '4em',
  color: 'white',
  focusable: false,
  role: '',
});
