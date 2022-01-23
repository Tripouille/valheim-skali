import Button, { ButtonProps } from '@packages/components/core/Button';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';
import { FaSpinner } from 'react-icons/fa';
import { MdComputer } from 'react-icons/md';

const { defaultExport, StoryFactory } = storybookSetup<ButtonProps>(Button);

export default defaultExport;

const baseProperties = {
  elementCategories: ['category1'],
  children: 'Button label',
  colorScheme: 'gray',
  iconSpacing: '',
  isActive: false,
  isDisabled: false,
  isFullWidth: false,
  isLoading: false,
  loadingText: '',
  size: 'md',
  spinnerPlacement: 'start',
  variant: 'solid',
};

export const Default = StoryFactory(baseProperties as ButtonProps);

export const WithLeftIcon = StoryFactory({
  ...(baseProperties as ButtonProps),
  leftIcon: <MdComputer />,
});

export const WithRightIcon = StoryFactory({
  ...(baseProperties as ButtonProps),
  rightIcon: <MdComputer />,
});

export const WithCustomSpinner = StoryFactory({
  ...(baseProperties as ButtonProps),
  isLoading: true,
  spinner: <FaSpinner />,
});
