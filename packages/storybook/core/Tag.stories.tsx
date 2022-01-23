import Tag, { TagProps } from '@packages/components/core/Tag';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';

const { defaultExport, StoryFactory } = storybookSetup<TagProps>(Tag);

export default defaultExport;

export const Default = StoryFactory({
  label: 'A tag label',
});

export const DefinedColor = StoryFactory({
  label: 'Continu',
});
