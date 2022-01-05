import { HStack } from '@chakra-ui/react';
import { ImageAttributes, ElementCategoriesProps } from '@packages/utils/types';
import ZoomableImage, { ZoomableImageProps } from '@packages/components/core/ZoomableImage';

export interface CarouselProps extends ElementCategoriesProps {
  images: ImageAttributes[];
  height: ZoomableImageProps['height'];
}

const Carousel: React.FC<CarouselProps> = ({ images, height, elementCategories }) => (
  <HStack spacing="4" mb="5" py="4" overflow="auto">
    {images.map((imageAttributes, index) => (
      <ZoomableImage
        key={imageAttributes.src}
        src={imageAttributes.src}
        alt={imageAttributes.alt}
        width={300}
        height={height}
        objectFit="cover"
        borderRadius="md"
        elementCategories={elementCategories.concat([
          'carousel',
          'zoomable_image',
          index.toString(),
        ])}
      />
    ))}
  </HStack>
);

export default Carousel;
