import { NavRoutes } from './routes';

/** Maps navigation routes to displayed labels (in header for example) */
export const NavRoutesToLabel: Record<NavRoutes, string> = {
  [NavRoutes.HOME]: 'Skali',
  [NavRoutes.RULES]: 'règlement',
  [NavRoutes.EVENTS]: 'événements',
};

export const noDefaultExport = 1;
