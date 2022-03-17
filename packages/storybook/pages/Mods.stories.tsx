import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import ModsPage from '@packages/components/pages/Mods';

const { defaultExport, StoryFactory } = storybookSetup(ModsPage, StoryCategory.PAGE);

export default defaultExport;

export const Mods = StoryFactory({});
