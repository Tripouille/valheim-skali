export interface DataAttributes {
  /** Cypress */
  dataCy: string;
}

export const getDataValue = (...identifiers: string[]) => identifiers.join('-');
