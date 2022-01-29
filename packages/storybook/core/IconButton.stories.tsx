import { action } from '@storybook/addon-actions';
import IconButton, { IconButtonProps } from '@packages/components/core/IconButton';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';
import { FaDiscord, FaSpinner } from 'react-icons/fa';

const { defaultExport, StoryFactory } = storybookSetup<IconButtonProps>(IconButton);

export default defaultExport;

const baseProperties: IconButtonProps = {
  elementCategories: [],
  'aria-label': 'Describes the button',
  colorScheme: 'gray',
  icon: <FaDiscord />,
  isActive: false,
  isDisabled: false,
  isLoading: false,
  isRound: false,
  onClick: action('clicked'),
  size: 'md',
  variant: 'solid',
};

export const Default = StoryFactory(baseProperties);

export const WithCustomSpinner = StoryFactory({
  ...baseProperties,
  isLoading: true,
  spinner: <FaSpinner />,
});
