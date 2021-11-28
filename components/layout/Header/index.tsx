import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
import {
  chakra,
  Center,
  ButtonGroup,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { GiVikingHelmet } from 'react-icons/gi';
import { BiChevronDown } from 'react-icons/bi';
import { MdLogin, MdLogout } from 'react-icons/md';
import { NavRoutes } from 'store/routes';
import NavItem from '../NavItem';
import fonts from '../../../utils/fonts';

const Header: React.FC = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const { serverName } = router.query;

  return (
    <chakra.header height="header" bgColor="blue.500" opacity={0.7} sx={fonts} fontFamily="Norse">
      <Center justifyContent="space-between" h="full">
        <chakra.nav ms="2">
          <ButtonGroup variant="ghost">
            <NavItem root={`/${serverName}`} navRoute={NavRoutes.RULES} />
            <NavItem root={`/${serverName}`} navRoute={NavRoutes.EVENTS} />
          </ButtonGroup>
        </chakra.nav>
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
            {session ? (
              <MenuItem icon={<MdLogout size="20" />} onClick={() => signOut()}>
                Se déconnecter
              </MenuItem>
            ) : (
              <MenuItem icon={<MdLogin size="20" />} onClick={() => signIn('discord')}>
                Se connecter
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </Center>
    </chakra.header>
  );
};

export default Header;
