import { chakra } from '@chakra-ui/react';
import ButtonGroup from 'components/core/Interactive/ButtonGroup';
import { Children } from 'utils/types';

interface HeaderMenuProps {
  navItems: (onClick: undefined) => Children;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ navItems }) => (
  <chakra.nav ms="2" fontFamily="Norse">
    <ButtonGroup variant="ghost">{navItems(undefined)}</ButtonGroup>
  </chakra.nav>
);

export default HeaderMenu;
