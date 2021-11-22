import { useRouter } from 'next/router';
import { chakra, IconButton } from '@chakra-ui/react';
import { Center, Wrap, WrapItem } from '@chakra-ui/layout';
import { GiVikingHelmet } from 'react-icons/gi';
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
              <NavItem href={`/${serverName}/rules`} label="règlement" />
            </WrapItem>
            <WrapItem>
              <NavItem href={`/${serverName}/events`} label="événements" />
            </WrapItem>
          </Wrap>
        </chakra.nav>
        <IconButton
          aria-label="Gestion du compte"
          icon={<GiVikingHelmet />}
          fontSize="1.5rem"
          me="2"
        />
      </Center>
    </chakra.header>
  );
};

export default Header;
