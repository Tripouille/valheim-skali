import Admin from 'components/Layout/Admin';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';
import { PermissionCategory, rulesQuestionnairePrivilege } from 'utils/permissions';
import { APIRoute } from 'utils/routes';
import rulesQuestionnaire from './rulesQuestionnaire.json';

const { defaultExport, StoryFactory } = storybookSetup(
  Admin,
  StoryCategory.PAGE_ADMIN,
  {},
  undefined,
  'Rules Questionnaire',
);

export default defaultExport;

export const RulesQuestionnaire = StoryFactory(
  {},
  {
    permissions: { [PermissionCategory.RULES_QUESTIONNAIRE]: rulesQuestionnairePrivilege.MANAGE },
    requestResults: [{ url: APIRoute.RULES_QUESTIONNAIRE, result: rulesQuestionnaire }],
    router: { query: { route: 'rules-questionnaire' } },
  },
);
