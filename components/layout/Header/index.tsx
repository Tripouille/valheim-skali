import { useRouter } from 'next/router';
import { chakra, IconButton } from '@chakra-ui/react';
import { Center, Wrap, WrapItem } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { GiVikingHelmet } from 'react-icons/gi';
import { BiChevronDown } from 'react-icons/bi';
import { MdLogout } from 'react-icons/md';
import { NavRoutes } from 'store/routes';
import NavItem from '../NavItem';
import fonts from '../../../utils/fonts';

const Header: React.FC = () => {
  const router = useRouter();
  const { serverName } = router.query;

  return (
    <chakra.header height="header" bgColor="blue.500" opacity={0.7} sx={fonts} fontFamily="Norse">
      <Center justifyContent="space-between" h="full">
        <chakra.nav ms="2">
          <Wrap spacing="4">
            <WrapItem>
              <NavItem root={`/${serverName}`} navRoute={NavRoutes.RULES} />
            </WrapItem>
            <WrapItem>
              <NavItem root={`/${serverName}`} navRoute={NavRoutes.EVENTS} />
            </WrapItem>
          </Wrap>
        </chakra.nav>
        <Menu id="account-menu" isLazy>
          <MenuButton
            as={IconButton}
            aria-label="Gérer mon compte"
            title="Gérer mon compte"
            icon={<GiVikingHelmet />}
            fontSize="2xl"
            me="2"
            p="2"
            rightIcon={<BiChevronDown />}
          />
          <MenuList>
            <MenuItem icon={<MdLogout size="20" />}>Se déconnecter</MenuItem>
          </MenuList>
        </Menu>
      </Center>
    </chakra.header>
  );
};

export default Header;
