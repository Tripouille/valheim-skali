import { HStack } from '@chakra-ui/react';
import { ImageAttributes } from '@packages/utils/types';
import ZoomableImage from '@packages/components/core/ZoomableImage';

export interface CarouselProps {
  images: ImageAttributes[];
  height: string;
}

const Carousel: React.FC<CarouselProps> = ({ images, height }) => (
  <HStack spacing="4" mb="5" py="4" overflow="auto">
    {images.map(imageAttributes => (
      <ZoomableImage
        key={imageAttributes.src}
        imageAttributes={imageAttributes}
        width={300}
        height={height}
        borderRadius="md"
      />
    ))}
  </HStack>
);

export default Carousel;
