import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import HomePage from 'components/pages/Home';

const { defaultExport, StoryFactory } = storybookSetup(HomePage, StoryCategory.PAGE, {
  parameters: { chromatic: { delay: 1000 } },
});

export default defaultExport;

export const Home = StoryFactory({});
