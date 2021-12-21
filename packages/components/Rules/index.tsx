import React from 'react';
import { Heading, VStack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Background from '@packages/components/Background';
import Preambule from './Preambule';
import DiscordRules from './DiscordRules';
import GameRules from './GameRules';
import GameGuides from './GameGuides';

const ruleParts: Record<string, JSX.Element> = {
  Préambule: <Preambule />,
  'Règles discord': <DiscordRules />,
  'Règles de jeu': <GameRules />,
  'Guides de jeu': <GameGuides />,
};

const Rules = () => (
  <Background>
    <VStack spacing="5" w="full">
      <Heading as="h1" size="xl">
        Règlement
      </Heading>
      <Tabs w="full" id="rulesTabs">
        <TabList>
          {Object.keys(ruleParts).map(title => (
            <Tab key={title}>{title}</Tab>
          ))}
        </TabList>
        <TabPanels textAlign="justify">
          {Object.entries(ruleParts).map(([title, content]) => (
            <TabPanel key={title}>{content}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </VStack>
  </Background>
);

export default Rules;
