import { ObjectId } from 'bson';
import { CONTINUOUS_LABEL } from 'utils/constants';
import { dateHasNoTime, toISOWithTimezone } from 'utils/format';
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

export const getEventDataForServer = (eventData: CreateEventData) => ({
  ...eventData,
  startDate: toISOWithTimezone(eventData.startDate),
  endDate: eventData.endDate ? toISOWithTimezone(eventData.endDate) : undefined,
});

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

/** Analyze */

const getEventEndDateFromStartDate = (startDate: string): Date => {
  const endDate = new Date(startDate);
  const noTime = dateHasNoTime(endDate.toISOString());
  if (noTime) endDate.setDate(endDate.getDate() + 1);
  else endDate.setHours(endDate.getHours() + 6);
  return endDate;
};

const getClosedEventEndDate = (event: Event): Date => {
  return event.endDate ? new Date(event.endDate) : getEventEndDateFromStartDate(event.startDate);
};

export const isEventClosed = (event: Event, refDate: Date): boolean => {
  if (event.endDate) {
    return new Date(event.endDate) < refDate;
  } else if (event.continuous) {
    return false;
  } else {
    const eventEndDate = getEventEndDateFromStartDate(event.startDate);
    return eventEndDate < refDate;
  }
};

/** Sort */

const dateDiff = (date1: Date, date2: Date): number => {
  return Math.abs(date1.getTime() - date2.getTime());
};

const getEventProperties = (event: Event, refDate: Date) => ({
  isClosed: isEventClosed(event, refDate),
  startDate: new Date(event.startDate),
  endDate: getClosedEventEndDate(event),
});

export const eventComp =
  (refDate: Date) =>
  (event1: Event, event2: Event): 1 | -1 => {
    const event1Properties = getEventProperties(event1, refDate);
    const event2Properties = getEventProperties(event2, refDate);
    if (event1Properties.isClosed !== event2Properties.isClosed) {
      // One event is closed and the other not : prioritize unfinished event
      return event1Properties.isClosed ? 1 : -1;
    } else if (event1Properties.isClosed) {
      // Both events are closed : prioritize closer end date
      if (event1Properties.endDate.getTime() !== event2Properties.endDate.getTime()) {
        return dateDiff(event1Properties.endDate, refDate) <
          dateDiff(event2Properties.endDate, refDate)
          ? -1
          : 1;
      } else {
        // Both end dates are equal : prioritize ponctual event
        return event1.continuous ? 1 : -1;
      }
    } else {
      // Both events are open (or not yet opened) : prioritize closer start date (past or future)
      if (event1.startDate !== event2.startDate) {
        return dateDiff(event1Properties.startDate, refDate) <
          dateDiff(event2Properties.startDate, refDate)
          ? -1
          : 1;
      } else {
        // Both start dates are equal : prioritize ponctual event
        return event1.continuous ? 1 : -1;
      }
    }
  };
