import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { chakra } from '@chakra-ui/react';

export type ImageProps = NextImageProps;

const Image: React.FC<ImageProps> = imageProps => <NextImage {...imageProps}></NextImage>;

/** Any other props will be interpreted by Chakra (for css) */
export default chakra(Image, {
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
  baseStyle: {
    fontSize: '0.65rem',
    fontWeight: 'normal',
  },
});
