import { storybookSetup } from '@packages/utils/Storybook/setup';
import { StoryCategory } from '@packages/utils/Storybook/constants';
import Link, { LinkProps } from '@packages/components/core/Interactive/Link';

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
