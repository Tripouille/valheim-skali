import React from 'react';
import { ImageProps as NextImageProps } from 'next/image';
import { Box, chakra, shouldForwardProp, useBoolean } from '@chakra-ui/react';
import { ImageAttributes } from '@packages/utils/types';
import ImageModal from '@packages/components/core/ImageModal';
import Image from '@packages/components/core/Image';

export interface ZoomableImageProps {
  imageAttributes: ImageAttributes;
  width: NextImageProps['width'];
  height: NextImageProps['height'];
  className?: string;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({
  imageAttributes,
  width,
  height,
  className,
}) => {
  const [isZoomed, setZoomed] = useBoolean();

  return (
    <>
      <Box pos="relative" cursor="pointer" minW={width} minH={height} onClick={setZoomed.on}>
        <Image
          width={width}
          height={height}
          objectFit="cover"
          src={imageAttributes.src}
          alt={imageAttributes.alt}
          className={className}
        />
      </Box>
      {isZoomed && <ImageModal imageAttributes={imageAttributes} onClick={setZoomed.off} />}
    </>
  );
};

export default chakra(ZoomableImage, {
  shouldForwardProp: prop => {
    if (['width', 'height'].includes(prop) || shouldForwardProp(prop)) return true;
    else return false;
  },
});
