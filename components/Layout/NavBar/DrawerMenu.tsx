import { chakra, useDisclosure } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';
import { NavRoute } from 'utils/routes';
import { ROUTES_TO_PERMISSIONS } from 'utils/auth';
import IconButton from 'components/core/Interactive/IconButton';
import Button from 'components/core/Interactive/Button';
import NavItem from 'components/core/Interactive/NavItem';
import { VStack } from 'components/core/Containers/Stack';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
} from 'components/core/Overlay/Drawer';
import Secured from 'components/core/Authentication/Secured';

export interface DrawerMenuProps {
  serverName: string;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ serverName }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        data-cy="open-drawer-menu"
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
        <DrawerContent bgColor="opaqueBackground" fontFamily="Norse">
          <DrawerBody mt="2" px={{ base: 3, sm: 6 }}>
            <chakra.nav>
              <VStack align="stretch">
                {Object.values(NavRoute).map(route => (
                  <Secured key={route} permissions={ROUTES_TO_PERMISSIONS[route]}>
                    <NavItem
                      data-cy={route}
                      root={`/${serverName}`}
                      route={route}
                      onClick={onClose}
                    />
                  </Secured>
                ))}
              </VStack>
            </chakra.nav>
          </DrawerBody>
          <DrawerFooter>
            <Button data-cy="close-menu" fontSize="3xl" w="full" onClick={onClose}>
              Fermer
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerMenu;
