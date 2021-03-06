import { action } from '@storybook/addon-actions';
import Button, { ButtonProps } from 'components/core/Interactive/Button';
import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import { FaSpinner } from 'react-icons/fa';
import { MdComputer } from 'react-icons/md';

const { defaultExport, StoryFactory } = storybookSetup<ButtonProps>(
  Button,
  StoryCategory.CORE_INTERACTIVE,
);

export default defaultExport;

const baseProperties: ButtonProps = {
  children: 'Button label',
  colorScheme: 'gray',
  iconSpacing: '',
  isActive: false,
  isDisabled: false,
  isFullWidth: false,
  isLoading: false,
  loadingText: '',
  onClick: action('clicked'),
  size: 'md',
  spinnerPlacement: 'start',
  variant: 'solid',
};

export const Default = StoryFactory(baseProperties);

export const WithLeftIcon = StoryFactory({
  ...baseProperties,
  leftIcon: <MdComputer />,
});

export const WithRightIcon = StoryFactory({
  ...baseProperties,
  rightIcon: <MdComputer />,
});

export const WithCustomSpinner = StoryFactory({
  ...baseProperties,
  isLoading: true,
  spinner: <FaSpinner />,
});
