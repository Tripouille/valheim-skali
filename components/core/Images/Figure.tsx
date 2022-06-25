import React from 'react';
import { chakra } from '@chakra-ui/react';
import { Children } from 'utils/types';

export interface FigureProps {
  /**  Should contain the image */
  children: Children;
  /**  Will be displayed below the image */
  legend: string;
  className?: string;
}

const Figure: React.FC<FigureProps> = ({ legend, children, className }) => (
  <chakra.figure display="inline-block" maxW="full" className={className}>
    {children}
    <chakra.figcaption textAlign="center">{legend}</chakra.figcaption>
  </chakra.figure>
);

export default chakra(Figure);
