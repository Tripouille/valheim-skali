import { ReactNode } from 'react';

export interface ImageAttributes {
  src: string;
  alt: string;
}

export type Callback = () => void;

export type Children = ReactNode;

export interface DataAttributes {
  /** Cypress */
  dataCy: string;
}
