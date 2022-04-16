import { Dispatch, ReactChild, ReactPortal, SetStateAction } from 'react';

export interface ImageAttributes {
  src: string;
  alt: string;
}

export type Callback = () => void;

export type StrictReactNode =
  | ReactChild
  | Iterable<StrictReactNode>
  | ReactPortal
  | boolean
  | null
  | undefined;
export type Children = StrictReactNode;

export type OneOrMany<T> = T | T[];

export type Setter<T> = Dispatch<SetStateAction<T>>;

export interface HydrationProps {
  dehydratedState: string;
}
