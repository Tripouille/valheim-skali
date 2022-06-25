import React from 'react';
import { ImageProps as NextImageProps } from 'next/image';
import { chakra, shouldForwardProp, useBoolean } from '@chakra-ui/react';
import { CypressProps } from 'utils/types';
import ImageModal from 'components/core/Overlay/ImageModal';
import Button from 'components/core/Interactive/Button';
import Image from 'components/core/Images/Image';
import Box from '../Containers/Box';

export interface ZoomableImageProps extends CypressProps {
  src: NextImageProps['src'];
  alt: NextImageProps['alt'];
  width: number;
  height: number;
  objectFit?: NextImageProps['objectFit'];
  objectPosition?: NextImageProps['objectPosition'];
  legend?: string;
  className?: string;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({
  'data-cy': dataCy,
  src,
  alt,
  width,
  height,
  objectFit = 'contain',
  objectPosition,
  legend,
  className,
}) => {
  const [isZoomed, setZoomed] = useBoolean();

  return (
    <>
      <Button
        data-cy={dataCy}
        variant="unstyled"
        onClick={setZoomed.on}
        height="unset"
        minWidth="unset"
        fontWeight="normal"
      >
        <chakra.figure width={width}>
          <Box position="relative" width={width} height={height}>
            <Image
              src={src}
              alt={alt}
              layout="fill"
              objectFit={objectFit}
              objectPosition={objectPosition}
              className={className}
            />
          </Box>
          <chakra.figcaption whiteSpace="pre-wrap">{legend}</chakra.figcaption>
        </chakra.figure>
      </Button>
      {isZoomed && <ImageModal data-cy={dataCy} src={src} alt={alt} onClick={setZoomed.off} />}
    </>
  );
};

export default chakra(ZoomableImage, {
  shouldForwardProp: prop => {
    if (
      ['width', 'height', 'objectFit', 'objectPosition'].includes(prop) ||
      shouldForwardProp(prop)
    )
      return true;
    else return false;
  },
});
