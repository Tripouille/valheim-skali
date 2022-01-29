import React from 'react';
import { ImageProps as NextImageProps } from 'next/image';
import { Callback, ElementCategoriesProps } from '@packages/utils/types';
import { createDataAttributes } from '@packages/utils/dataAttributes/createDataAttributes';
import Portal from '@packages/components/core/Portal';
import Box from '@packages/components/core/Box';
import Center from '@packages/components/core/Center';
import Image from '@packages/components/core/Image';

export interface ImageModalProps extends ElementCategoriesProps {
  src: NextImageProps['src'];
  alt: NextImageProps['alt'];
  onClick: Callback;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, alt, onClick, elementCategories }) => (
  <Portal>
    <Center
      position="absolute"
      top="0"
      height="full"
      width="full"
      bgColor="rgba(49, 130, 206, 0.7)"
      cursor="pointer"
      onClick={onClick}
    >
      <Box pos="relative" cursor="pointer" w="95%" h="95%">
        <Image
          layout="fill"
          objectFit="contain"
          src={src}
          alt={alt}
          borderRadius="xl"
          {...createDataAttributes(elementCategories)}
        />
      </Box>
    </Center>
  </Portal>
);

export default ImageModal;
