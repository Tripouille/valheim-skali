import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';
import Background, { BackgroundProps } from '@packages/components/core/Containers/Background';

const { defaultExport, StoryFactory } = storybookSetup<BackgroundProps>(Background);

export default defaultExport;

export const Default = StoryFactory({ children: <h1>Title</h1> });
