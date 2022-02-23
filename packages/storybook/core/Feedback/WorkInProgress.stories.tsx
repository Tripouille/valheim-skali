import { storybookSetup } from '@packages/utils/Storybook/setup';
import { StoryCategory } from '@packages/utils/Storybook/constants';
import WorkInProgress from '@packages/components/core/Feedback/WorkInProgress';

const { defaultExport, StoryFactory } = storybookSetup(WorkInProgress, StoryCategory.CORE_FEEDBACK);

export default defaultExport;

export const Default = StoryFactory({});
