import LayoutComponent from 'components/Layout';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

const { defaultExport, StoryFactory } = storybookSetup(LayoutComponent, StoryCategory.LAYOUT);

export default defaultExport;

export const Layout = StoryFactory({});
