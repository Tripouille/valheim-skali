import Background, { BackgroundProps } from 'components/core/Containers/Background';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

const { defaultExport, StoryFactory } = storybookSetup<BackgroundProps>(
  Background,
  StoryCategory.CORE_CONTAINERS,
);

export default defaultExport;

export const Default = StoryFactory({ children: <h1>Title</h1> });
