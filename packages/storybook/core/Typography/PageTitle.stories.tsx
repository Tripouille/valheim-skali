import { storybookSetup } from '@packages/utils/Storybook/setup';
import { StoryCategory } from '@packages/utils/Storybook/constants';
import PageTitle, { PageTitleProps } from '@packages/components/core/Typography/PageTitle';

const { defaultExport, StoryFactory } = storybookSetup<PageTitleProps>(
  PageTitle,
  StoryCategory.CORE_TYPOGRAPHY,
);

export default defaultExport;

export const Default = StoryFactory({
  title: 'Title',
});
