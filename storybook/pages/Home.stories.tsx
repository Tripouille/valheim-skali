import HomePage from 'components/pages/Home';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

const { defaultExport, StoryFactory } = storybookSetup(HomePage, StoryCategory.PAGE, {
  parameters: { chromatic: { delay: 1000 } },
});

export default defaultExport;

export const AsVisitor = StoryFactory({});

export const AsNonMember = StoryFactory({}, { sessionRequestResult: { isNonMember: true } });

export const AsMember = StoryFactory({}, { sessionRequestResult: { isNonMember: false } });
