import React from 'react';
import { IconType } from 'react-icons';
import { FaArrowCircleRight } from 'react-icons/fa';
import { chakra } from '@chakra-ui/react';
import { List, ListIcon, ListIconProps, ListItem } from 'components/core/DataDisplay/List';
import { Children } from 'utils/types';

export interface IconListProps {
  list: Children[];
  icon?: IconType;
  iconColor?: ListIconProps['color'];
  className?: string;
}

const IconList: React.FC<IconListProps> = ({
  list,
  icon = FaArrowCircleRight,
  iconColor = 'blue.200',
  className,
}) => (
  <List spacing={3} maxW="full" className={className}>
    {list.map(
      (content: Children, index: number) =>
        content && (
          // eslint-disable-next-line react/no-array-index-key
          <ListItem key={index} display="flex" alignItems="center">
            <ListIcon as={icon} color={iconColor} boxSize="1.2em" />
            {content}
          </ListItem>
        ),
    )}
  </List>
);

export default chakra(IconList);
