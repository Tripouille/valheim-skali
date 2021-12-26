import React from 'react';
// import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import {
  chakra,
  Center,
  Button,
  ButtonGroup,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
  VStack,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import { GiVikingHelmet } from 'react-icons/gi';
import { BiChevronDown } from 'react-icons/bi';
import { RiMenuLine } from 'react-icons/ri';
import { NavRoutes } from '@packages/utils/routes';
import NavItem from '../NavItem';
import SignInOut from './SignInOut';

const Header: React.FC = () => {
  const { data: session } = useSession();
  const menuType = useBreakpointValue({ base: 'drawer', md: 'header' });
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const router = useRouter();
  // const { serverName } = router.query;
  const serverName = 'valhabba';

  return (
    <chakra.header height="header" bgColor="rgba(49, 130, 206, 0.7)">
      <Center justifyContent="space-between" h="full">
        {menuType === 'header' && (
          <chakra.nav ms="2" fontFamily="Norse">
            <ButtonGroup variant="ghost">
              <NavItem root={`/${serverName}`} navRoute={NavRoutes.HOME} />
              <NavItem root={`/${serverName}`} navRoute={NavRoutes.RULES} />
              <NavItem root={`/${serverName}`} navRoute={NavRoutes.EVENTS} />
            </ButtonGroup>
          </chakra.nav>
        )}
        {menuType === 'drawer' && (
          <>
            <IconButton
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
              <DrawerContent bgColor="blue.700" fontFamily="Norse">
                <DrawerBody>
                  <chakra.nav ms="2" fontFamily="Norse">
                    <VStack align="stretch">
                      <NavItem
                        root={`/${serverName}`}
                        navRoute={NavRoutes.HOME}
                        onClick={onClose}
                      />
                      <NavItem
                        root={`/${serverName}`}
                        navRoute={NavRoutes.RULES}
                        onClick={onClose}
                      />
                      <NavItem
                        root={`/${serverName}`}
                        navRoute={NavRoutes.EVENTS}
                        onClick={onClose}
                      />
                    </VStack>
                  </chakra.nav>
                </DrawerBody>
                <DrawerFooter>
                  <Button fontSize="3xl" w="full" onClick={onClose}>
                    Fermer
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
        )}
        <Menu id="account-menu" isLazy>
          <MenuButton
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

export default Header;
