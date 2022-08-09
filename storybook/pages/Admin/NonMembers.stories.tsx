import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import UsersTable from 'components/pages/Users/UsersTable';
import AdminLayout from 'components/Layout/Admin/AdminLayout';
import PageTitle from 'components/core/Typography/PageTitle';
import { UserQueryFilter } from 'hooks/users/useUsers';
import { AdminNavRoute, APIRoute, ROUTES_TO_LABEL } from 'utils/routes';
import { PermissionCategory, rolePrivilege, userPrivilege } from 'utils/permissions';
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
    permissions: { [PermissionCategory.USER]: userPrivilege.READ },
    requestResults: [{ url: APIRoute.USERS, result: [] }],
    router: { query: { route: 'non-members' } },
  },
);

export const NonMembersReadOnly = StoryFactory(
  { filter: UserQueryFilter.NON_MEMBER },
  {
    permissions: { [PermissionCategory.USER]: userPrivilege.READ },
    requestResults: [{ url: APIRoute.USERS, result: nonMembers }],
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
