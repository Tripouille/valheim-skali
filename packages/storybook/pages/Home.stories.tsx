import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import HomePage from '@packages/components/pages/Home';

const { defaultExport, StoryFactory } = storybookSetup(HomePage, StoryCategory.PAGE);

export default defaultExport;

export const Home = StoryFactory({});
