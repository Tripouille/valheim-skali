import { action } from '@storybook/addon-actions';
import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import NavItem, { NavItemProps } from 'components/core/Interactive/NavItem';
import { NavRoute } from 'utils/routes';

const { defaultExport, StoryFactory } = storybookSetup<NavItemProps>(
  NavItem,
  StoryCategory.CORE_INTERACTIVE,
);

export default defaultExport;

export const Default = StoryFactory({
  root: '/valhabba',
  route: NavRoute.EVENTS,
  onClick: action('Clicked'),
});
