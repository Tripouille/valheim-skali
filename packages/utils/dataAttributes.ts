export interface DataAttributes {
  /** Cypress */
  dataCy: string;
}

export const getDataValue = (...identifiers: (number | string)[]) => identifiers.join('-');

export const noSpace = (str: string) => str.replaceAll(' ', '_');
