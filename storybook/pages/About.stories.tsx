import AboutPage from 'components/pages/About';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

const { defaultExport, StoryFactory } = storybookSetup(AboutPage, StoryCategory.PAGE);

export default defaultExport;

export const About = StoryFactory({});
