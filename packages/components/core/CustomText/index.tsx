import React from 'react';
import { chakra, Text } from '@chakra-ui/react';

export interface CustomTextProps {
  paragraphs: string[];
  className?: string;
}

/** Displays an array of text vertically with spacing
 * @param {string[]} paragraphs
 * @param {string | undefined} className For chakra style props, mainly
 */
const CustomText: React.FC<CustomTextProps> = ({ paragraphs, className }) => (
  <>
    {paragraphs.map((text, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Text key={index} mb="2" className={className}>
        {text}
      </Text>
    ))}
  </>
);

export default chakra(CustomText);
