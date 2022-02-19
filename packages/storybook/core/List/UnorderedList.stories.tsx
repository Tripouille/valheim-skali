import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';
import { StoryCategory } from '@packages/utils/constants';
import {
  UnorderedList,
  UnorderedListProps,
  List,
  ListItem,
} from '@packages/components/core/DataDisplay/List';

const { defaultExport, StoryFactory } = storybookSetup<UnorderedListProps>(
  UnorderedList,
  {},
  StoryCategory.CORE,
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
