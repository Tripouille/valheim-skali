import { DataAttributes } from '../types';

export const createDataAttributes = (elementCategories: string[]): DataAttributes => {
  return { 'data-cy': elementCategories.join('-') };
};
