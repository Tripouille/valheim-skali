import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import ModsPage from 'components/pages/Mods';

const { defaultExport, StoryFactory } = storybookSetup(ModsPage, StoryCategory.PAGE);

export default defaultExport;

export const Mods = StoryFactory({});
