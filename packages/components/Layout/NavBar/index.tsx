import NextLink from 'next/link';
import React from 'react';
// import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { chakra, useBreakpointValue } from '@chakra-ui/react';
import { GiStakeHammer, GiVikingHelmet } from 'react-icons/gi';
import { BiChevronDown } from 'react-icons/bi';
import { getDataValue } from '@packages/utils/dataAttributes';
import Center from '@packages/components/core/Containers/Center';
import IconButton from '@packages/components/core/Interactive/IconButton';
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@packages/components/core/Overlay/Menu';
import theme from '@packages/theme';
import HeaderMenu from './HeaderMenu';
import DrawerMenu from './DrawerMenu';
import SignInOut from './SignInOut';

enum MenuType {
  DRAWER,
  HEADER,
}

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const menuType = useBreakpointValue({ base: MenuType.DRAWER, lg: MenuType.HEADER });

  // const router = useRouter();
  // const { serverName } = router.query;
  const serverName = 'valhabba';

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
              isConnected={Boolean(session)}
            />
            <MenuDivider />
            <NextLink href="/about">
              <MenuItem
                dataCy={getDataValue('nav_bar', 'menu', 'dropdown', 'about')}
                icon={<GiStakeHammer size="20" />}
              >
                A propos du site
              </MenuItem>
            </NextLink>
          </MenuList>
        </Menu>
      </Center>
    </chakra.header>
  );
};

export default NavBar;
