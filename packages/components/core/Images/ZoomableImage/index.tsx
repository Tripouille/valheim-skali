import React from 'react';
import { ImageProps as NextImageProps } from 'next/image';
import { chakra, shouldForwardProp, useBoolean } from '@chakra-ui/react';
import { DataAttributes, getDataValue } from '@packages/utils/dataAttributes';
import ImageModal from '@packages/components/core/Overlay/ImageModal';
import Button from '@packages/components/core/Interactive/Button';
import Image from '@packages/components/core/Images/Image';

export interface ZoomableImageProps extends DataAttributes {
  src: NextImageProps['src'];
  alt: NextImageProps['alt'];
  width: number;
  height: number;
  objectFit?: NextImageProps['objectFit'];
  objectPosition?: NextImageProps['objectPosition'];
  className?: string;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({
  dataCy,
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
      <Button
        dataCy={getDataValue(dataCy, 'button')}
        variant="unstyled"
        minW={width}
        minH={height}
        onClick={setZoomed.on}
      >
        <Image
          dataCy={getDataValue(dataCy, 'image')}
          src={src}
          alt={alt}
          width={width}
          height={height}
          objectFit={objectFit}
          objectPosition={objectPosition}
          className={className}
        />
      </Button>
      {isZoomed && (
        <ImageModal
          dataCy={getDataValue(dataCy, 'modal')}
          src={src}
          alt={alt}
          onClick={setZoomed.off}
        />
      )}
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
