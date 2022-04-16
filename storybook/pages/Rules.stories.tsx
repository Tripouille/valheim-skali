import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import RulesPage from 'components/pages/Rules';

const { defaultExport, StoryFactory } = storybookSetup(RulesPage, StoryCategory.PAGE);

export default defaultExport;

export const Rules = StoryFactory({});
