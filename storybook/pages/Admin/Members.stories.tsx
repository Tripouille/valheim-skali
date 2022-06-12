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
  { permissions: { [PermissionCategory.USER]: userPrivilege.READ } },
);

// TODO
// export const MembersReadOnly = StoryFactory(
//   { filter: UserQueryFilter.MEMBER, users: members },
//   { permissions: { [PermissionCategory.USER]: userPrivilege.READ } },
// );

// export const MembersReadOnlyWithRoles = StoryFactory(
//   { filter: UserQueryFilter.MEMBER, users: members },
//   {
//     permissions: {
//       [PermissionCategory.USER]: userPrivilege.READ,
//       [PermissionCategory.ROLE]: rolePrivilege.READ,
//     },
//     requestResults: [{ url: APIRoute.ROLES, result: roles }],
//   },
// );

// export const MembersCanEdit = StoryFactory(
//   { filter: UserQueryFilter.MEMBER, users: members },
//   {
//     permissions: {
//       [PermissionCategory.USER]: userPrivilege.READ_WRITE,
//       [PermissionCategory.ROLE]: rolePrivilege.READ,
//     },
//     requestResults: [{ url: APIRoute.ROLES, result: roles }],
//   },
// );
