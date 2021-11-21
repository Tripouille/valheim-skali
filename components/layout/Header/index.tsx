import { chakra, IconButton } from '@chakra-ui/react';
import { Center, Wrap, WrapItem } from '@chakra-ui/layout';
import { GiVikingHelmet } from 'react-icons/gi';
import NavItem from '../NavItem';

const fontDefinition = {
  '@font-face': {
    fontFamily: 'Norse',
    src: 'url("./fonts/Norse.otf")',
  },
};

const Header: React.FC = () => {
  return (
    <chakra.header
      height="header"
      bgColor="blue.500"
      opacity={0.7}
      sx={fontDefinition}
      fontFamily="Norse">
      <Center justifyContent="space-between" h="full">
        <chakra.nav ms="2">
          <Wrap spacing="4">
            <WrapItem>
              <NavItem href="/" label="règlement" />
            </WrapItem>
            <WrapItem>
              <NavItem href="/" label="événements" />
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