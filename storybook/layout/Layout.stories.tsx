import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import LayoutComponent from 'components/Layout';

const { defaultExport, StoryFactory } = storybookSetup(LayoutComponent, StoryCategory.LAYOUT);

export default defaultExport;

export const Layout = StoryFactory({});
