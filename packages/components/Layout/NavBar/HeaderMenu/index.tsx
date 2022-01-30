import { chakra } from '@chakra-ui/react';
import { NAV_ROUTES_VALUES } from '@packages/utils/constants';
import ButtonGroup from '@packages/components/core/ButtonGroup';
import NavItem from '../../NavItem';

export interface HeaderMenuProps {
  serverName: string;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ serverName }) => (
  <chakra.nav ms="2" fontFamily="Norse, Lucida Sans">
    <ButtonGroup variant="ghost">
      {NAV_ROUTES_VALUES.map(route => (
        <NavItem
          key={route}
          root={`/${serverName}`}
          navRoute={route}
          elementCategories={['nav_bar_header', 'nav_item', route]}
        />
      ))}
    </ButtonGroup>
  </chakra.nav>
);

export default HeaderMenu;
