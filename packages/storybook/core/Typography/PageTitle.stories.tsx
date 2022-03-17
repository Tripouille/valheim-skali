import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import PageTitle, { PageTitleProps } from '@packages/components/core/Typography/PageTitle';

const { defaultExport, StoryFactory } = storybookSetup<PageTitleProps>(
  PageTitle,
  StoryCategory.CORE_TYPOGRAPHY,
);

export default defaultExport;

export const Default = StoryFactory({
  title: 'Title',
});
