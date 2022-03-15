import { ImageAttributes } from '@packages/utils/types';
import { DataAttributes, getDataValue } from '@packages/utils/dataAttributes';
import ZoomableImage, { ZoomableImageProps } from '@packages/components/core/Images/ZoomableImage';
import { HStack } from '@packages/components/core/Containers/Stack';

export interface CarouselProps extends DataAttributes {
  images: ImageAttributes[];
  height: ZoomableImageProps['height'];
}

const Carousel: React.FC<CarouselProps> = ({ dataCy, images, height }) => (
  <HStack spacing="4" py="4" overflow="auto">
    {images.map((imageAttributes, index) => (
      <ZoomableImage
        dataCy={getDataValue(dataCy, 'zoomable_image', index)}
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
