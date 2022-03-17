import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import Spinner, { SpinnerProps } from '@packages/components/core/Feedback/Spinner';

const { defaultExport, StoryFactory } = storybookSetup<SpinnerProps>(
  Spinner,
  StoryCategory.CORE_FEEDBACK,
);

export default defaultExport;

export const Default = StoryFactory({
  emptyColor: 'blue.200',
  label: 'Accessibility label',
  size: 'md',
  speed: '0.5s',
  thickness: '1px',
});
