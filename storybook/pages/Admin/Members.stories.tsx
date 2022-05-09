import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import { AdminNavRoute, APIRoute, ROUTES_TO_LABEL } from 'utils/routes';
import { PermissionCategory, PermissionPrivilege } from 'utils/auth';
import UsersTable from 'components/pages/Admin/Users/UsersTable';
import { UserQueryFilter } from 'components/pages/Admin/utils';
import AdminLayout from 'components/pages/Admin/AdminLayout';
import PageTitle from 'components/core/Typography/PageTitle';
import members from './members.json';
import roles from './roles.json';

const { defaultExport, StoryFactory } = storybookSetup(UsersTable, StoryCategory.PAGE_ADMIN, {
  decorators: [
    Story => (
      <AdminLayout>
        <PageTitle title={ROUTES_TO_LABEL[AdminNavRoute.MEMBERS]} size="xl" mb="4" />
        <Story />
      </AdminLayout>
    ),
  ],
});

export default defaultExport;

export const MembersEmpty = StoryFactory(
  { filter: UserQueryFilter.MEMBER },
  { permissions: { [PermissionCategory.USER]: PermissionPrivilege.READ } },
);

export const MembersReadOnly = StoryFactory(
  { filter: UserQueryFilter.MEMBER, users: members },
  { permissions: { [PermissionCategory.USER]: PermissionPrivilege.READ } },
);

export const MembersReadOnlyWithRoles = StoryFactory(
  { filter: UserQueryFilter.MEMBER, users: members },
  {
    permissions: {
      [PermissionCategory.USER]: PermissionPrivilege.READ,
      [PermissionCategory.ROLE]: PermissionPrivilege.READ,
    },
    requestResults: [{ url: APIRoute.ROLES, result: roles }],
  },
);

export const MembersCanEdit = StoryFactory(
  { filter: UserQueryFilter.MEMBER, users: members },
  {
    permissions: {
      [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE,
      [PermissionCategory.ROLE]: PermissionPrivilege.READ,
    },
    requestResults: [{ url: APIRoute.ROLES, result: roles }],
  },
);
