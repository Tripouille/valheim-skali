import Link, { LinkProps } from 'components/core/Interactive/Link';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

const { defaultExport, StoryFactory } = storybookSetup<LinkProps>(
  Link,
  StoryCategory.CORE_INTERACTIVE,
);

export default defaultExport;

export const Default = StoryFactory({
  children: 'Nom du lien',
  href: '#',
  isExternal: false,
});
