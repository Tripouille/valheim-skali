import { chakra } from '@chakra-ui/react';
import Secured from 'components/core/Authentication/Secured';
import ButtonGroup from 'components/core/Interactive/ButtonGroup';
import NavItem from 'components/core/Interactive/NavItem';
import { ROUTES_TO_PERMISSIONS } from 'utils/permissions';
import { NavRoute } from 'utils/routes';

export interface HeaderMenuProps {
  serverName: string;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ serverName }) => (
  <chakra.nav ms="2" fontFamily="Norse">
    <ButtonGroup variant="ghost">
      {Object.values(NavRoute).map(route => (
        <Secured key={route} permissions={ROUTES_TO_PERMISSIONS[route]}>
          <NavItem root={`/${serverName}`} route={route} />
        </Secured>
      ))}
    </ButtonGroup>
  </chakra.nav>
);

export default HeaderMenu;
