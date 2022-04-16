import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import WorldPage from 'components/pages/World';

const { defaultExport, StoryFactory } = storybookSetup(WorldPage, StoryCategory.PAGE);

export default defaultExport;

export const World = StoryFactory({});
