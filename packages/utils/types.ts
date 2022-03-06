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

export const hasOwnProperty = <X extends object, Y extends PropertyKey>(
  obj: X,
  prop: string,
): obj is X & Record<Y, unknown> => obj.hasOwnProperty(prop);
