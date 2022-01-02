import { HStack } from '@chakra-ui/react';
import { ImageAttributes } from '@packages/utils/types';
import ZoomableImage, { ZoomableImageProps } from '@packages/components/core/ZoomableImage';

export interface CarouselProps {
  images: ImageAttributes[];
  height: ZoomableImageProps['height'];
}

const Carousel: React.FC<CarouselProps> = ({ images, height }) => (
  <HStack spacing="4" mb="5" py="4" overflow="auto">
    {images.map(imageAttributes => (
      <ZoomableImage
        key={imageAttributes.src}
        src={imageAttributes.src}
        alt={imageAttributes.alt}
        width={300}
        height={height}
        objectFit="cover"
        borderRadius="md"
      />
    ))}
  </HStack>
);

export default Carousel;
