import React from 'react';
// import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { chakra, useDisclosure, useBreakpointValue } from '@chakra-ui/react';
import { GiVikingHelmet } from 'react-icons/gi';
import { BiChevronDown } from 'react-icons/bi';
import { RiMenuLine } from 'react-icons/ri';
import { NAV_ROUTES_VALUES } from '@packages/utils/constants';
import NavItem from '../NavItem';
import SignInOut from './SignInOut';
import Button from '@packages/components/core/Button';
import Center from '@packages/components/core/Center';
import ButtonGroup from '@packages/components/core/ButtonGroup';
import IconButton from '@packages/components/core/IconButton';
import { Menu, MenuButton, MenuList } from '@packages/components/core/Menu';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
} from '@packages/components/core/Drawer';
import { VStack } from '@packages/components/core/Stack';

enum MenuType {
  DRAWER,
  HEADER,
}

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const menuType = useBreakpointValue({ base: MenuType.DRAWER, md: MenuType.HEADER });
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const router = useRouter();
  // const { serverName } = router.query;
  const serverName = 'valhabba';

  return (
    <chakra.header height="header" bgColor="rgba(49, 130, 206, 0.7)">
      <Center justifyContent="space-between" h="full">
        {menuType === MenuType.HEADER && (
          <chakra.nav ms="2" fontFamily="Norse, Lucida Sans">
            <ButtonGroup variant="ghost">
              {NAV_ROUTES_VALUES.map(route => (
                <NavItem
                  key={route}
                  root={`/${serverName}`}
                  navRoute={route}
                  elementCategories={['nav_bar_header', 'nav_item', route]}
                />
              ))}
            </ButtonGroup>
          </chakra.nav>
        )}
        {menuType === MenuType.DRAWER && (
          <>
            <IconButton
              elementCategories={['nav_bar_drawer', 'open']}
              aria-label="Open menu"
              icon={<RiMenuLine />}
              onClick={onOpen}
              ms="2"
              variant="ghost"
              fontSize="2xl"
              title="Open menu"
            />
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent bgColor="blue.700" fontFamily="Norse, Lucida Sans">
                <DrawerBody mt="2">
                  <chakra.nav>
                    <VStack align="stretch">
                      {NAV_ROUTES_VALUES.map(route => (
                        <NavItem
                          key={route}
                          root={`/${serverName}`}
                          navRoute={route}
                          onClick={onClose}
                          elementCategories={['nav_bar_drawer', 'nav_item', route]}
                        />
                      ))}
                    </VStack>
                  </chakra.nav>
                </DrawerBody>
                <DrawerFooter>
                  <Button
                    elementCategories={['nav_bar_drawer', 'nav_item', 'close']}
                    fontSize="3xl"
                    w="full"
                    onClick={onClose}
                  >
                    Fermer
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
        )}
        <Menu id="account-menu" isLazy>
          <MenuButton
            elementCategories={['nav_bar', 'account_menu', 'button']}
            as={IconButton}
            variant="ghost"
            aria-label="Gérer mon compte"
            title="Gérer mon compte"
            icon={<GiVikingHelmet />}
            fontSize="2xl"
            me="2"
            p="2"
            rightIcon={<BiChevronDown />}
          />
          <MenuList>
            <SignInOut isConnected={Boolean(session)} />
          </MenuList>
        </Menu>
      </Center>
    </chakra.header>
  );
};

export default NavBar;
