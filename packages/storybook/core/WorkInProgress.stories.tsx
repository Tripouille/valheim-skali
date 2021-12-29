import WorkInProgress from '@packages/components/core/WorkInProgress';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';

const { defaultExport, StoryFactory } = storybookSetup<Record<string, unknown>>(WorkInProgress);

export default defaultExport;

export const Default = StoryFactory({});
