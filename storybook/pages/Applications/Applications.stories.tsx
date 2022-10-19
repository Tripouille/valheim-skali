import Applications from 'components/pages/Applications';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';
import { PermissionCategory, applicationPrivilege } from 'utils/permissions';
import { APIRoute } from 'utils/routes';
import applications from './applications.json';

const { defaultExport, StoryFactory } = storybookSetup(
  Applications,
  StoryCategory.PAGE_APPLICATIONS,
  {},
  undefined,
  'Applications List',
);

export default defaultExport;

export const ApplicationsList = StoryFactory(
  {},
  {
    permissions: { [PermissionCategory.APPLICATION]: applicationPrivilege.READ },
    requestResults: [{ url: APIRoute.APPLICATIONS, result: applications }],
  },
);
