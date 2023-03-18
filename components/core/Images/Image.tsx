/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { chakra } from '@chakra-ui/react';
import nextConfig from 'next.config';

export type ImageProps = NextImageProps & { src: string };

const getNativeImgProps = (imageProps: ImageProps) => {
  const { objectFit, objectPosition, ...rest } = imageProps;
  return rest;
};

const Image: React.FC<ImageProps> = imageProps =>
  imageProps.src.startsWith('/') ||
  nextConfig.images?.domains?.some(domain => imageProps.src.includes(domain)) ? (
    <NextImage {...imageProps} />
  ) : (
    <img
      {...getNativeImgProps(imageProps)}
      style={{ objectFit: imageProps.objectFit, objectPosition: imageProps.objectPosition }}
    />
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
