import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import {
  UnorderedList,
  UnorderedListProps,
  List,
  ListItem,
} from '@packages/components/core/DataDisplay/List';

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
