import PageTitle from 'components/core/Typography/PageTitle';
import AdminLayout from 'components/Layout/Admin/AdminLayout';
import UsersTable from 'components/pages/Users/UsersTable';
import { UserQueryFilter } from 'hooks/users/useUsers';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';
import { PermissionCategory, rolePrivilege, userPrivilege } from 'utils/permissions';
import { AdminNavRoute, APIRoute, ROUTES_TO_LABEL } from 'utils/routes';
import nonMembers from './nonMembers.json';
import roles from './roles.json';

const { defaultExport, StoryFactory } = storybookSetup(
  UsersTable,
  StoryCategory.PAGE_ADMIN,
  {
    decorators: [
      Story => (
        <AdminLayout>
          <PageTitle title={ROUTES_TO_LABEL[AdminNavRoute.NON_MEMBERS]} size="xl" mb="4" />
          <Story />
        </AdminLayout>
      ),
    ],
  },
  undefined,
  'Non Members',
);

export default defaultExport;

export const NonMembersEmpty = StoryFactory(
  { filter: UserQueryFilter.NON_MEMBER },
  {
    permissions: {
      [PermissionCategory.USER]: userPrivilege.READ,
      [PermissionCategory.ROLE]: rolePrivilege.READ,
    },
    requestResults: [
      { url: APIRoute.USERS, result: [] },
      { url: APIRoute.ROLES, result: [] },
    ],
    router: { query: { route: 'non-members' } },
  },
);

export const NonMembersReadOnly = StoryFactory(
  { filter: UserQueryFilter.NON_MEMBER },
  {
    permissions: {
      [PermissionCategory.USER]: userPrivilege.READ,
      [PermissionCategory.ROLE]: rolePrivilege.READ,
    },
    requestResults: [
      { url: APIRoute.USERS, result: nonMembers },
      { url: APIRoute.ROLES, result: roles },
    ],
    router: { query: { route: 'non-members' } },
  },
);

export const NonMembersCanEdit = StoryFactory(
  { filter: UserQueryFilter.NON_MEMBER },
  {
    permissions: {
      [PermissionCategory.USER]: userPrivilege.READ_WRITE,
      [PermissionCategory.ROLE]: rolePrivilege.READ,
    },
    requestResults: [
      { url: APIRoute.USERS, result: nonMembers },
      { url: APIRoute.ROLES, result: roles },
    ],
    router: { query: { route: 'non-members' } },
  },
);
