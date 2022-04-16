import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'components/core/Disclosure/Tabs';
import { VStack } from 'components/core/Containers/Stack';
import PageTitle from 'components/core/Typography/PageTitle';
import Background from 'components/core/Containers/Background';
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
      <Tabs w="full" id="rulesTabs" isFitted size="md" colorScheme="twitter">
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
