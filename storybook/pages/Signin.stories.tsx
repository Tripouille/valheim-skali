import SigninPage from 'components/pages/Signin';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

const { defaultExport, StoryFactory } = storybookSetup(SigninPage, StoryCategory.PAGE);

export default defaultExport;

export const Signin = StoryFactory({});
