import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';
import Error, { ErrorProps } from '@packages/components/core/Feedback/Error';

const { defaultExport, StoryFactory } = storybookSetup<ErrorProps>(Error);

export default defaultExport;

export const Default = StoryFactory({ children: "Message d'erreur" });
