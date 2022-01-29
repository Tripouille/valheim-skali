import { NavRoutes } from './routes';

/** Used to map over nav routes */
export const NAV_ROUTES_VALUES = Object.values(NavRoutes);

/** Maps navigation routes to displayed labels (in header for example) */
export const NAV_ROUTES_TO_LABEL: Record<NavRoutes, string> = {
  [NavRoutes.HOME]: 'Skali',
  [NavRoutes.RULES]: 'Règlement',
  [NavRoutes.EVENTS]: 'Événements',
};

export enum StoryCategory {
  CORE = 'core',
  PAGE = 'page',
}

export const TagColors: Record<string, string> = {
  PvP: 'darkred',
  PvE: '#0047AB',
  Continu: 'blue.400',
};
