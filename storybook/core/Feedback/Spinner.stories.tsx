import Spinner, { SpinnerProps } from 'components/core/Feedback/Spinner';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

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
