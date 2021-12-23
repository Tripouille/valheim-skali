import React from 'react';
import { chakra, Text, TextProps } from '@chakra-ui/react';

export interface CustomTextProps {
  paragraphs: string[];
  /** margin bottom default is 2 */
  mb?: TextProps['mb'];
  className?: string;
}

/** Displays an array of text vertically with spacing
 * @param {string[]} paragraphs
 * @param {string | undefined} className For chakra style props, mainly
 */
const CustomText: React.FC<CustomTextProps> = ({ paragraphs, className, mb = '2' }) => (
  <>
    {paragraphs.map((text, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Text key={index} mb={mb} className={className}>
        {text}
      </Text>
    ))}
  </>
);

export default chakra(CustomText);
