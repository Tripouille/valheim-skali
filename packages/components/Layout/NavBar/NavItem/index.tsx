import React from 'react';
import NextLink from 'next/link';
import { NavRoutes } from '@packages/utils/routes';
import { NAV_ROUTES_TO_LABEL } from '@packages/utils/constants';
import { Callback, DataAttributes } from '@packages/utils/types';
import Button from '@packages/components/core/Interactive/Button';

export interface NavItemProps extends DataAttributes {
  root: string;
  navRoute: NavRoutes;
  onClick?: Callback;
}

const NavItem: React.FC<NavItemProps> = ({ dataCy, root, navRoute, onClick }) => (
  <NextLink href={`${root}${navRoute}`} passHref>
    <Button as="a" fontSize="3xl" size="lg" onClick={onClick} dataCy={dataCy}>
      {NAV_ROUTES_TO_LABEL[navRoute]}
    </Button>
  </NextLink>
);

export default NavItem;
