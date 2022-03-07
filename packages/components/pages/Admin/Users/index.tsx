import { ROUTES_TO_LABEL } from '@packages/utils/routes';
import { ROUTES_TO_PERMISSIONS } from '@packages/utils/auth';
import Secured from '@packages/components/core/Authentication/Secured';
import Loading from '@packages/components/core/Feedback/Loading';
import ErrorAlert from '@packages/components/core/Feedback/ErrorAlert';
import { useUsers } from '../hooks/useUsers';
import PageTitle from '@packages/components/core/Typography/PageTitle';
import { UserQueryFilter, USER_QUERY_FILTER_TO_ADMIN_NAV_ROUTE } from '../utils';
import UsersTable from './UsersTable';

export interface UsersProps {
  filter?: UserQueryFilter;
}

const Users: React.FC<UsersProps> = ({ filter = UserQueryFilter.MEMBER }) => {
  const usersQuery = useUsers(filter);

  const getContentFromStatus = () => {
    switch (usersQuery.status) {
      case 'loading':
        return <Loading />;
      case 'success':
        return <UsersTable users={usersQuery.data} filter={filter} />;
      case 'error':
        return <ErrorAlert error={usersQuery.error} />;
    }
  };

  return (
    <Secured permissions={ROUTES_TO_PERMISSIONS[USER_QUERY_FILTER_TO_ADMIN_NAV_ROUTE[filter]]}>
      <PageTitle
        title={ROUTES_TO_LABEL[USER_QUERY_FILTER_TO_ADMIN_NAV_ROUTE[filter]]}
        size="xl"
        mb="4"
      />
      {getContentFromStatus()}
    </Secured>
  );
};

export default Users;
