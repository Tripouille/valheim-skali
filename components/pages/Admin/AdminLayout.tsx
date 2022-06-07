import { User } from 'data/user';
import { Role } from 'data/role';
import { WikiProposal } from 'data/wiki';
import { AdminNavRoute } from 'utils/routes';
import { Children } from 'utils/types';
import Background from 'components/core/Containers/Background';
import Flex from 'components/core/Containers/Flex';
import { Stack } from 'components/core/Containers/Stack';
import AdminNavItem from './AdminNavItem';
import { AdminObject } from './utils';

export interface AdminLayoutProps {
  members?: User[];
  nonMembers?: User[];
  roles?: Role[];
  wikiProposals?: WikiProposal[];
  children: Children;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  members,
  nonMembers,
  roles,
  wikiProposals,
  children,
}) => {
  const routeToData: Record<AdminNavRoute, AdminObject | undefined> = {
    [AdminNavRoute.MEMBERS]: members,
    [AdminNavRoute.NON_MEMBERS]: nonMembers,
    [AdminNavRoute.ROLES]: roles,
    [AdminNavRoute.WIKI]: wikiProposals,
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
            <AdminNavItem
              key={navRoute}
              route={navRoute}
              hint={routeToData[navRoute]?.length.toString() ?? '?'}
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
        {children}
      </Background>
    </Flex>
  );
};

export default AdminLayout;
