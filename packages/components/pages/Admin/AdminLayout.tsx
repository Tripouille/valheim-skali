import React from 'react';
import theme from '@packages/theme';
import { AdminNavRoute, MenuRoute, serverName } from '@packages/utils/routes';
import { ROUTES_TO_PERMISSIONS } from '@packages/utils/auth';
import { getDataValue } from '@packages/utils/dataAttributes';
import { Children } from '@packages/utils/types';
import Background from '@packages/components/core/Containers/Background';
import Flex from '@packages/components/core/Containers/Flex';
import { Stack } from '@packages/components/core/Containers/Stack';
import NavItem from '@packages/components/core/Interactive/NavItem';
import Secured from '@packages/components/core/Authentication/Secured';

export interface AdminLayoutProps {
  children: Children;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => (
  <Flex maxW="full" direction={{ base: 'column', lg: 'row' }} justify="center" h="min-content">
    <Background
      bgColor={theme.colors.opaqueBackground}
      as="nav"
      minW="3xs"
      maxW={{ base: 'full', lg: '15%' }}
      mb="1"
      me="1"
      fontFamily="Norse"
      minH={{ base: 'min-content' }}
      p={{ sm: 3, lg: 6 }}
      overflow="auto"
      justifyContent="center"
    >
      <Stack
        align="stretch"
        direction={{ base: 'row', lg: 'column' }}
        w="min-content"
        minW="full"
        justify="center"
      >
        {Object.values(AdminNavRoute).map(route => (
          <Secured key={route} permissions={ROUTES_TO_PERMISSIONS[route]}>
            <NavItem
              dataCy={getDataValue('admin', 'menu', 'nav_item', route)}
              root={`/${serverName}${MenuRoute.ADMIN}`}
              route={route}
            />
          </Secured>
        ))}
      </Stack>
    </Background>
    <Background flex={{ base: 1, lg: 'initial' }} py={[2, 4, 4, 6]} textAlign="center">
      {children}
    </Background>
  </Flex>
);

export default AdminLayout;
