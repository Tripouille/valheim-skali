import { NavRoutes } from './routes';

/** Used to map over nav routes */
export const NAV_ROUTES_VALUES = Object.values(NavRoutes);

/** Maps navigation routes to displayed labels (in header for example) */
export const NAV_ROUTES_TO_LABEL: Record<NavRoutes, string> = {
  [NavRoutes.HOME]: 'Skali',
  [NavRoutes.RULES]: 'règlement',
  [NavRoutes.EVENTS]: 'événements',
};
