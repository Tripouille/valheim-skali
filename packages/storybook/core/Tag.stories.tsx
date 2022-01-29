import Tag, { TagProps } from '@packages/components/core/Tag';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';

const { defaultExport, StoryFactory } = storybookSetup<TagProps>(Tag);

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
