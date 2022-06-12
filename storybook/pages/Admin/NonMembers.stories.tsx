import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import UsersTable from 'components/pages/Users/UsersTable';
import AdminLayout from 'components/Layout/Admin/AdminLayout';
import PageTitle from 'components/core/Typography/PageTitle';
import { UserQueryFilter } from 'hooks/users/useUsers';
import { AdminNavRoute, ROUTES_TO_LABEL } from 'utils/routes';
import { PermissionCategory, userPrivilege } from 'utils/permissions';

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
  },
);

// TODO
// export const NonMembersReadOnly = StoryFactory(
//   { filter: UserQueryFilter.NON_MEMBER, users: nonMembers },
//   { permissions: { [PermissionCategory.USER]: userPrivilege.READ } },
// );

// export const NonMembersCanEdit = StoryFactory(
//   { filter: UserQueryFilter.NON_MEMBER, users: nonMembers },
//   {
//     permissions: {
//       [PermissionCategory.USER]: userPrivilege.READ_WRITE,
//       [PermissionCategory.ROLE]: rolePrivilege.READ,
//     },
//     requestResults: [{ url: APIRoute.ROLES, result: roles }],
//   },
// );
