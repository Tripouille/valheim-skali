import React from 'react';
import { IconType } from 'react-icons';
import Heading from '@packages/components/core/Heading';
import Icon from '@packages/components/core/Icon';

export interface IconTitleProps {
  title: string;
  size: string;
  icon: IconType;
  iconColor: string;
}

const IconTitle: React.FC<IconTitleProps> = ({ title, size, icon, iconColor }) => (
  <Heading size={size} display="flex" alignItems="center" color={iconColor}>
    <Icon as={icon} w="2em" h="2em" me="3" color={iconColor} />
    {title}
  </Heading>
);

export default IconTitle;
