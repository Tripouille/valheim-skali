import RulesPage from 'components/pages/Rules';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';
import { PermissionCategory, rulesPrivilege } from 'utils/permissions';

const { defaultExport, StoryFactory } = storybookSetup(RulesPage, StoryCategory.PAGE);

export default defaultExport;

export const Rules = StoryFactory(
  {},
  {
    permissions: { [PermissionCategory.RULES]: rulesPrivilege.READ },
  },
);
