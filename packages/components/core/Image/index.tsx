import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { chakra } from '@chakra-ui/react';
import { DataAttributes } from '@packages/utils/types';

export type ImageProps = NextImageProps & DataAttributes;

const Image: React.FC<ImageProps> = ({ dataCy, ...props }) => (
  <NextImage {...props} data-cy={dataCy}></NextImage>
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
      'dataCy',
    ].includes(prop),
});
