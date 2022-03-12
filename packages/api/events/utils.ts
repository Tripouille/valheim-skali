import {
  CreateEventData,
  eventTextKeys,
  EVENT_TAG_MAX_LENGTH,
  EVENT_VALUES_MAX_LENGTH,
  getEventValidationError,
} from '@packages/data/event';
import { ServerException } from '../common';

const eventKeyToValueTypeCheck: Record<keyof CreateEventData, (value: unknown) => boolean> = {
  name: value => typeof value === 'string',
  discordLink: value => typeof value === 'string',
  startDate: value => typeof value === 'string',
  endDate: value => typeof value === 'string',
  continuous: value => typeof value === 'boolean',
  location: value => typeof value === 'string',
  tags: value => Array.isArray(value) && value.every(tag => typeof tag === 'string'),
  RPDescription: value => typeof value === 'string',
  description: value => typeof value === 'string',
};

const isCreateEventData = (data: unknown): data is Partial<CreateEventData> => {
  if (!data || typeof data !== 'object') return false;
  if (!Object.keys(data).every(key => key in eventKeyToValueTypeCheck)) return false;
  return true;
};

const shortenTextData = (newEvent: CreateEventData) => {
  for (const key of eventTextKeys) {
    const value = newEvent[key];
    if (value) newEvent[key] = value.substring(0, EVENT_VALUES_MAX_LENGTH[key]);
  }
  newEvent.tags = newEvent.tags.map(tag => tag.substring(0, EVENT_TAG_MAX_LENGTH));
};

const isValidEvent = (eventData: Partial<CreateEventData>): eventData is CreateEventData =>
  getEventValidationError(eventData) === null;

export const getNewEventFromBody = (body: unknown): CreateEventData => {
  const newEvent: unknown = body;

  if (!isCreateEventData(newEvent)) throw new ServerException(400);
  if (!isValidEvent(newEvent)) throw new ServerException(400);
  shortenTextData(newEvent);

  return newEvent;
};
