import React from 'react';
import { Tag as ChakraTag, TagProps as ChakraTagProps } from '@chakra-ui/react';
import { TagColors } from '@packages/utils/constants';
import { autoBgColor, autoTextColor } from '@packages/utils/color';

export type TagProps = ChakraTagProps & {
  label: string;
};

const Tag: React.FC<TagProps> = ({ label, ...chakraTagProps }) => {
  const bgColor = TagColors[label] ?? autoBgColor(label);

  return (
    <ChakraTag bgColor={bgColor} color={autoTextColor(bgColor)} {...chakraTagProps}>
      {label}
    </ChakraTag>
  );
};

export default Tag;
