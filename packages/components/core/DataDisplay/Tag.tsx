import React from 'react';
import {
  Tag as ChakraTag,
  TagProps as ChakraTagProps,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
import { TagColors } from '@packages/utils/constants';
import { autoBgColor, autoTextColor } from '@packages/utils/color';
import { Callback } from '@packages/utils/types';

export type TagProps = ChakraTagProps & {
  label: string;
  onClose?: Callback;
};

const Tag: React.FC<TagProps> = ({ label, onClose, ...chakraTagProps }) => {
  const bgColor = TagColors[label] ?? autoBgColor(label);

  return (
    <ChakraTag
      bgColor={bgColor}
      color={autoTextColor(bgColor)}
      overflow="hidden"
      {...chakraTagProps}
    >
      <TagLabel>{label}</TagLabel>
      {onClose && <TagCloseButton onClick={onClose} />}
    </ChakraTag>
  );
};

export default Tag;
