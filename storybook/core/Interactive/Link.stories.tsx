import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import Link, { LinkProps } from 'components/core/Interactive/Link';

const { defaultExport, StoryFactory } = storybookSetup<LinkProps>(
  Link,
  StoryCategory.CORE_INTERACTIVE,
);

export default defaultExport;

export const Default = StoryFactory({
  dataCy: '',
  children: 'Nom du lien',
  href: '#',
  isExternal: false,
});
