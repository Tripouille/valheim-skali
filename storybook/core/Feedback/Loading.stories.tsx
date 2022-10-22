import Loading from 'components/core/Feedback/Loading';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

const { defaultExport, StoryFactory } = storybookSetup(Loading, StoryCategory.CORE_FEEDBACK);

export default defaultExport;

export const Default = StoryFactory({});
