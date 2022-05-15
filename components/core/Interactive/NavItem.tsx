import React from 'react';
import NextLink from 'next/link';
import { Route, ROUTES_TO_LABEL } from 'utils/routes';
import { Callback } from 'utils/types';
import Button from 'components/core/Interactive/Button';

export interface NavItemProps {
  root: string;
  route: Route;
  onClick?: Callback;
}

const NavItem: React.FC<NavItemProps> = ({ root, route, onClick }) => (
  <NextLink href={`${root}${route}`} passHref>
    <Button
      as="a"
      fontSize="3xl"
      size="lg"
      minW="min-content"
      onClick={onClick}
      data-cy={`${ROUTES_TO_LABEL[route]}-nav-item`}
    >
      {ROUTES_TO_LABEL[route]}
    </Button>
  </NextLink>
);

export default NavItem;
