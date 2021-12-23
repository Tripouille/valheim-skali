import React from 'react';
import { Portal, Center, Image } from '@chakra-ui/react';
import { Callback, ImageAttributes } from '@packages/utils/types';

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
      <Image
        src={imageAttributes.src}
        alt={imageAttributes.alt}
        maxH="95%"
        maxW="95%"
        borderRadius="xl"
      />
    </Center>
  </Portal>
);

export default ImageModal;
