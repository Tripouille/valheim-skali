import { ObjectId } from 'bson';
import { CONTINUOUS_LABEL } from 'utils/constants';
import { dateIsValid, isFilled } from 'utils/validation';

/** Main types */

export interface Event {
  _id: string;
  name: string;
  discordLink?: string;
  startDate: string;
  endDate?: string;
  continuous: boolean;
  location?: string;
  tags: string[];
  RPDescription?: string;
  description: string;
}

export type EventInDb = Omit<Event, '_id'> & {
  _id: ObjectId;
};

export type CreateEventData = Omit<Event, '_id'>;

/** Database */

export const eventsCollectionName = 'events';

/** Data validation */

const eventRequiredFields: (keyof CreateEventData)[] = [
  'name',
  'startDate',
  'continuous',
  'tags',
  'description',
];

export const hasRequiredFields = (
  eventData: Partial<CreateEventData>,
): eventData is CreateEventData => {
  for (const requiredEventKey of eventRequiredFields) {
    if (!(requiredEventKey in eventData)) return false;
  }
  return true;
};

export const getEventValidationError = (eventData: Partial<CreateEventData>): string | null => {
  if (!isFilled(eventData.name)) return 'Le nom est obligatoire.';
  if (!isFilled(eventData.startDate)) return 'La date de début est obligatoire.';
  if (!isFilled(eventData.description)) return 'La description est obligatoire.';
  if (!eventData.tags) return 'La clé tag est obligatoire.';
  if (!dateIsValid(eventData.startDate)) return 'Le format de la date de début est invalide.';
  if (eventData.endDate && !dateIsValid(eventData.endDate))
    return 'Le format de la date de fin est invalide.';
  if (eventData.endDate && eventData.startDate >= eventData.endDate)
    return 'La date de début doit être antérieure à la date de fin.';
  if (eventData.tags.includes(CONTINUOUS_LABEL))
    return `Utilisez l'option ${CONTINUOUS_LABEL} pour mettre le tag correspondant.`;
  if (!hasRequiredFields(eventData)) return 'Clés manquantes.';
  return null;
};

/** Data max length */

type EventTextKey = keyof Pick<
  CreateEventData,
  'name' | 'discordLink' | 'location' | 'RPDescription' | 'description'
>;

export const eventTextKeys: EventTextKey[] = [
  'name',
  'discordLink',
  'location',
  'RPDescription',
  'description',
];

export const EVENT_VALUES_MAX_LENGTH: Record<EventTextKey, number> = {
  name: 150,
  discordLink: 200,
  location: 150,
  RPDescription: 10000,
  description: 10000,
};

export const EVENT_TAG_MAX_LENGTH = 20;
