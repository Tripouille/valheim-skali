import { chakra, useDisclosure } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';
import theme from '@packages/theme';
import { getDataValue } from '@packages/utils/dataAttributes';
import { NavRoute } from '@packages/utils/routes';
import { ROUTES_TO_PERMISSIONS } from '@packages/utils/auth';
import IconButton from '@packages/components/core/Interactive/IconButton';
import Button from '@packages/components/core/Interactive/Button';
import NavItem from '@packages/components/core/Interactive/NavItem';
import { VStack } from '@packages/components/core/Containers/Stack';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
} from '@packages/components/core/Overlay/Drawer';
import Secured from '@packages/components/core/Authentication/Secured';

export interface DrawerMenuProps {
  serverName: string;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ serverName }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        dataCy={getDataValue('nav_bar_drawer', 'open')}
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
        <DrawerContent bgColor={theme.colors.opaqueBackground} fontFamily="Norse">
          <DrawerBody mt="2" px={{ base: 3, sm: 6 }}>
            <chakra.nav>
              <VStack align="stretch">
                {Object.values(NavRoute).map(route => (
                  <Secured key={route} permissions={ROUTES_TO_PERMISSIONS[route]}>
                    <NavItem
                      dataCy={getDataValue('nav_bar_drawer', 'nav_item', route)}
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
            <Button
              dataCy={getDataValue('nav_bar_drawer', 'nav_item', 'close')}
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
  );
};

export default DrawerMenu;
