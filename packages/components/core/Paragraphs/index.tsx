import React from 'react';
import { chakra } from '@chakra-ui/react';
import Text, { TextProps } from '@packages/components/core/Text';

export interface ParagraphsProps {
  paragraphs: string[];
  /** margin bottom default is 2 */
  mb?: TextProps['mb'];
  className?: string;
}

const Paragraphs: React.FC<ParagraphsProps> = ({ paragraphs, className, mb = '2' }) => (
  <>
    {paragraphs.map((text, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Text key={index} mb={mb} className={className}>
        {text}
      </Text>
    ))}
  </>
);

export default chakra(Paragraphs);
