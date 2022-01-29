import { ImageAttributes, ElementCategoriesProps } from '@packages/utils/types';
import ZoomableImage, { ZoomableImageProps } from '@packages/components/core/ZoomableImage';
import { HStack } from '@packages/components/core/Stack';

export interface CarouselProps extends ElementCategoriesProps {
  images: ImageAttributes[];
  height: ZoomableImageProps['height'];
}

const Carousel: React.FC<CarouselProps> = ({ images, height, elementCategories }) => (
  <HStack spacing="4" py="4" overflow="auto">
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
