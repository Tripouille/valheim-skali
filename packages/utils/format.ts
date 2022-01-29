export const formatLongDate = (ISODate: string): string => {
  const date = new Date(ISODate);
  const noTime = date.toISOString().slice(11, -5) === '00:00:00';
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
    return `Du ${formatLongDate(startDate)} au ${formatLongDate(endDate)}`;
  } else if (ponctual) {
    return `Le ${formatLongDate(startDate)}`;
  } else {
    return `A partir du ${formatLongDate(startDate)}`;
  }
};
