import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import ErrorAlert, { ErrorAlertProps } from '@packages/components/core/Feedback/ErrorAlert';

const { defaultExport, StoryFactory } = storybookSetup<ErrorAlertProps>(
  ErrorAlert,
  StoryCategory.CORE_FEEDBACK,
);

export default defaultExport;

export const Axios401 = StoryFactory({ error: { isAxiosError: true, response: { status: 401 } } });

export const Axios505 = StoryFactory({ error: { isAxiosError: true, response: { status: 505 } } });

export const Unknown = StoryFactory({ error: 'An unknown error' });
