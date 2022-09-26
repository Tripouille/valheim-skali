import { ApplicationStatus, APPLICATION_STATUS_TO_LABEL } from 'data/application';

export const CONTINUOUS_LABEL = 'Continu';

/** Predefined colors for tags (must be hexadecimal for text color computation) */
export const TagColors: Record<string, string> = {
  PvP: '#8b0000', // darkred
  PvE: '#0047AB', // cobalt
  [CONTINUOUS_LABEL]: '#4299e1', // blue.400
  Viking: '#F1C40F', // yellow like on discord
  Visiteur: '#AAAAAA', // gray
  [APPLICATION_STATUS_TO_LABEL[ApplicationStatus.WAITING_FOR_APPOINTMENT]]: '#609DF4', // like special text color (blue.200)
  [APPLICATION_STATUS_TO_LABEL[ApplicationStatus.PROMOTED]]: '#F1C40F', // like Viking
  [APPLICATION_STATUS_TO_LABEL[ApplicationStatus.REFUSED]]: '#6b0000',
};
