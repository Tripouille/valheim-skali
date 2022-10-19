import Join from 'components/pages/Join';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

const { defaultExport, StoryFactory } = storybookSetup(Join, StoryCategory.PAGE);

export default defaultExport;

export const AsVisitor = StoryFactory({});

export const AsNonMemberWithNoApplication = StoryFactory(
  {},
  { sessionRequestResult: { isNonMember: true, permissions: {} } },
);

export const AsNonMemberWithApplication = StoryFactory(
  {},
  { sessionRequestResult: { isNonMember: true, hasApplication: true, permissions: {} } },
);

export const AsMember = StoryFactory(
  {},
  { sessionRequestResult: { isNonMember: false, permissions: {} } },
);
