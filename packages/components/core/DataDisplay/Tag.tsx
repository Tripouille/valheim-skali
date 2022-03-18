import React from 'react';
import {
  Tag as ChakraTag,
  TagProps as ChakraTagProps,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
import { TagColors } from '@packages/utils/constants';
import { autoBgColor, autoTextColor } from '@packages/utils/color';
import { DataAttributes, getDataValue } from '@packages/utils/dataAttributes';
import { Callback } from '@packages/utils/types';

export type TagProps = ChakraTagProps &
  (
    | ({
        label: string;
        onClose?: never;
      } & Partial<DataAttributes>)
    | ({
        label: string;
        onClose: Callback;
      } & DataAttributes)
  );

const Tag: React.FC<TagProps> = ({ dataCy, label, onClose, ...chakraTagProps }) => {
  const bgColor = TagColors[label] ?? autoBgColor(label);

  return (
    <ChakraTag
      bgColor={bgColor}
      color={autoTextColor(bgColor)}
      h="full"
      overflow="hidden"
      data-cy={dataCy}
      {...chakraTagProps}
    >
      <TagLabel>{label}</TagLabel>
      {onClose && (
        <TagCloseButton
          data-cy={getDataValue(dataCy as string, 'close_button')}
          onClick={onClose}
        />
      )}
    </ChakraTag>
  );
};

export default Tag;
