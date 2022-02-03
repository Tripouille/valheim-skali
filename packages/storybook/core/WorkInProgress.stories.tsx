import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';
import WorkInProgress from '@packages/components/core/Feedback/WorkInProgress';

const { defaultExport, StoryFactory } = storybookSetup(WorkInProgress);

export default defaultExport;

export const Default = StoryFactory({});
