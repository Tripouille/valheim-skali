import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import {
  CreateEventData,
  EventInDb,
  eventsCollectionName,
  eventTextKeys,
  EVENT_TAG_MAX_LENGTH,
  EVENT_VALUES_MAX_LENGTH,
  getEventValidationError,
} from '@packages/data/event';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import { requirePermissions } from '@packages/api/auth';
import { ServerException } from '@packages/api/common';
import db from '../db';
import { isCreateEventData } from './utils';

const isValidEvent = (eventData: Partial<CreateEventData>): eventData is CreateEventData =>
  getEventValidationError(eventData) === null;

const getEventDataForDb = (eventData: CreateEventData): CreateEventData => {
  for (const key of eventTextKeys) {
    const value = eventData[key];
    if (value) eventData[key] = value.substring(0, EVENT_VALUES_MAX_LENGTH[key]);
  }
  eventData.tags = eventData.tags.map(tag => tag.substring(0, EVENT_TAG_MAX_LENGTH));
  return eventData;
};

const createEvent = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.EVENT]: PermissionPrivilege.READ_WRITE }, req);

  const eventData: unknown = req.body;
  if (!isCreateEventData(eventData)) throw new ServerException(400);
  if (!isValidEvent(eventData)) throw new ServerException(400);

  const newEvent = getEventDataForDb(eventData);
  const newEventId = await db.insert<EventInDb>(eventsCollectionName, newEvent);

  res.status(200).json({ ...newEvent, _id: newEventId });
};

export default createEvent;
