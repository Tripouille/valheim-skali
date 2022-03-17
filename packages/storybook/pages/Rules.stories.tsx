import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import RulesPage from '@packages/components/pages/Rules';

const { defaultExport, StoryFactory } = storybookSetup(RulesPage, StoryCategory.PAGE);

export default defaultExport;

export const Rules = StoryFactory({});
