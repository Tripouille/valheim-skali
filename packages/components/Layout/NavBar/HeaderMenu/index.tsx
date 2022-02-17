import { chakra } from '@chakra-ui/react';
import ButtonGroup from '@packages/components/core/Interactive/ButtonGroup';
import NavItem from '@packages/components/core/Interactive/NavItem';
import { getDataValue } from '@packages/utils/dataAttributes';
import { NavRoutes } from '@packages/utils/routes';

export interface HeaderMenuProps {
  serverName: string;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ serverName }) => (
  <chakra.nav ms="2" fontFamily="Norse">
    <ButtonGroup variant="ghost">
      {Object.values(NavRoutes).map(route => (
        <NavItem
          dataCy={getDataValue('nav_bar', 'header', 'nav_item', route)}
          key={route}
          root={`/${serverName}`}
          navRoute={route}
        />
      ))}
    </ButtonGroup>
  </chakra.nav>
);

export default HeaderMenu;
