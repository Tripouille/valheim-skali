export const isFilled = (value?: string): value is string => !!value && value.length > 0;

export const dateIsValid = (date: string) => !Number.isNaN(new Date(date).getDate());
