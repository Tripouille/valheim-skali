import React from 'react';
import { IconType } from 'react-icons';
import Heading, { HeadingProps } from '@packages/components/core/Typography/Heading';
import Icon, { IconProps } from '@packages/components/core/Images/Icon';

export interface IconTitleProps {
  title: string;
  size: HeadingProps['size'];
  icon: IconType;
  iconColor?: IconProps['color'];
}

const IconTitle: React.FC<IconTitleProps> = ({ title, size, icon, iconColor }) => (
  <Heading size={size} display="flex" alignItems="center" color={iconColor}>
    <Icon as={icon} w="2em" h="2em" me="3" color={iconColor} />
    {title}
  </Heading>
);

export default IconTitle;
