export interface ImageAttributes {
  src: string;
  alt: string;
}

export type Callback = () => void;

export type Children = React.ReactElement | null;

export interface DataAttributes {
  /** Cypress */
  dataCy: string;
}

export interface AuthConfig {
  needAuth?: boolean;
}

export type ComponentWithAuth<PropTypes = Record<string, never>> = React.FC<PropTypes> & AuthConfig;
