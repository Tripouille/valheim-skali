import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import WorldPage from '@packages/components/pages/World';

const { defaultExport, StoryFactory } = storybookSetup(WorldPage, StoryCategory.PAGE);

export default defaultExport;

export const World = StoryFactory({});
