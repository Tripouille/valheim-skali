import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import WorkInProgress from 'components/core/Feedback/WorkInProgress';

const { defaultExport, StoryFactory } = storybookSetup(WorkInProgress, StoryCategory.CORE_FEEDBACK);

export default defaultExport;

export const Default = StoryFactory({});
