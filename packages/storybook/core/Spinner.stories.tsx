import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';
import Spinner, { SpinnerProps } from '@packages/components/core/Feedback/Spinner';

const { defaultExport, StoryFactory } = storybookSetup<SpinnerProps>(Spinner);

export default defaultExport;

export const Default = StoryFactory({
  emptyColor: 'blue.200',
  label: 'Accessibility label',
  size: 'md',
  speed: '0.5s',
  thickness: '1px',
});
