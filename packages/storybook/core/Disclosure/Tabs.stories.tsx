import { action } from '@storybook/addon-actions';
import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import {
  Tabs,
  TabsProps,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@packages/components/core/Disclosure/Tabs';

const { defaultExport, StoryFactory } = storybookSetup<TabsProps>(
  Tabs,
  StoryCategory.CORE_DISCLOSURE,
);

export default defaultExport;

export const Default = StoryFactory({
  align: 'start',
  colorScheme: 'blue',
  defaultIndex: 0,
  direction: 'ltr',
  isFitted: false,
  isManual: false,
  onChange: action('tab changed'),
  orientation: 'horizontal',
  size: 'md',
  variant: 'line',
  children: (
    <>
      <TabList>
        <Tab>Title 1</Tab>
        <Tab>Title 2</Tab>
        <Tab>Title 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Tab 1 body</TabPanel>
        <TabPanel>Tab 2 body</TabPanel>
        <TabPanel>Tab 3 body</TabPanel>
      </TabPanels>
    </>
  ),
});