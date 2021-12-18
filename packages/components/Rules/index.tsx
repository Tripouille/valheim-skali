import React from 'react';
import { Heading, VStack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Background from '@skali/components/Background';
import Preambule from './Preambule';
import DiscordRules from './DiscordRules';
import GameRules from './GameRules';

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
          <Tab>Règles de jeu</Tab>
        </TabList>

        <TabPanels textAlign="justify">
          <TabPanel>
            <Preambule />
          </TabPanel>
          <TabPanel>
            <DiscordRules />
          </TabPanel>
          <TabPanel>
            <GameRules />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  </Background>
);

export default Rules;
