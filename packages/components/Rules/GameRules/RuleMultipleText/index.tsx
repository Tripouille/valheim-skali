import React from 'react';
import { chakra, Text } from '@chakra-ui/react';

export interface RuleMultipleTextProps {
  content: string[];
  className?: string;
}

const RuleMultipleText: React.FC<RuleMultipleTextProps> = ({ content, className }) => (
  <>
    {content.map((text, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Text key={index} mb="2" className={className}>
        {text}
      </Text>
    ))}
  </>
);

export default chakra(RuleMultipleText);
