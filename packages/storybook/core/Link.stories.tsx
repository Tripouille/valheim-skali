import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';
import Link, { LinkProps } from '@packages/components/core/Interactive/Link';

const { defaultExport, StoryFactory } = storybookSetup<LinkProps>(Link);

export default defaultExport;

export const Default = StoryFactory({
  dataCy: '',
  children: 'Nom du lien',
  href: '#',
  isExternal: false,
});
