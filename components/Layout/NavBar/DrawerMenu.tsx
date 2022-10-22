import { RiMenuLine } from 'react-icons/ri';
import { chakra, useDisclosure } from '@chakra-ui/react';
import { VStack } from 'components/core/Containers/Stack';
import Button from 'components/core/Interactive/Button';
import IconButton from 'components/core/Interactive/IconButton';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
} from 'components/core/Overlay/Drawer';
import { Callback, Children } from 'utils/types';

interface DrawerMenuProps {
  navItems: (onClick: Callback) => Children;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ navItems }) => {
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
              <VStack align="stretch">{navItems(onClose)}</VStack>
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
