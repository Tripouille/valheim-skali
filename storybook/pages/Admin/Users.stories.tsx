import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import Admin from 'components/pages/Admin';
import { APIRoute } from 'utils/routes';
import { PermissionCategory, PermissionPrivilege } from 'utils/auth';
import users from './users.json';
import roles from './roles.json';

const { defaultExport, StoryFactory } = storybookSetup(Admin, StoryCategory.PAGE, {});

export default defaultExport;

export const NonMembersEmpty = StoryFactory(
  {},
  {
    permissions: {
      [PermissionCategory.USER]: PermissionPrivilege.READ,
      [PermissionCategory.ROLE]: PermissionPrivilege.READ,
    },
    requestResults: [{ url: APIRoute.USERS, result: [] }],
    router: { query: { route: 'non-members' } },
  },
);

export const NonMembersReadOnly = StoryFactory(
  {},
  {
    permissions: {
      [PermissionCategory.USER]: PermissionPrivilege.READ,
      [PermissionCategory.ROLE]: PermissionPrivilege.READ,
    },
    requestResults: [{ url: APIRoute.USERS, result: users }],
    router: { query: { route: 'non-members' } },
  },
);

export const NonMembersCanEdit = StoryFactory(
  {},
  {
    permissions: {
      [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE,
      [PermissionCategory.ROLE]: PermissionPrivilege.READ,
    },
    requestResults: [
      { url: APIRoute.USERS, result: users },
      { url: APIRoute.ROLES, result: roles },
    ],
    router: { query: { route: 'non-members' } },
  },
);

export const MembersEmpty = StoryFactory(
  {},
  {
    permissions: {
      [PermissionCategory.USER]: PermissionPrivilege.READ,
      [PermissionCategory.ROLE]: PermissionPrivilege.READ,
    },
    requestResults: [{ url: APIRoute.USERS, result: [] }],
  },
);

export const MembersReadOnly = StoryFactory(
  {},
  {
    permissions: {
      [PermissionCategory.USER]: PermissionPrivilege.READ,
      [PermissionCategory.ROLE]: PermissionPrivilege.READ,
    },
    requestResults: [
      { url: APIRoute.USERS, result: users },
      { url: APIRoute.ROLES, result: roles },
    ],
  },
);

export const MembersCanEdit = StoryFactory(
  {},
  {
    permissions: {
      [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE,
      [PermissionCategory.ROLE]: PermissionPrivilege.READ,
    },
    requestResults: [
      { url: APIRoute.USERS, result: users },
      { url: APIRoute.ROLES, result: roles },
    ],
  },
);
