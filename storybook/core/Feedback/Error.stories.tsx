import Error, { ErrorProps } from 'components/core/Feedback/Error';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

const { defaultExport, StoryFactory } = storybookSetup<ErrorProps>(
  Error,
  StoryCategory.CORE_FEEDBACK,
);

export default defaultExport;

export const Default = StoryFactory({ children: "Message d'erreur" });
