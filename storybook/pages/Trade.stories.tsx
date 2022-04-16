import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import TradePage from 'components/pages/Trade';

const { defaultExport, StoryFactory } = storybookSetup(TradePage, StoryCategory.PAGE);

export default defaultExport;

export const Trade = StoryFactory({});
