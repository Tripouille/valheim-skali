import { ImageProps as NextImageProps } from 'next/image';
import React from 'react';
import { chakra, shouldForwardProp, useBoolean } from '@chakra-ui/react';
import Image from 'components/core/Images/Image';
import Button from 'components/core/Interactive/Button';
import ImageModal from 'components/core/Overlay/ImageModal';
import { Children, CypressProps } from 'utils/types';
import Box from '../Containers/Box';

export interface ZoomableImageProps extends CypressProps {
  src: string;
  alt: NextImageProps['alt'];
  width: number;
  height: number;
  objectFit?: NextImageProps['objectFit'];
  objectPosition?: NextImageProps['objectPosition'];
  legend?: Children;
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
        onClick={e => {
          e.stopPropagation();
          setZoomed.on();
        }}
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
      {isZoomed && <ImageModal data-cy={dataCy} src={src} alt={alt} onClose={setZoomed.off} />}
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
