import React from 'react';
import {
  Tabs as ChakraTabs,
  TabsProps as ChakraTabsProps,
  TabList as ChakraTabList,
  TabListProps as ChakraTabListProps,
  Tab as ChakraTab,
  TabProps as ChakraTabProps,
  TabPanels as ChakraTabPanels,
  TabPanelsProps as ChakraTabPanelsProps,
  TabPanel as ChakraTabPanel,
  TabPanelProps as ChakraTabPanelProps,
} from '@chakra-ui/react';

export type TabsProps = ChakraTabsProps;

export const Tabs: React.FC<TabsProps> = chakraTabsProps => (
  <ChakraTabs {...chakraTabsProps}></ChakraTabs>
);

export type TabListProps = ChakraTabListProps;

export const TabList: React.FC<TabListProps> = chakraTabListProps => (
  <ChakraTabList {...chakraTabListProps}></ChakraTabList>
);

export type TabProps = ChakraTabProps;

export const Tab: React.FC<TabProps> = chakraTabProps => (
  <ChakraTab {...chakraTabProps}></ChakraTab>
);

export type TabPanelsProps = ChakraTabPanelsProps;

export const TabPanels: React.FC<TabPanelsProps> = chakraTabPanelsProps => (
  <ChakraTabPanels {...chakraTabPanelsProps}></ChakraTabPanels>
);

export type TabPanelProps = ChakraTabPanelProps;

export const TabPanel: React.FC<TabPanelProps> = chakraTabPanelProps => (
  <ChakraTabPanel {...chakraTabPanelProps}></ChakraTabPanel>
);
