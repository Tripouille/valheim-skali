import { chakra } from '@chakra-ui/react';
import { ROUTES_TO_PERMISSIONS } from '@packages/utils/auth';
import { getDataValue } from '@packages/utils/dataAttributes';
import { NavRoute } from '@packages/utils/routes';
import ButtonGroup from '@packages/components/core/Interactive/ButtonGroup';
import NavItem from '@packages/components/core/Interactive/NavItem';
import Secured from '@packages/components/core/Authentication/Secured';

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
