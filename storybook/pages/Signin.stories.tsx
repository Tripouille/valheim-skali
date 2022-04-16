import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import SigninPage from 'components/pages/Signin';

const { defaultExport, StoryFactory } = storybookSetup(SigninPage, StoryCategory.PAGE);

export default defaultExport;

export const Signin = StoryFactory({});
