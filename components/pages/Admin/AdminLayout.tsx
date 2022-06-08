import Background from 'components/core/Containers/Background';
import Flex from 'components/core/Containers/Flex';
import { Stack } from 'components/core/Containers/Stack';
import { AdminNavRoute } from 'utils/routes';
import { Children } from 'utils/types';
import AdminNavItem from './AdminNavItem';
import { useUsers } from './hooks/useUsers';
import { useWikiProposals } from './hooks/useWikiProposals';
import { UserQueryFilter } from './utils';

export interface AdminLayoutProps {
  children: Children;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { data: nonMembers } = useUsers(UserQueryFilter.NON_MEMBER);
  const { data: unhandledWikiProposals } = useWikiProposals({ unhandled: true });

  const routeToHint: Partial<Record<AdminNavRoute, number | undefined>> = {
    [AdminNavRoute.NON_MEMBERS]: nonMembers?.length,
    [AdminNavRoute.WIKI]: unhandledWikiProposals?.length,
  };

  return (
    <Flex maxW="full" direction={{ base: 'column', lg: 'row' }} justify="center" h="min-content">
      <Background
        data-cy="admin-nav"
        bgColor="opaqueBackground"
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
            <AdminNavItem key={navRoute} route={navRoute} hint={routeToHint[navRoute]} />
          ))}
        </Stack>
      </Background>
      <Background
        data-cy="admin"
        flex={{ base: 1, lg: 'initial' }}
        py={[2, 4, 4, 6]}
        textAlign="center"
      >
        {children}
      </Background>
    </Flex>
  );
};

export default AdminLayout;
