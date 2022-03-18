import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import LayoutComponent from '@packages/components/Layout';

const { defaultExport, StoryFactory } = storybookSetup(LayoutComponent, StoryCategory.LAYOUT);

export default defaultExport;

export const Layout = StoryFactory({});
