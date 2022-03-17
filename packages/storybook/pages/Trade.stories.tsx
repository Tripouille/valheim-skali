import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import TradePage from '@packages/components/pages/Trade';

const { defaultExport, StoryFactory } = storybookSetup(TradePage, StoryCategory.PAGE);

export default defaultExport;

export const Trade = StoryFactory({});
