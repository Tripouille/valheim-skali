import React from 'react';
import { IconType } from 'react-icons';
import { List, ListIcon, ListItem } from '@packages/components/core/List';

export interface RulesListProps {
  list: string[];
  icon: IconType;
  iconColor: string;
}

const RulesList: React.FC<RulesListProps> = ({ list, icon, iconColor }) => (
  <List spacing={3}>
    {list.map((content: string, index: number) => (
      // eslint-disable-next-line react/no-array-index-key
      <ListItem key={index} display="flex" alignItems="center">
        <ListIcon as={icon} color={iconColor} boxSize="1.2em" />
        {content}
      </ListItem>
    ))}
  </List>
);

export default RulesList;
