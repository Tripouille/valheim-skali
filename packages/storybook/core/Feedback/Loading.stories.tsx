import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import Loading from '@packages/components/core/Feedback/Loading';

const { defaultExport, StoryFactory } = storybookSetup(Loading, StoryCategory.CORE_FEEDBACK);

export default defaultExport;

export const Default = StoryFactory({});
