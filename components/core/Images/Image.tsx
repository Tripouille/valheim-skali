/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import nextConfig from 'next.config';
import { chakra } from '@chakra-ui/react';

export type ImageProps = NextImageProps & { src: string };

const Image: React.FC<ImageProps> = imageProps =>
  nextConfig.images?.domains?.some(
    domain => imageProps.src.startsWith('/') || imageProps.src.includes(domain),
  ) ? (
    <NextImage {...imageProps} />
  ) : (
    <img {...imageProps} />
  );

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
