import { useRouter } from 'next/router';
import { UseQueryResult } from 'react-query';
import theme from '@packages/theme';
import { User } from '@packages/data/user';
import { Role } from '@packages/data/role';
import {
  AdminNavRoute,
  getRouteParameterAsString,
  isAdminNavRoute,
  ROUTES_TO_LABEL,
} from '@packages/utils/routes';
import { ROUTES_TO_PERMISSIONS } from '@packages/utils/auth';
import { Children } from '@packages/utils/types';
import Background from '@packages/components/core/Containers/Background';
import Flex from '@packages/components/core/Containers/Flex';
import { Stack } from '@packages/components/core/Containers/Stack';
import Secured from '@packages/components/core/Authentication/Secured';
import PageTitle from '@packages/components/core/Typography/PageTitle';
import QueryHandler from '@packages/components/core/Disclosure/QueryHandler';
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
      <Background flex={{ base: 1, lg: 'initial' }} py={[2, 4, 4, 6]} textAlign="center">
        <Secured permissions={ROUTES_TO_PERMISSIONS[route]}>
          <PageTitle title={ROUTES_TO_LABEL[route]} size="xl" mb="4" />
          <QueryHandler query={routeToQuery[route]}>{routeToComponent[route]}</QueryHandler>
        </Secured>
      </Background>
    </Flex>
  );
};

export default Admin;
