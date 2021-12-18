import React from 'react';
import { Heading, VStack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Background from '@skali/components/Background';
import Preambule from './Preambule';
import DiscordRules from './DiscordRules';

const Rules = () => (
  <Background>
    <VStack spacing="5" w="full">
      <Heading as="h1" size="xl">
        Règlement
      </Heading>
      <Tabs w="full" id="rulesTabs">
        <TabList>
          <Tab>Préambule</Tab>
          <Tab>Règles discord</Tab>
        </TabList>

        <TabPanels textAlign="justify">
          <TabPanel>
            <Preambule />
          </TabPanel>
          <TabPanel>
            <DiscordRules />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  </Background>
);

export default Rules;
