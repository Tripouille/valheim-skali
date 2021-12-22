import React from 'react';
import { chakra, Box } from '@chakra-ui/react';
import Image from 'next/image';

export interface FigureProps {
  /**  Url of the image */
  src: string;
  alt: string;
  /**  Object-position (css attribute) of the img, ex. "50% 50%", "top" */
  imagePosition?: string;
  /**  Will be displayed above the image */
  legend?: string;
  /**  For chakra style props, mainly */
  className?: string;
}

const Figure: React.FC<FigureProps> = ({ src, imagePosition, legend, className, alt }) => (
  <figure>
    {legend && <figcaption>{legend}</figcaption>}
    <Box className={className} position="relative">
      <Image src={src} layout="fill" objectFit="cover" objectPosition={imagePosition} alt={alt} />
    </Box>
  </figure>
);

export default chakra(Figure);
