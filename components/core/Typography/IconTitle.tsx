import React from 'react';
import { IconType } from 'react-icons';
import Icon, { IconProps } from 'components/core/Images/Icon';
import Heading, { HeadingProps } from 'components/core/Typography/Heading';

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
