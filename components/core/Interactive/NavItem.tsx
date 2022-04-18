import React from 'react';
import NextLink from 'next/link';
import { Route, ROUTES_TO_LABEL } from 'utils/routes';
import { Callback, CypressProps } from 'utils/types';
import Button from 'components/core/Interactive/Button';

export interface NavItemProps extends CypressProps {
  root: string;
  route: Route;
  onClick?: Callback;
}

const NavItem: React.FC<NavItemProps> = ({ 'data-cy': dataCy, root, route, onClick }) => (
  <NextLink href={`${root}${route}`} passHref>
    <Button
      as="a"
      fontSize="3xl"
      size="lg"
      minW="min-content"
      onClick={onClick}
      data-cy={`${dataCy}-nav-item`}
    >
      {ROUTES_TO_LABEL[route]}
    </Button>
  </NextLink>
);

export default NavItem;
