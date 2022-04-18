import { action } from '@storybook/addon-actions';
import IconButton, { IconButtonProps } from 'components/core/Interactive/IconButton';
import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import { FaDiscord, FaSpinner } from 'react-icons/fa';

const { defaultExport, StoryFactory } = storybookSetup<IconButtonProps>(
  IconButton,
  StoryCategory.CORE_INTERACTIVE,
);

export default defaultExport;

const baseProperties: IconButtonProps = {
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
