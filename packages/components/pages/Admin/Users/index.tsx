import { useUsers } from '../hooks/useUsers';
import { UserQueryFilter, USER_QUERY_FILTER_TO_ADMIN_NAV_ROUTE } from '../utils';
import UsersTable from './UsersTable';
import AdminTableWrapper from '../AdminTableWrapper';

export interface UsersProps {
  filter?: UserQueryFilter;
}

const Users: React.FC<UsersProps> = ({ filter = UserQueryFilter.MEMBER }) => {
  const usersQuery = useUsers(filter);

  return (
    <AdminTableWrapper
      adminNavRoute={USER_QUERY_FILTER_TO_ADMIN_NAV_ROUTE[filter]}
      query={usersQuery}
    >
      <UsersTable users={usersQuery.data ?? []} filter={filter} />
    </AdminTableWrapper>
  );
};

export default Users;
