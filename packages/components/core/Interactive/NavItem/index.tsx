import React from 'react';
import NextLink from 'next/link';
import { AdminNavRoutes, NavRoutes, ROUTES_TO_LABEL } from '@packages/utils/routes';
import { Callback, DataAttributes } from '@packages/utils/types';
import Button from '@packages/components/core/Interactive/Button';

export interface NavItemProps extends DataAttributes {
  root: string;
  navRoute: NavRoutes | AdminNavRoutes;
  onClick?: Callback;
}

const NavItem: React.FC<NavItemProps> = ({ dataCy, root, navRoute, onClick }) => (
  <NextLink href={`${root}${navRoute}`} passHref>
    <Button as="a" fontSize="3xl" size="lg" minW="min-content" onClick={onClick} dataCy={dataCy}>
      {ROUTES_TO_LABEL[navRoute]}
    </Button>
  </NextLink>
);

export default NavItem;
