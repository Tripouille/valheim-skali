import { ImageProps as NextImageProps } from 'next/image';
import React, { useEffect } from 'react';
import Box from 'components/core/Containers/Box';
import Center from 'components/core/Containers/Center';
import Image from 'components/core/Images/Image';
import Portal from 'components/core/Overlay/Portal';
import { Callback, CypressProps } from 'utils/types';

export interface ImageModalProps extends CypressProps {
  src: string;
  alt: NextImageProps['alt'];
  onClose: Callback;
}

const ImageModal: React.FC<ImageModalProps> = ({ 'data-cy': dataCy, src, alt, onClose }) => {
  useEffect(
    function closeOnEscape() {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    },
    [onClose],
  );

  return (
    <Portal>
      <Center
        position="absolute"
        top="0"
        height="full"
        width="full"
        bgColor="overlay"
        cursor="pointer"
        onClick={onClose}
        data-cy={`${dataCy}-modal`}
      >
        <Box pos="relative" cursor="pointer" w="95%" h="95%" display="flex" justifyContent="center">
          <Image layout="fill" objectFit="scale-down" src={src} alt={alt} borderRadius="xl" />
        </Box>
      </Center>
    </Portal>
  );
};

export default ImageModal;
