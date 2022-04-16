import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import HomePage from 'components/pages/Home';

const { defaultExport, StoryFactory } = storybookSetup(HomePage, StoryCategory.PAGE);

export default defaultExport;

export const Home = StoryFactory({});
