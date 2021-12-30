import React from 'react';
import { chakra, Image, useBoolean } from '@chakra-ui/react';
import { ImageAttributes } from '@packages/utils/types';
import ImageModal from '@packages/components/core/ImageModal';

export interface ZoomableImageProps {
  imageAttributes: ImageAttributes;
  className?: string;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({ imageAttributes, className }) => {
  const [isZoomed, setZoomed] = useBoolean();

  return (
    <>
      <Image
        src={imageAttributes.src}
        alt={imageAttributes.alt}
        cursor="pointer"
        borderRadius="md"
        onClick={setZoomed.on}
        className={className}
      />
      {isZoomed && <ImageModal imageAttributes={imageAttributes} onClick={setZoomed.off} />}
    </>
  );
};

export default chakra(ZoomableImage);
