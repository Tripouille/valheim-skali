import { action } from '@storybook/addon-actions';
import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import NavItem, { NavItemProps } from '@packages/components/core/Interactive/NavItem';
import { NavRoute } from '@packages/utils/routes';

const { defaultExport, StoryFactory } = storybookSetup<NavItemProps>(
  NavItem,
  StoryCategory.CORE_INTERACTIVE,
);

export default defaultExport;

export const Default = StoryFactory({
  dataCy: '',
  root: '/valhabba',
  route: NavRoute.EVENTS,
  onClick: action('Clicked'),
});
