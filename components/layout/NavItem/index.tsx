import Link from 'next/link';
import { Button } from '@chakra-ui/react';
import { NavRoutes } from 'store/routes';
import { NavRoutesToLabel } from '../../../utils/constants';

export interface NavItemProps {
  root: string;
  navRoute: NavRoutes;
}

const NavItem: React.FC<NavItemProps> = ({ root, navRoute }) => {
  return (
    <Button fontSize="3xl">
      <Link href={`${root}/${navRoute}`}>
        <a>{NavRoutesToLabel[navRoute]}</a>
      </Link>
    </Button>
  );
};

export default NavItem;
