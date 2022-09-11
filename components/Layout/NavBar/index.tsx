import NextLink from 'next/link';
import React from 'react';
import { GiStakeHammer, GiVikingHelmet } from 'react-icons/gi';
import { BiChevronDown } from 'react-icons/bi';
import { CgInfo } from 'react-icons/cg';
import { chakra, useBreakpointValue } from '@chakra-ui/react';
import Center from 'components/core/Containers/Center';
import IconButton from 'components/core/Interactive/IconButton';
import { Menu, MenuButton, MenuDivider, MenuItem, MenuList } from 'components/core/Overlay/Menu';
import Secured from 'components/core/Authentication/Secured';
import useSession from 'hooks/useSession';
import { ROUTES_TO_PERMISSIONS } from 'utils/permissions';
import { MenuRoute, ROUTES_TO_LABEL, serverName } from 'utils/routes';
import { SessionStatus } from 'utils/auth';
import HeaderMenu from './HeaderMenu';
import DrawerMenu from './DrawerMenu';
import SignInOut from './SignInOut';

enum MenuType {
  DRAWER,
  HEADER,
}

const NavBar = () => {
  const session = useSession();
  const menuType = useBreakpointValue({ base: MenuType.DRAWER, lg: MenuType.HEADER }, 'lg');

  return (
    <chakra.header height="header" bgColor="overlay" data-cy="nav-bar">
      <Center justifyContent="space-between" h="full">
        {menuType === MenuType.HEADER && <HeaderMenu serverName={serverName} />}
        {menuType === MenuType.DRAWER && <DrawerMenu serverName={serverName} />}
        <Menu id="account-menu" isLazy>
          <MenuButton
            data-cy="menu"
            as={IconButton}
            variant="ghost"
            aria-label="Ouvrir le menu"
            icon={<GiVikingHelmet />}
            fontSize="2xl"
            mx="2"
            p="2"
            rightIcon={<BiChevronDown />}
          />
          <MenuList>
            <SignInOut isConnected={session.status === SessionStatus.AUTHENTICATED} />
            <MenuDivider />
            <Secured permissions={ROUTES_TO_PERMISSIONS[MenuRoute.ADMIN]}>
              <NextLink href={`/${serverName}${MenuRoute.ADMIN}`} passHref>
                <MenuItem data-cy="admin" as="a" icon={<GiStakeHammer size="20" />}>
                  {ROUTES_TO_LABEL[MenuRoute.ADMIN]}
                </MenuItem>
              </NextLink>
            </Secured>
            <NextLink href={MenuRoute.ABOUT} passHref>
              <MenuItem data-cy="about" as="a" icon={<CgInfo size="20" />}>
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
