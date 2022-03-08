import { UseQueryResult } from 'react-query';
import { ROUTES_TO_PERMISSIONS } from '@packages/utils/auth';
import { AdminNavRoute, ROUTES_TO_LABEL } from '@packages/utils/routes';
import Secured from '@packages/components/core/Authentication/Secured';
import PageTitle from '@packages/components/core/Typography/PageTitle';
import ErrorAlert from '@packages/components/core/Feedback/ErrorAlert';
import Loading from '@packages/components/core/Feedback/Loading';
import { Children } from '@packages/utils/types';

export interface AdminTableWrapperProps<T> {
  adminNavRoute: AdminNavRoute;
  query: UseQueryResult<T, unknown>;
  children: Children;
}

const AdminTableWrapper = <T extends object>({
  adminNavRoute,
  query,
  children,
}: AdminTableWrapperProps<T>) => {
  const getContentFromStatus = () => {
    switch (query.status) {
      case 'loading':
        return <Loading />;
      case 'success':
        return <>{children}</>;
      case 'error':
        return <ErrorAlert error={query.error} />;
    }
  };

  return (
    <Secured permissions={ROUTES_TO_PERMISSIONS[adminNavRoute]}>
      <PageTitle title={ROUTES_TO_LABEL[adminNavRoute]} size="xl" mb="4" />
      {getContentFromStatus()}
    </Secured>
  );
};

export default AdminTableWrapper;
