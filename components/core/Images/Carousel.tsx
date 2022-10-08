import { HStack } from 'components/core/Containers/Stack';
import ZoomableImage, { ZoomableImageProps } from 'components/core/Images/ZoomableImage';
import { ImageAttributes, CypressProps } from 'utils/types';

export interface CarouselProps extends CypressProps {
  images: ImageAttributes[];
  height: ZoomableImageProps['height'];
}

const Carousel: React.FC<CarouselProps> = ({ 'data-cy': dataCy, images, height }) => (
  <HStack spacing="4" py="4" overflow="auto" data-cy={dataCy}>
    {images.map((imageAttributes, index) => (
      <ZoomableImage
        data-cy={`image-${index}`}
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
