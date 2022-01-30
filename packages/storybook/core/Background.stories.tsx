import Background, { BackgroundProps } from '@packages/components/core/Containers/Background';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';

const { defaultExport, StoryFactory } = storybookSetup<BackgroundProps>(Background);

export default defaultExport;

export const Default = StoryFactory({ children: <h1>Title</h1> });
