import { chakra } from '@chakra-ui/react';
import { ROUTES_TO_PERMISSIONS } from 'utils/auth';
import { getDataValue } from 'utils/dataAttributes';
import { NavRoute } from 'utils/routes';
import ButtonGroup from 'components/core/Interactive/ButtonGroup';
import NavItem from 'components/core/Interactive/NavItem';
import Secured from 'components/core/Authentication/Secured';

export interface HeaderMenuProps {
  serverName: string;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ serverName }) => (
  <chakra.nav ms="2" fontFamily="Norse">
    <ButtonGroup variant="ghost">
      {Object.values(NavRoute).map(route => (
        <Secured key={route} permissions={ROUTES_TO_PERMISSIONS[route]}>
          <NavItem
            dataCy={getDataValue('nav_bar', 'header', 'nav_item', route)}
            root={`/${serverName}`}
            route={route}
          />
        </Secured>
      ))}
    </ButtonGroup>
  </chakra.nav>
);

export default HeaderMenu;
