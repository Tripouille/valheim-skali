import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import { AdminNavRoute, APIRoute, ROUTES_TO_LABEL } from 'utils/routes';
import { PermissionCategory, PermissionPrivilege } from 'utils/auth';
import UsersTable from 'components/pages/Admin/Users/UsersTable';
import { UserQueryFilter } from 'components/pages/Admin/utils';
import AdminLayout from 'components/pages/Admin/AdminLayout';
import PageTitle from 'components/core/Typography/PageTitle';
import nonMembers from './nonMembers.json';
import roles from './roles.json';

const { defaultExport, StoryFactory } = storybookSetup(UsersTable, StoryCategory.PAGE_ADMIN, {
  decorators: [
    Story => (
      <AdminLayout>
        <PageTitle title={ROUTES_TO_LABEL[AdminNavRoute.NON_MEMBERS]} size="xl" mb="4" />
        <Story />
      </AdminLayout>
    ),
  ],
});

export default defaultExport;

export const NonMembersEmpty = StoryFactory(
  { filter: UserQueryFilter.NON_MEMBER },
  {
    permissions: { [PermissionCategory.USER]: PermissionPrivilege.READ },
  },
);

export const NonMembersReadOnly = StoryFactory(
  { filter: UserQueryFilter.NON_MEMBER, users: nonMembers },
  { permissions: { [PermissionCategory.USER]: PermissionPrivilege.READ } },
);

export const NonMembersCanEdit = StoryFactory(
  { filter: UserQueryFilter.NON_MEMBER, users: nonMembers },
  {
    permissions: {
      [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE,
      [PermissionCategory.ROLE]: PermissionPrivilege.READ,
    },
    requestResults: [{ url: APIRoute.ROLES, result: roles }],
  },
);
