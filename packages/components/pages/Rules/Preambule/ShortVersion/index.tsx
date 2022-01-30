import React from 'react';
import { MdCancel, MdCheckCircle } from 'react-icons/md';
import Box from '@packages/components/core/Containers/Box';
import Heading from '@packages/components/core/Typography/Heading';
import { VStack } from '@packages/components/core/Containers/Stack';
import RulesList from '../../RulesList';

const invalidRules = [
  `Vous cherchez des conseils ou de l’aide pour votre partie perso. Ici on ne traite que de notre serveur.`,
  `Vous n’êtes pas prêt à passer du temps à lire nos règles et à passer un
  entretien vocal de 30 à 40 minutes. Si on arrive à avoir une communauté aussi
  chouette qu’elle l’est actuellement, c’est bien parce qu’on prévient qu’on ne
  convient pas à tout le monde. Pour l’entretien, on essaye de vous proposer une
  date le plus rapidement possible, mais ça peut parfois prendre quelques jours
  😕`,
  `Vous cherchez un serveur à fond dans le PvP. On apprécie en faire, mais chez
  nous, c’est assez réglementé (pas de PvP sauvage).`,
  `Vous cherchez juste à jouer rapidement et à votre sauce personnelle, sans
  avoir à prendre en compte les autres joueurs. Ici on ne souhaite pas imposer
  un style de jeu très strict, on cherche à favoriser les interactions et donc
  le respect des joueurs entre eux via le respect du règlement.`,
  `Vous cherchez un serveur à fond sur le RP. On adore et on encourage autant que
  possible le RP, mais il est ici optionnel. Si vous ne souhaitez pas jouer RP,
  pas de souci, respectez juste ceux qui le font. Si vous souhaitez jouer RP,
  génial, mais n’essayez pas d’imposer un style auprès des autres.`,
  `Vous souhaitez débarquer avec votre personnage déjà tout équipé.`,
];

const validRules = [
  `Avec une belle communauté, active dans le jeu (~une dizaine de joueurs tous
  les soirs, une quarantaine de joueurs différents par semaine) et sur Discord.`,
  `Du contenu supplémentaire pour le jeu (constructions, nourritures, armes, armures,
  monstres). Le tout en essayant de respecter l’esprit originel de Valheim (pas de
  magie ou d’enchantements déséquilibrant le jeu).`,
  `De la difficulté supplémentaire pour aller jusqu’au bout de nos ajouts`,
  `Des événements réguliers organisés par les joueurs et les admins.`,
];

const ShortVersion: React.FC = () => (
  <VStack align="left" spacing="5">
    <Box>
      <Heading as="h3" size="l" pb="2">
        Avant toute chose, ce serveur n’est PAS pour vous si :
      </Heading>
      <RulesList list={invalidRules} icon={MdCancel} iconColor="red.400" />
    </Box>
    <Box>
      <Heading as="h3" size="l" pb="2">
        Ceci étant dit, vous êtes peut-être au bon endroit, si vous cherchez un serveur :
      </Heading>
      <RulesList list={validRules} icon={MdCheckCircle} iconColor="green.400" />
    </Box>
  </VStack>
);

export default ShortVersion;
