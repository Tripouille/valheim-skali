import { useRouter } from 'next/router';
import { UseQueryResult } from 'react-query';
import theme from 'theme';
import { User } from 'data/user';
import { Role } from 'data/role';
import {
  AdminNavRoute,
  getRouteParameterAsString,
  isAdminNavRoute,
  ROUTES_TO_LABEL,
} from 'utils/routes';
import { ROUTES_TO_PERMISSIONS } from 'utils/auth';
import { Children } from 'utils/types';
import Background from 'components/core/Containers/Background';
import Flex from 'components/core/Containers/Flex';
import { Stack } from 'components/core/Containers/Stack';
import Secured from 'components/core/Authentication/Secured';
import PageTitle from 'components/core/Typography/PageTitle';
import QueryHandler from 'components/core/Disclosure/QueryHandler';
import { UserQueryFilter } from './utils';
import { useUsers } from './hooks/useUsers';
import { useRoles } from './hooks/useRoles';
import AdminNavItem from './AdminNavItem';
import UsersTable from './Users/UsersTable';
import Roles from './Roles';

const Admin = () => {
  const membersQuery = useUsers(UserQueryFilter.MEMBER);
  const nonMembersQuery = useUsers(UserQueryFilter.NON_MEMBER);
  const rolesQuery = useRoles();

  const router = useRouter();
  const urlEndPoint = '/' + getRouteParameterAsString(router.query.route);

  const route = isAdminNavRoute(urlEndPoint) ? urlEndPoint : AdminNavRoute.MEMBERS;

  const routeToQuery: Record<AdminNavRoute, UseQueryResult<User[] | Role[]>> = {
    [AdminNavRoute.MEMBERS]: membersQuery,
    [AdminNavRoute.NON_MEMBERS]: nonMembersQuery,
    [AdminNavRoute.ROLES]: rolesQuery,
  };

  const routeToComponent: Record<AdminNavRoute, Children> = {
    [AdminNavRoute.MEMBERS]: (
      <UsersTable users={membersQuery.data} filter={UserQueryFilter.MEMBER} />
    ),
    [AdminNavRoute.NON_MEMBERS]: (
      <UsersTable users={nonMembersQuery.data} filter={UserQueryFilter.NON_MEMBER} />
    ),
    [AdminNavRoute.ROLES]: <Roles roles={rolesQuery.data} />,
  };

  return (
    <Flex maxW="full" direction={{ base: 'column', lg: 'row' }} justify="center" h="min-content">
      <Background
        data-cy="admin-nav"
        bgColor={theme.colors.opaqueBackground}
        as="nav"
        minW="xs"
        maxW={{ base: 'full', lg: '15%' }}
        mb="1"
        me="1"
        fontFamily="Norse"
        p={{ sm: 3, lg: 6 }}
        overflow="auto"
      >
        <Stack
          direction={{ base: 'row', lg: 'column' }}
          w={{ base: 'min-content', lg: 'full' }}
          margin="auto"
          spacing={{ base: 5, lg: 2 }}
        >
          {Object.values(AdminNavRoute).map(navRoute => (
            <AdminNavItem
              key={navRoute}
              route={navRoute}
              hint={routeToQuery[navRoute].data?.length.toString() ?? '?'}
            />
          ))}
        </Stack>
      </Background>
      <Background
        data-cy="admin"
        flex={{ base: 1, lg: 'initial' }}
        py={[2, 4, 4, 6]}
        textAlign="center"
      >
        <Secured permissions={ROUTES_TO_PERMISSIONS[route]}>
          <PageTitle title={ROUTES_TO_LABEL[route]} size="xl" mb="4" />
          <QueryHandler query={routeToQuery[route]}>{routeToComponent[route]}</QueryHandler>
        </Secured>
      </Background>
    </Flex>
  );
};

export default Admin;