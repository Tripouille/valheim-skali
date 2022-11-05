import NextLink from 'next/link';
import React from 'react';
import Button from 'components/core/Interactive/Button';
import { getRoute, Route, ROUTES_TO_LABEL } from 'utils/routes';
import { Callback } from 'utils/types';

export interface NavItemProps {
  route: Route;
  onClick?: Callback;
}

const NavItem: React.FC<NavItemProps> = ({ route, onClick }) => {
  const label = ROUTES_TO_LABEL[route];

  return (
    <NextLink href={getRoute(route)} passHref>
      <Button
        as="a"
        fontSize="3xl"
        size="lg"
        minW="min-content"
        onClick={onClick}
        data-cy={`${label}-nav-item`}
      >
        {label}
      </Button>
    </NextLink>
  );
};

export default NavItem;
