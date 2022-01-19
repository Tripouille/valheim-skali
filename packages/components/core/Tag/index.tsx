import React from 'react';
import { Tag as ChakraTag } from '@chakra-ui/react';
import { TagColors } from '@packages/utils/constants';
import { autoBgColor, autoTextColor } from '@packages/utils/color';

export interface TagProps {
  label: string;
}

const Tag: React.FC<TagProps> = ({ label }) => {
  const bgColor = TagColors[label] ?? autoBgColor(label);

  return (
    <ChakraTag bgColor={bgColor} color={autoTextColor(bgColor)}>
      {label}
    </ChakraTag>
  );
};

export default Tag;
