import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import Loading from 'components/core/Feedback/Loading';

const { defaultExport, StoryFactory } = storybookSetup(Loading, StoryCategory.CORE_FEEDBACK);

export default defaultExport;

export const Default = StoryFactory({});
