import Paragraphs, { ParagraphsProps } from 'components/core/Typography/Paragraphs';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

const { defaultExport, StoryFactory } = storybookSetup<ParagraphsProps>(
  Paragraphs,
  StoryCategory.CORE_TYPOGRAPHY,
);

export default defaultExport;

export const OneLine = StoryFactory({ paragraphs: ['line'] });
export const MultipleLine = StoryFactory({ paragraphs: ['line', 'line 2', 'line 3'] });
export const MultipleLineWithMb = StoryFactory({
  paragraphs: ['line', 'line 2', 'line 3'],
  mb: '12',
});

export const LongParagraph = StoryFactory({
  paragraphs: [
    `Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste cum facere ratione expedita eius. Animi perferendis quos nihil nulla officia corrupti veniam dolorem molestias rerum, unde sint maiores alias doloribus?
Adipisci incidunt quam pariatur quaerat eius voluptate architecto, suscipit quia? Tempore ducimus adipisci at nesciunt provident neque dolore perferendis aliquam, dicta quisquam molestiae tempora, temporibus praesentium blanditiis illum molestias inventore.
Incidunt eos veritatis pariatur sequi, placeat dolore atque sed sunt? Ab voluptatum dolorum distinctio autem eveniet obcaecati, eligendi laborum ipsa tempore natus, consequuntur quae? Dignissimos molestiae nobis eius ea in?`,
  ],
});
