import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import SigninPage from '@packages/components/pages/Signin';

const { defaultExport, StoryFactory } = storybookSetup(SigninPage, StoryCategory.PAGE);

export default defaultExport;

export const Signin = StoryFactory({});
