import React from 'react';
import NextLink from 'next/link';
import { Route, ROUTES_TO_LABEL } from 'utils/routes';
import { Callback } from 'utils/types';
import { DataAttributes } from 'utils/dataAttributes';
import Button from 'components/core/Interactive/Button';

export interface NavItemProps extends DataAttributes {
  root: string;
  route: Route;
  onClick?: Callback;
}

const NavItem: React.FC<NavItemProps> = ({ dataCy, root, route, onClick }) => (
  <NextLink href={`${root}${route}`} passHref>
    <Button as="a" fontSize="3xl" size="lg" minW="min-content" onClick={onClick} dataCy={dataCy}>
      {ROUTES_TO_LABEL[route]}
    </Button>
  </NextLink>
);

export default NavItem;
