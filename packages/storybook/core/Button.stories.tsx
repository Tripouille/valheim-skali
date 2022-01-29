import { action } from '@storybook/addon-actions';
import Button, { ButtonProps } from '@packages/components/core/Button';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';
import { FaSpinner } from 'react-icons/fa';
import { MdComputer } from 'react-icons/md';

const { defaultExport, StoryFactory } = storybookSetup<ButtonProps>(Button);

export default defaultExport;

const baseProperties: ButtonProps = {
  elementCategories: ['category1'],
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
