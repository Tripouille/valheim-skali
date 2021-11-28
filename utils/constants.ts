import { NavRoutes } from 'store/routes';

/** Maps navigation routes to displayed labels (in header for example) */
export const NavRoutesToLabel: Record<NavRoutes, string> = {
  [NavRoutes.RULES]: 'règlement',
  [NavRoutes.EVENTS]: 'événements',
};

export const noDefaultExport = 1;
