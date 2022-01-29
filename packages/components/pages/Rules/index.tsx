import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@packages/components/core/Tabs';
import { VStack } from '@packages/components/core/Stack';
import PageTitle from '@packages/components/core/PageTitle';
import Background from '@packages/components/core/Background';
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
      <PageTitle title="Règlement" />
      <Tabs w="full" id="rulesTabs" isFitted size="md">
        <TabList>
          {Object.keys(ruleParts).map(title => (
            <Tab key={title} fontSize={['2.8vw', 'md']}>
              {title}
            </Tab>
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
