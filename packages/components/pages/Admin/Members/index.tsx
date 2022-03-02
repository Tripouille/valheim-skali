import { AdminNavRoute, ROUTES_TO_LABEL } from '@packages/utils/routes';
import { ROUTES_TO_PERMISSIONS } from '@packages/utils/auth';
import Secured from '@packages/components/core/Authentication/Secured';
import Loading from '@packages/components/core/Feedback/Loading';
import ErrorAlert from '@packages/components/core/Feedback/ErrorAlert';
import { UserQueryFilter, useUsers } from '../hooks/useUsers';
import PageTitle from '@packages/components/core/Typography/PageTitle';
import MembersTable from './MembersTable';

const Members = () => {
  const usersQuery = useUsers(UserQueryFilter.MEMBER);

  const getContentFromStatus = () => {
    switch (usersQuery.status) {
      case 'loading':
        return <Loading />;
      case 'success':
        return <MembersTable users={usersQuery.data} />;
      case 'error':
        return <ErrorAlert error={usersQuery.error} />;
    }
  };

  return (
    <Secured permissions={ROUTES_TO_PERMISSIONS[AdminNavRoute.MEMBERS]}>
      <PageTitle title={ROUTES_TO_LABEL[AdminNavRoute.MEMBERS]} size="xl" mb="4" />
      {getContentFromStatus()}
    </Secured>
  );
};

export default Members;
