import PageTitle, { PageTitleProps } from '@packages/components/core/PageTitle';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';

const { defaultExport, StoryFactory } = storybookSetup<PageTitleProps>(PageTitle);

export default defaultExport;

export const Default = StoryFactory({
  title: 'Title',
});
