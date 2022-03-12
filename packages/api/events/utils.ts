import { CreateEventData } from '@packages/data/event';

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

export const isCreateEventData = (data: unknown): data is Partial<CreateEventData> => {
  if (!data || typeof data !== 'object') return false;
  if (!Object.keys(data).every(key => key in eventKeyToValueTypeCheck)) return false;
  return true;
};
