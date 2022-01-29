import { NavRoutes } from './routes';

/** Used to map over nav routes */
export const NAV_ROUTES_VALUES = Object.values(NavRoutes);

/** Maps navigation routes to displayed labels (e.g.., in navbar) */
export const NAV_ROUTES_TO_LABEL: Record<NavRoutes, string> = {
  [NavRoutes.HOME]: 'Skali',
  [NavRoutes.RULES]: 'Règlement',
  [NavRoutes.EVENTS]: 'Événements',
};

export enum StoryCategory {
  CORE = 'core',
  PAGE = 'page',
}

/** Predefined colors for tags (must be hexadecimal for text color computation) */
export const TagColors: Record<string, string> = {
  PvP: '#8b0000', // darkred
  PvE: '#0047AB', // cobalt
  Continu: '#4299e1', // blue.400
};
