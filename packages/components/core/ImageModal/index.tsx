import React from 'react';
import { Portal, Center, Box } from '@chakra-ui/react';
import { Callback, ImageAttributes } from '@packages/utils/types';
import Image from '@packages/components/core/Image';

export interface ImageModalProps {
  imageAttributes: ImageAttributes;
  onClick: Callback;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageAttributes, onClick }) => (
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
          src={imageAttributes.src}
          alt={imageAttributes.alt}
          borderRadius="xl"
        />
      </Box>
    </Center>
  </Portal>
);

export default ImageModal;
