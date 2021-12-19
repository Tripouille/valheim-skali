import React from 'react';
// import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import {
  chakra,
  Center,
  ButtonGroup,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react';
import { GiVikingHelmet } from 'react-icons/gi';
import { BiChevronDown } from 'react-icons/bi';
import { NavRoutes } from '@packages/utils/routes';
import NavItem from '../NavItem';
import SignInOut from './SignInOut';

const Header: React.FC = () => {
  const { data: session } = useSession();

  // const router = useRouter();
  // const { serverName } = router.query;
  const serverName = 'valhabba';

  return (
    <chakra.header height="header" bgColor="rgba(49, 130, 206, 0.7)" fontFamily="Norse">
      <Center justifyContent="space-between" h="full">
        <chakra.nav ms="2">
          <ButtonGroup variant="ghost">
            <NavItem root={`/${serverName}`} navRoute={NavRoutes.HOME} />
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
            <SignInOut isConnected={Boolean(session)} />
          </MenuList>
        </Menu>
      </Center>
    </chakra.header>
  );
};

export default Header;
