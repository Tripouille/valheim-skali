import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import UsersTable from 'components/pages/Users/UsersTable';
import AdminLayout from 'components/Layout/Admin/AdminLayout';
import PageTitle from 'components/core/Typography/PageTitle';
import { UserQueryFilter } from 'hooks/users/useUsers';
import { AdminNavRoute, APIRoute, ROUTES_TO_LABEL } from 'utils/routes';
import { PermissionCategory, rolePrivilege, userPrivilege } from 'utils/permissions';
import members from './members.json';
import roles from './roles.json';

const { defaultExport, StoryFactory } = storybookSetup(
  UsersTable,
  StoryCategory.PAGE_ADMIN,
  {
    decorators: [
      Story => (
        <AdminLayout>
          <PageTitle title={ROUTES_TO_LABEL[AdminNavRoute.MEMBERS]} size="xl" mb="4" />
          <Story />
        </AdminLayout>
      ),
    ],
  },
  undefined,
  'Members',
);

export default defaultExport;

export const MembersEmpty = StoryFactory(
  { filter: UserQueryFilter.MEMBER },
  {
    permissions: { [PermissionCategory.USER]: userPrivilege.READ },
    requestResults: [{ url: APIRoute.USERS, result: [] }],
    router: { query: { route: 'members' } },
  },
);

export const MembersReadOnly = StoryFactory(
  { filter: UserQueryFilter.MEMBER },
  {
    permissions: { [PermissionCategory.USER]: userPrivilege.READ },
    requestResults: [{ url: APIRoute.USERS, result: members }],
    router: { query: { route: 'members' } },
  },
);

export const MembersReadOnlyWithRoles = StoryFactory(
  { filter: UserQueryFilter.MEMBER },
  {
    permissions: {
      [PermissionCategory.USER]: userPrivilege.READ,
      [PermissionCategory.ROLE]: rolePrivilege.READ,
    },
    requestResults: [
      { url: APIRoute.USERS, result: members },
      { url: APIRoute.ROLES, result: roles },
    ],
    router: { query: { route: 'members' } },
  },
);

export const MembersCanEdit = StoryFactory(
  { filter: UserQueryFilter.MEMBER },
  {
    permissions: {
      [PermissionCategory.USER]: userPrivilege.READ_WRITE,
      [PermissionCategory.ROLE]: rolePrivilege.READ,
    },
    requestResults: [
      { url: APIRoute.USERS, result: members },
      { url: APIRoute.ROLES, result: roles },
    ],
    router: { query: { route: 'members' } },
  },
);
