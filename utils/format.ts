import { DateTime } from 'luxon';

export const dateHasNoTime = (date: string) => date.slice(11, 16) === '00:00';

const formatDate = (ISODate: string): string => {
  const date = new Date(ISODate);
  /** If the time is 00:00 in the original date,
   * the event creator probably didn't mean any hour. */
  const noTime = dateHasNoTime(ISODate);
  return date.toLocaleString('fr', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: noTime ? undefined : 'numeric',
    minute: noTime ? undefined : 'numeric',
  });
};

export const formatDateInterval = (
  startDate: string,
  endDate?: string,
  ponctual?: boolean,
): string => {
  if (endDate) {
    return `Du ${formatDate(startDate)} au ${formatDate(endDate)}`;
  } else if (ponctual) {
    return `Le ${formatDate(startDate)}`;
  } else {
    return `A partir du ${formatDate(startDate)}`;
  }
};

export const toISOWithTimezone = (date: string): string => DateTime.fromISO(date).toISO();

export const toInputDatetimeFormat = (date: string): string =>
  DateTime.fromISO(date).toISO({ includeOffset: false });

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .substring(0, 50)
    .replace(/^-+/, '')
    .replace(/-+$/, '');
