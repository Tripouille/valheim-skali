import { action } from '@storybook/addon-actions';
import IconButton, { IconButtonProps } from '@packages/components/core/Interactive/IconButton';
import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import { FaDiscord, FaSpinner } from 'react-icons/fa';

const { defaultExport, StoryFactory } = storybookSetup<IconButtonProps>(
  IconButton,
  StoryCategory.CORE_INTERACTIVE,
);

export default defaultExport;

const baseProperties: IconButtonProps = {
  dataCy: '',
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
