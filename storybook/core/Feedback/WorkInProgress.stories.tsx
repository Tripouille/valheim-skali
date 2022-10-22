import WorkInProgress from 'components/core/Feedback/WorkInProgress';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

const { defaultExport, StoryFactory } = storybookSetup(WorkInProgress, StoryCategory.CORE_FEEDBACK);

export default defaultExport;

export const Default = StoryFactory({});
