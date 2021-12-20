import React from 'react';
import { chakra, Box } from '@chakra-ui/react';
import Image from 'next/image';

export interface FigureProps {
  src: string;
  imagePosition?: string;
  legend?: string;
  className?: string;
}

/** To display an image, loaded smartly by next
 * @param {string} src Url of the image
 * @param {string | undefined} imagePosition Object-position (css attribute) of the img, ex. "50% 50%", "top"
 * @param {string | undefined} legend Will be displayed above the image
 * @param {string | undefined} className For chakra style props, mainly
 */
const Figure: React.FC<FigureProps> = ({ src, imagePosition, legend, className }) => (
  <figure>
    {legend && <figcaption>{legend}</figcaption>}
    <Box className={className} position="relative">
      <Image src={src} layout="fill" objectFit="cover" objectPosition={imagePosition} />
    </Box>
  </figure>
);

export default chakra(Figure);
