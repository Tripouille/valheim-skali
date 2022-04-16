import Tag, { TagProps } from 'components/core/DataDisplay/Tag';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';
import { CONTINUOUS_LABEL } from 'utils/constants';

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
  label: CONTINUOUS_LABEL,
  colorScheme: 'gray',
  size: 'md',
  variant: 'subtle',
});
