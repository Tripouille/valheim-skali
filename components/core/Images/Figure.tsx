import React from 'react';
import { chakra } from '@chakra-ui/react';
import { Children } from 'utils/types';

export interface FigureProps {
  /**  Should contain the image */
  children: Children;
  /**  Will be displayed above the image */
  legend: string;
}

const Figure: React.FC<FigureProps> = ({ legend, children }) => (
  <figure>
    <figcaption>{legend}</figcaption>
    {children}
  </figure>
);

export default chakra(Figure);
