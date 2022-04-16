import { MdCheckCircle } from 'react-icons/md';
import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import { List, ListProps, ListItem, ListIcon } from 'components/core/DataDisplay/List';

const { defaultExport, StoryFactory } = storybookSetup<ListProps>(
  List,
  StoryCategory.CORE_DATA_DISPLAY,
  {},
  List.displayName,
);

export default defaultExport;

export const Default = StoryFactory({
  spacing: 3,
  children: (
    <>
      <ListItem display="flex" alignItems="center">
        <ListIcon as={MdCheckCircle} color="green.400" boxSize="1.2em" />
        First item
      </ListItem>
      <ListItem display="flex" alignItems="center">
        <ListIcon as={MdCheckCircle} color="green.400" boxSize="1.2em" />
        Second item
      </ListItem>
    </>
  ),
});
