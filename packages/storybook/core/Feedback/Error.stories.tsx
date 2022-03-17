import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import Error, { ErrorProps } from '@packages/components/core/Feedback/Error';

const { defaultExport, StoryFactory } = storybookSetup<ErrorProps>(
  Error,
  StoryCategory.CORE_FEEDBACK,
);

export default defaultExport;

export const Default = StoryFactory({ children: "Message d'erreur" });
