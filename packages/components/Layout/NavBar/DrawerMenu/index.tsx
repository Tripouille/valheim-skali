import { chakra, useDisclosure } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';
import { NAV_ROUTES_VALUES } from '@packages/utils/constants';
import { getDataValue } from '@packages/utils/dataAttributes';
import IconButton from '@packages/components/core/Interactive/IconButton';
import Button from '@packages/components/core/Interactive/Button';
import { VStack } from '@packages/components/core/Containers/Stack';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
} from '@packages/components/core/Overlay/Drawer';
import NavItem from '../../NavItem';

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
        <DrawerContent bgColor="blue.700" fontFamily="Norse">
          <DrawerBody mt="2">
            <chakra.nav>
              <VStack align="stretch">
                {NAV_ROUTES_VALUES.map(route => (
                  <NavItem
                    dataCy={getDataValue('nav_bar_drawer', 'nav_item', route)}
                    key={route}
                    root={`/${serverName}`}
                    navRoute={route}
                    onClick={onClose}
                  />
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
