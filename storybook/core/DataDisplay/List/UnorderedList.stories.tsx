import {
  UnorderedList,
  UnorderedListProps,
  List,
  ListItem,
} from 'components/core/DataDisplay/List';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

const { defaultExport, StoryFactory } = storybookSetup<UnorderedListProps>(
  UnorderedList,
  StoryCategory.CORE_DATA_DISPLAY,
  {},
  List.displayName,
);

export default defaultExport;

export const Default = StoryFactory({
  spacing: 3,
  children: (
    <>
      <ListItem>First item</ListItem>
      <ListItem>Second item</ListItem>
    </>
  ),
});
