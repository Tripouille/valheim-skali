import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import PageTitle, { PageTitleProps } from 'components/core/Typography/PageTitle';

const { defaultExport, StoryFactory } = storybookSetup<PageTitleProps>(
  PageTitle,
  StoryCategory.CORE_TYPOGRAPHY,
);

export default defaultExport;

export const Default = StoryFactory({
  title: 'Title',
});
