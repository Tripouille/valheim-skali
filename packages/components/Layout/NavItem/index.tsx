import React from 'react';
import NextLink from 'next/link';
import { Button } from '@chakra-ui/react';
import { NavRoutes } from '@packages/utils/routes';
import { NAV_ROUTES_TO_LABEL } from '@packages/utils/constants';
import { Callback } from '@packages/utils/types';

export interface NavItemProps {
  root: string;
  navRoute: NavRoutes;
  onClick?: Callback;
}

const NavItem: React.FC<NavItemProps> = ({ root, navRoute, onClick }) => (
  <NextLink href={`${root}${navRoute}`} passHref>
    <Button as="a" fontSize="3xl" onClick={onClick}>
      {NAV_ROUTES_TO_LABEL[navRoute]}
    </Button>
  </NextLink>
);

export default NavItem;
