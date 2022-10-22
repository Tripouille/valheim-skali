import ErrorAlert, { ErrorAlertProps } from 'components/core/Feedback/ErrorAlert';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

const { defaultExport, StoryFactory } = storybookSetup<ErrorAlertProps>(
  ErrorAlert,
  StoryCategory.CORE_FEEDBACK,
);

export default defaultExport;

export const Axios401 = StoryFactory({ error: { isAxiosError: true, response: { status: 401 } } });

export const Axios505 = StoryFactory({ error: { isAxiosError: true, response: { status: 505 } } });

export const Unknown = StoryFactory({ error: 'An unknown error' });
