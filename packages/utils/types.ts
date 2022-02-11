import { ReactNode } from 'react';
import { Permission } from './constants';

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

export interface AuthConfig {
  needAuth?: { permission?: Permission };
}

export type ComponentWithAuth<PropTypes = Record<string, never>> = React.FC<PropTypes> & AuthConfig;
