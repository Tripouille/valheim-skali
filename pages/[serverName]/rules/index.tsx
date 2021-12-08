import React from 'react';
import { Heading, VStack } from '@chakra-ui/layout';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Background from '@skali/components/Background';
import Preambule from '@skali/components/Preambule';

const RulesPage = () => (
  <Background>
    <VStack spacing="5" w="full">
      <Heading as="h1" size="xl">
        Règlement
      </Heading>
      <Tabs w="full">
        <TabList>
          <Tab>Préambule</Tab>
        </TabList>

        <TabPanels textAlign="justify">
          <TabPanel>
            <Preambule />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  </Background>
);

export default RulesPage;
