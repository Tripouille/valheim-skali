import React from 'react';
import { ImageProps as NextImageProps } from 'next/image';
import { Callback, CypressProps } from 'utils/types';
import Portal from 'components/core/Overlay/Portal';
import Box from 'components/core/Containers/Box';
import Center from 'components/core/Containers/Center';
import Image from 'components/core/Images/Image';
import theme from 'theme';

export interface ImageModalProps extends CypressProps {
  src: NextImageProps['src'];
  alt: NextImageProps['alt'];
  onClick: Callback;
}

const ImageModal: React.FC<ImageModalProps> = ({ 'data-cy': dataCy, src, alt, onClick }) => (
  <Portal>
    <Center
      position="absolute"
      top="0"
      height="full"
      width="full"
      bgColor={theme.colors.overlay}
      cursor="pointer"
      onClick={onClick}
      data-cy={`${dataCy}-modal`}
    >
      <Box pos="relative" cursor="pointer" w="95%" h="95%">
        <Image layout="fill" objectFit="contain" src={src} alt={alt} borderRadius="xl" />
      </Box>
    </Center>
  </Portal>
);

export default ImageModal;
