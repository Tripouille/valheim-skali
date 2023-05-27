import React from 'react';
import { MdCancel, MdCheckCircle } from 'react-icons/md';
import Box from 'components/core/Containers/Box';
import { VStack } from 'components/core/Containers/Stack';
import IconList from 'components/core/DataDisplay/IconList';
import Heading from 'components/core/Typography/Heading';

const invalidRules = [
  `Vous cherchez à développer ou améliorer votre partie perso ou votre serveur.`,
  `Vous n’avez pas au moins 16Go de RAM (désolé).`,
  `Vous voulez jouer "rapidement" et "comme bon vous semble". Notre serveur est assez structuré.`,
  `Vous cherchez du PvP débridé. Ici le consentement est roi, quelles que soient les formes d’interactions entre joueurs (PvP, commerce, base etc.)`,
  `Vous cherchez du 100% RP. On aime beaucoup ça, mais on n’oblige personne à rien pour le RP.`,
];

const validRules = [
  `Une belle communauté, active dans le jeu (10 à 15 joueurs différents par jour).`,
  `Beaucoup de contenu supplémentaire intégré et équilibré pour prolonger le jeu (+ de constructions, monstres, artisanats, mécaniques de jeu, quêtes RP, PNJs)`,
  `Des événements réguliers organisés par les joueurs et les admins.`,
];

const ShortVersion: React.FC = () => (
  <VStack align="left" spacing="5">
    <Box>
      <Heading as="h3" size="l" pb="2">
        Avant toute chose, ce serveur n’est PAS pour vous si :
      </Heading>
      <IconList list={invalidRules} icon={MdCancel} iconColor="red.400" />
    </Box>
    <Box>
      <Heading as="h3" size="l" pb="2">
        Ceci étant dit, vous êtes peut-être au bon endroit, si vous cherchez un serveur avec :
      </Heading>
      <IconList list={validRules} icon={MdCheckCircle} iconColor="green.400" />
    </Box>
  </VStack>
);

export default ShortVersion;
