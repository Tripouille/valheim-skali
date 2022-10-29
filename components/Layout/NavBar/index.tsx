import NextLink from 'next/link';
import { BiChevronDown } from 'react-icons/bi';
import { CgInfo } from 'react-icons/cg';
import { GiStakeHammer, GiVikingHelmet } from 'react-icons/gi';
import { chakra, useBreakpointValue } from '@chakra-ui/react';
import Secured from 'components/core/Authentication/Secured';
import Center from 'components/core/Containers/Center';
import IconButton from 'components/core/Interactive/IconButton';
import NavItem from 'components/core/Interactive/NavItem';
import { Menu, MenuButton, MenuDivider, MenuItem, MenuList } from 'components/core/Overlay/Menu';
import useSession from 'hooks/useSession';
import { SessionStatus } from 'utils/auth';
import { ROUTES_TO_PERMISSIONS } from 'utils/permissions';
import { MenuRoute, NavRoute, ROUTES_TO_LABEL, serverName } from 'utils/routes';
import DrawerMenu from './DrawerMenu';
import HeaderMenu from './HeaderMenu';
import SignInOut from './SignInOut';

const NavBar = () => {
  const session = useSession();
  const menuType = useBreakpointValue<'drawer' | 'header'>({ base: 'drawer', lg: 'header' }, 'lg');
  const MenuComponent = menuType === 'drawer' ? DrawerMenu : HeaderMenu;

  return (
    <chakra.header height="header" bgColor="overlay" data-cy="nav-bar">
      <Center justifyContent="space-between" h="full">
        <MenuComponent
          navItems={onClick =>
            Object.values(NavRoute).map(route => {
              if (route === NavRoute.MY_APPLICATION) {
                if (session.data?.isNonMember && session.data.hasApplication)
                  return (
                    <NavItem
                      key={NavRoute.MY_APPLICATION}
                      root={`/${serverName}`}
                      route={NavRoute.MY_APPLICATION}
                      onClick={onClick}
                    />
                  );
                else return null;
              }
              return (
                <Secured key={route} permissions={ROUTES_TO_PERMISSIONS[route]}>
                  <NavItem root={`/${serverName}`} route={route} onClick={onClick} />
                </Secured>
              );
            })
          }
        />
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
