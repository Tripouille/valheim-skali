import NextImage from 'next/image';
import { chakra } from '@chakra-ui/react';

const Image = chakra(NextImage, {
  shouldForwardProp: prop =>
    [
      'layout',
      'width',
      'height',
      'src',
      'alt',
      'objectFit',
      'objectPosition',
      'quality',
      'placeholder',
      'blurDataURL',
      'loader',
    ].includes(prop),
});

export default Image;
