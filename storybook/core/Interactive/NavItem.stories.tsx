import { action } from '@storybook/addon-actions';
import NavItem, { NavItemProps } from 'components/core/Interactive/NavItem';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';
import { NavRoute } from 'utils/routes';

const { defaultExport, StoryFactory } = storybookSetup<NavItemProps>(
  NavItem,
  StoryCategory.CORE_INTERACTIVE,
);

export default defaultExport;

export const Default = StoryFactory({
  route: NavRoute.EVENTS,
  onClick: action('Clicked'),
});
