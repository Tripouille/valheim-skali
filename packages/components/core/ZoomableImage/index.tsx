import React, { useState } from 'react';
import { chakra, Image } from '@chakra-ui/react';
import { ImageAttributes } from '@packages/utils/types';
import ImageModal from '@packages/components/core/ImageModal';

export interface ZoomableImageProps {
  imageAttributes: ImageAttributes;
  className?: string;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({ imageAttributes, className }) => {
  const [isZoomed, setZoomed] = useState(false);

  const openImage = () => setZoomed(true);
  const closeImage = () => setZoomed(false);

  return (
    <>
      <Image
        src={imageAttributes.src}
        alt={imageAttributes.alt}
        cursor="pointer"
        borderRadius="md"
        onClick={openImage}
        className={className}
      />
      {isZoomed && <ImageModal imageAttributes={imageAttributes} onClick={closeImage} />}
    </>
  );
};

export default chakra(ZoomableImage);
