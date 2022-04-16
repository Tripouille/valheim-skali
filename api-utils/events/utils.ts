import {
  CreateEventData,
  eventTextKeys,
  EVENT_TAG_MAX_LENGTH,
  EVENT_VALUES_MAX_LENGTH,
  getEventValidationError,
} from 'data/event';
import { isRequiredObjectType, ServerException } from 'api-utils/common';

const eventKeyToValueTypeCheck: Record<keyof CreateEventData, (value: unknown) => boolean> = {
  name: value => typeof value === 'string',
  discordLink: value => value === undefined || typeof value === 'string',
  startDate: value => typeof value === 'string',
  endDate: value => value === undefined || typeof value === 'string',
  continuous: value => typeof value === 'boolean',
  location: value => value === undefined || typeof value === 'string',
  tags: value => Array.isArray(value) && value.every(tag => typeof tag === 'string'),
  RPDescription: value => value === undefined || typeof value === 'string',
  description: value => typeof value === 'string',
};

const isCreateEventData = (data: unknown): data is CreateEventData =>
  isRequiredObjectType(data, eventKeyToValueTypeCheck);

const isValidEvent = (eventData: CreateEventData) => getEventValidationError(eventData) === null;

const shortenTextData = (newEvent: CreateEventData) => {
  for (const key of eventTextKeys) {
    const value = newEvent[key];
    if (value) newEvent[key] = value.substring(0, EVENT_VALUES_MAX_LENGTH[key]);
  }
  newEvent.tags = newEvent.tags.map(tag => tag.substring(0, EVENT_TAG_MAX_LENGTH));
};

export const getNewEventFromBody = (body: unknown): CreateEventData => {
  const newEvent: unknown = body;

  if (!isCreateEventData(newEvent)) throw new ServerException(400);
  if (!isValidEvent(newEvent)) throw new ServerException(400);
  shortenTextData(newEvent);

  return newEvent;
};
