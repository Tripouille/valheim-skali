import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import AboutPage from 'components/pages/About';

const { defaultExport, StoryFactory } = storybookSetup(AboutPage, StoryCategory.PAGE);

export default defaultExport;

export const About = StoryFactory({});
