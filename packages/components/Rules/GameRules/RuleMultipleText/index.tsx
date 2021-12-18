import React from 'react';
import { Text } from '@chakra-ui/react';

export interface RuleMultipleTextProps {
  content: string[];
}

const RuleMultipleText: React.FC<RuleMultipleTextProps> = ({ content }) => (
  <>
    {content.map((text, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Text key={index} mb="2">
        {text}
      </Text>
    ))}
  </>
);

export default RuleMultipleText;
