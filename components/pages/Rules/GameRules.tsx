import React from 'react';
import Box from 'components/core/Containers/Box';
import { VStack } from 'components/core/Containers/Stack';
import IconList from 'components/core/DataDisplay/IconList';
import { Accordion, TitleAccordionItem } from 'components/core/Disclosure/Accordion';
import ExternalLink from 'components/core/Interactive/ExternalLink';
import Heading from 'components/core/Typography/Heading';
import Text from 'components/core/Typography/Text';
import { getRoute, NavRoute } from 'utils/routes';
import BasesRules from './GameRules/BasesRules';
import InstancesRules from './GameRules/InstancesRules';
import ModsRules from './GameRules/ModsRules';
import PvPRules from './GameRules/PvPRules';
import StreamingRules from './GameRules/StreamingRules';
import TerrainRules from './GameRules/TerrainRules';

const gameRulesParts = [
  { title: 'Mods', content: <ModsRules /> },
  { title: 'PvP', content: <PvPRules /> },
  { title: 'Les instances', content: <InstancesRules /> },
  { title: 'Modification de terrain', content: <TerrainRules /> },
  { title: 'Bases et multijoueur', content: <BasesRules /> },
  { title: 'Streaming', content: <StreamingRules /> },
];

const GameRules: React.FC = () => (
  <>
    <VStack align="start" spacing={6}>
      <Heading size="l">
        {'Vous faites partie de toute une communauté, jouez pour la préserver :)'}
      </Heading>
      <Box>
        <Heading size="l" mb={3}>
          En quelques points :
        </Heading>
        <IconList
          list={[
            'Pas de modifications des mods (retrait, ajout, modification, reconfiguration)',
            <Text key="pvp">
              PvP interdit sans consentement (PvP = <strong>toutes</strong> formes d’interactions
              directes ou pas, entre joueurs)
            </Text>,
            '9500 instances max par base',
            'Pas de modification de terrain hors de la base principale',
            'Pas d’exploitation abusive des mécaniques du jeu',
            'Politesse et bienveillance envers les autres joueurs <3',
            <ExternalLink key="wiki" href={getRoute(NavRoute.WIKI)} withIcon>
              N’oubliez pas le Wiki
            </ExternalLink>,
          ]}
        />
      </Box>
      <Accordion
        defaultIndex={Array.from(Array(gameRulesParts.length).keys())}
        allowMultiple
        width="full"
      >
        {gameRulesParts.map(({ title, content }, index) => (
          <TitleAccordionItem key={title} id={`game-rules-${index}`} title={title}>
            {content}
          </TitleAccordionItem>
        ))}
      </Accordion>
    </VStack>
  </>
);

export default GameRules;
