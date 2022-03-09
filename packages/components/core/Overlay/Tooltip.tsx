import React from 'react';
import { Tooltip as ChakraTooltip, TooltipProps as ChakraTooltipProps } from '@chakra-ui/react';

export type TooltipProps = ChakraTooltipProps;

const Tooltip: React.FC<TooltipProps> = chakraTooltipProps => (
  <ChakraTooltip {...chakraTooltipProps}></ChakraTooltip>
);

export default Tooltip;
