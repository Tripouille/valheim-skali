import React from 'react';
import NextLink from 'next/link';
import { Button } from '@chakra-ui/react';
import { NavRoutes } from '@packages/utils/routes';
import { NAV_ROUTES_TO_LABEL } from '@packages/utils/constants';
import { Callback, ElementCategoriesProps } from '@packages/utils/types';
import { createDataAttributes } from '@packages/utils/dataAttributes/createDataAttributes';

export interface NavItemProps extends ElementCategoriesProps {
  root: string;
  navRoute: NavRoutes;
  onClick?: Callback;
}

const NavItem: React.FC<NavItemProps> = ({ root, navRoute, onClick, elementCategories }) => (
  <NextLink href={`${root}${navRoute}`} passHref>
    <Button as="a" fontSize="3xl" onClick={onClick} {...createDataAttributes(elementCategories)}>
      {NAV_ROUTES_TO_LABEL[navRoute]}
    </Button>
  </NextLink>
);

export default NavItem;
