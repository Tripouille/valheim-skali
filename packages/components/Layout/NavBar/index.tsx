import NextLink from 'next/link';
import { useSession } from 'next-auth/react';
import React from 'react';
import { GiStakeHammer, GiVikingHelmet } from 'react-icons/gi';
import { BiChevronDown } from 'react-icons/bi';
import { CgInfo } from 'react-icons/cg';
import { chakra, useBreakpointValue } from '@chakra-ui/react';
import theme from '@packages/theme';
import { getDataValue } from '@packages/utils/dataAttributes';
import { SessionStatus, ROUTES_TO_PERMISSIONS } from '@packages/utils/auth';
import { MenuRoute, ROUTES_TO_LABEL } from '@packages/utils/routes';
import Center from '@packages/components/core/Containers/Center';
import IconButton from '@packages/components/core/Interactive/IconButton';
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@packages/components/core/Overlay/Menu';
import Secured from '@packages/components/core/Authentication/Secured';
import HeaderMenu from './HeaderMenu';
import DrawerMenu from './DrawerMenu';
import SignInOut from './SignInOut';

enum MenuType {
  DRAWER,
  HEADER,
}
const serverName = 'valhabba';

const NavBar = () => {
  const session = useSession();
  const menuType = useBreakpointValue({ base: MenuType.DRAWER, lg: MenuType.HEADER });

  return (
    <chakra.header height="header" bgColor={theme.colors.overlay}>
      <Center justifyContent="space-between" h="full">
        {menuType === MenuType.HEADER && <HeaderMenu serverName={serverName} />}
        {menuType === MenuType.DRAWER && <DrawerMenu serverName={serverName} />}
        <Menu id="account-menu" isLazy>
          <MenuButton
            dataCy={getDataValue('nav_bar', 'menu', 'button')}
            as={IconButton}
            variant="ghost"
            aria-label="Gérer mon compte"
            title="Gérer mon compte"
            icon={<GiVikingHelmet />}
            fontSize="2xl"
            mx="2"
            p="2"
            rightIcon={<BiChevronDown />}
          />
          <MenuList>
            <SignInOut
              dataCy={getDataValue('nav_bar', 'menu', 'dropdown')}
              isConnected={session.status === SessionStatus.AUTHENTICATED}
            />
            <MenuDivider />
            <Secured permissions={ROUTES_TO_PERMISSIONS[MenuRoute.ADMIN]}>
              <NextLink href={`/${serverName}${MenuRoute.ADMIN}`} passHref>
                <MenuItem
                  dataCy={getDataValue('nav_bar', 'menu', 'dropdown', 'admin')}
                  as="a"
                  icon={<GiStakeHammer size="20" />}
                >
                  {ROUTES_TO_LABEL[MenuRoute.ADMIN]}
                </MenuItem>
              </NextLink>
            </Secured>
            <NextLink href={MenuRoute.ABOUT} passHref>
              <MenuItem
                dataCy={getDataValue('nav_bar', 'menu', 'dropdown', 'about')}
                as="a"
                icon={<CgInfo size="20" />}
              >
                {ROUTES_TO_LABEL[MenuRoute.ABOUT]}
              </MenuItem>
            </NextLink>
          </MenuList>
        </Menu>
      </Center>
    </chakra.header>
  );
};

export default NavBar;
