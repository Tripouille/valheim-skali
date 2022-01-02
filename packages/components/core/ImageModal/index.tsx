import React from 'react';
import { ImageProps as NextImageProps } from 'next/image';
import { Portal, Center, Box } from '@chakra-ui/react';
import { Callback } from '@packages/utils/types';
import Image from '@packages/components/core/Image';

export interface ImageModalProps {
  src: NextImageProps['src'];
  alt: NextImageProps['alt'];
  onClick: Callback;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, alt, onClick }) => (
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
        <Image layout="fill" objectFit="contain" src={src} alt={alt} borderRadius="xl" />
      </Box>
    </Center>
  </Portal>
);

export default ImageModal;
