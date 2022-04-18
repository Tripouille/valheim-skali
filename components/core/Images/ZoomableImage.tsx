import React from 'react';
import { ImageProps as NextImageProps } from 'next/image';
import { chakra, shouldForwardProp, useBoolean } from '@chakra-ui/react';
import { CypressProps } from 'utils/types';
import ImageModal from 'components/core/Overlay/ImageModal';
import Button from 'components/core/Interactive/Button';
import Image from 'components/core/Images/Image';

export interface ZoomableImageProps extends CypressProps {
  src: NextImageProps['src'];
  alt: NextImageProps['alt'];
  width: number;
  height: number;
  objectFit?: NextImageProps['objectFit'];
  objectPosition?: NextImageProps['objectPosition'];
  className?: string;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({
  'data-cy': dataCy,
  src,
  alt,
  width,
  height,
  objectFit,
  objectPosition,
  className,
}) => {
  const [isZoomed, setZoomed] = useBoolean();

  return (
    <>
      <Button data-cy={dataCy} variant="unstyled" minW={width} minH={height} onClick={setZoomed.on}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          objectFit={objectFit}
          objectPosition={objectPosition}
          className={className}
        />
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
