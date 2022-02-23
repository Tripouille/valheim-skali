import { storybookSetup } from '@packages/utils/Storybook/setup';
import { StoryCategory } from '@packages/utils/Storybook/constants';
import Background, { BackgroundProps } from '@packages/components/core/Containers/Background';

const { defaultExport, StoryFactory } = storybookSetup<BackgroundProps>(
  Background,
  StoryCategory.CORE_CONTAINERS,
);

export default defaultExport;

export const Default = StoryFactory({ children: <h1>Title</h1> });
