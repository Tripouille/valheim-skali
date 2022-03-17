import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import AboutPage from '@packages/components/pages/About';

const { defaultExport, StoryFactory } = storybookSetup(AboutPage, StoryCategory.PAGE);

export default defaultExport;

export const About = StoryFactory({});
