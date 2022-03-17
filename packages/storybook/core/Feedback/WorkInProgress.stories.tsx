import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import WorkInProgress from '@packages/components/core/Feedback/WorkInProgress';

const { defaultExport, StoryFactory } = storybookSetup(WorkInProgress, StoryCategory.CORE_FEEDBACK);

export default defaultExport;

export const Default = StoryFactory({});
