import { chakra } from '@chakra-ui/react';
import { NAV_ROUTES_VALUES } from '@packages/utils/constants';
import ButtonGroup from '@packages/components/core/Interactive/ButtonGroup';
import NavItem from '../../NavItem';
import { getDataValue } from '@packages/utils/dataAttributes';

export interface HeaderMenuProps {
  serverName: string;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ serverName }) => (
  <chakra.nav ms="2" fontFamily="Norse">
    <ButtonGroup variant="ghost">
      {NAV_ROUTES_VALUES.map(route => (
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
