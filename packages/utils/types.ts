import { ReactChild, ReactPortal } from 'react';

export interface ImageAttributes {
  src: string;
  alt: string;
}

export type Callback = () => void;

export type StrictReactNode =
  | ReactChild
  | Iterable<StrictReactNode>
  | ReactPortal
  | false
  | null
  | undefined;
export type Children = StrictReactNode;

export type OneOrMany<T> = T | T[];
