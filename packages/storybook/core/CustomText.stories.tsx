import CustomText, { CustomTextProps } from '@packages/components/core/CustomText';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';

const { defaultExport, StoryFactory } = storybookSetup<CustomTextProps>(CustomText);

export default defaultExport;

export const OneLine = StoryFactory({ paragraphs: ['line'] });
export const MultipleLine = StoryFactory({ paragraphs: ['line', 'line 2', 'line 3'] });
export const MultipleLineWithMb = StoryFactory({
  paragraphs: ['line', 'line 2', 'line 3'],
  mb: '12',
});
