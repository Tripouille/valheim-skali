import React from 'react';
import {
  Tag as ChakraTag,
  TagProps as ChakraTagProps,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
import { TagColors } from 'utils/constants';
import { autoBgColor, autoTextColor } from 'utils/color';
import { CypressProps, Callback } from 'utils/types';

export type TagProps = ChakraTagProps &
  (
    | ({
        label: string;
        onClose?: never;
      } & Partial<CypressProps>)
    | ({
        label: string;
        onClose: Callback;
      } & CypressProps)
  );

const Tag: React.FC<TagProps> = ({ 'data-cy': dataCy, label, onClose, ...chakraTagProps }) => {
  const bgColor = TagColors[label] ?? autoBgColor(label);

  return (
    <ChakraTag
      bgColor={bgColor}
      color={autoTextColor(bgColor)}
      h="full"
      overflow="hidden"
      {...chakraTagProps}
      data-cy={dataCy}
    >
      <TagLabel>{label}</TagLabel>
      {onClose && <TagCloseButton data-cy="close" onClick={onClose} />}
    </ChakraTag>
  );
};

export default Tag;
