import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import Admin from 'components/pages/Admin';
import { APIRoute } from 'utils/routes';
import { PermissionCategory, PermissionPrivilege } from 'utils/auth';
import roles from './roles.json';

const { defaultExport, StoryFactory } = storybookSetup(Admin, StoryCategory.PAGE, {});

export default defaultExport;

export const RolesEmpty = StoryFactory(
  {},
  {
    permissions: { [PermissionCategory.ROLE]: PermissionPrivilege.READ },
    requestResults: [{ url: APIRoute.ROLES, result: [] }],
    router: { query: { route: 'roles' } },
  },
);

export const RolesReadOnly = StoryFactory(
  {},
  {
    permissions: { [PermissionCategory.ROLE]: PermissionPrivilege.READ },
    requestResults: [{ url: APIRoute.ROLES, result: roles }],
    router: { query: { route: 'roles' } },
  },
);

export const RolesCanEdit = StoryFactory(
  {},
  {
    permissions: { [PermissionCategory.ROLE]: PermissionPrivilege.READ_WRITE },
    requestResults: [{ url: APIRoute.ROLES, result: roles }],
    router: { query: { route: 'roles' } },
  },
);
