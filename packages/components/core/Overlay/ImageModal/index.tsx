import React from 'react';
import { ImageProps as NextImageProps } from 'next/image';
import { Callback } from '@packages/utils/types';
import { getDataValue, DataAttributes } from '@packages/utils/dataAttributes';
import Portal from '@packages/components/core/Overlay/Portal';
import Box from '@packages/components/core/Containers/Box';
import Center from '@packages/components/core/Containers/Center';
import Image from '@packages/components/core/Images/Image';
import theme from '@packages/theme';

export interface ImageModalProps extends DataAttributes {
  src: NextImageProps['src'];
  alt: NextImageProps['alt'];
  onClick: Callback;
}

const ImageModal: React.FC<ImageModalProps> = ({ dataCy, src, alt, onClick }) => (
  <Portal>
    <Center
      position="absolute"
      top="0"
      height="full"
      width="full"
      bgColor={theme.colors.overlay}
      cursor="pointer"
      onClick={onClick}
    >
      <Box pos="relative" cursor="pointer" w="95%" h="95%">
        <Image
          dataCy={getDataValue(dataCy, 'image')}
          layout="fill"
          objectFit="contain"
          src={src}
          alt={alt}
          borderRadius="xl"
        />
      </Box>
    </Center>
  </Portal>
);

export default ImageModal;
