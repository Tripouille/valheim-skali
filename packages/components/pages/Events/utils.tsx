import { Event } from '@packages/data/event';

export enum EventContext {
  LIST = 'list',
  MODAL = 'modal',
}

const getEventEndDateFromStartDate = (startDate: string): Date => {
  const endDate = new Date(startDate);
  const noTime = endDate.toISOString().slice(11, -5) === '00:00:00';
  if (noTime) endDate.setDate(endDate.getDate() + 1);
  else endDate.setHours(endDate.getHours() + 6);
  return endDate;
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

const getClosedEventEndDate = (event: Event): Date => {
  return event.endDate ? new Date(event.endDate) : getEventEndDateFromStartDate(event.startDate);
};

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
