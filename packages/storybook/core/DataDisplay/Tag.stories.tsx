import Tag, { TagProps } from '@packages/components/core/DataDisplay/Tag';
import { StoryCategory } from '@packages/utils/Storybook/constants';
import { storybookSetup } from '@packages/utils/Storybook/setup';

const { defaultExport, StoryFactory } = storybookSetup<TagProps>(
  Tag,
  StoryCategory.CORE_DATA_DISPLAY,
);

export default defaultExport;

export const Default = StoryFactory({
  label: 'A tag label',
  colorScheme: 'gray',
  size: 'md',
  variant: 'subtle',
});

export const DefinedColor = StoryFactory({
  label: 'Continu',
  colorScheme: 'gray',
  size: 'md',
  variant: 'subtle',
});
