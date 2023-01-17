import React from 'react';
import { VStack } from 'components/core/Containers/Stack';
import IconList from 'components/core/DataDisplay/IconList';
import Heading from 'components/core/Typography/Heading';
import Text from 'components/core/Typography/Text';

const DiscordRules: React.FC = () => (
  <>
    <VStack align="start" mb="8">
      <Heading size="l">Comment ne pas s’attirer les foudres des modos :</Heading>
      <Text>
        {
          "Lorsqu’une situation problématique se présente, c'est à l’équipe d’administration de la gérer. Si les joueurs peuvent l’apaiser, c’est génial, mais ce n’est pas à eux de faire justice par eux-mêmes (sinon c’est l’escalade)."
        }
      </Text>
      <Text>
        {
          "Le problème, c'est qu’on a autre chose à faire et que… le Valhabba se veut gentil et bienfaisant, mais n’est pas une démocratie. La façon la plus simple de régler un problème, reste le ban simple et expéditif. C’est moche, mais notre vie IRL et la gestion du serveur ne nous permettent pas de débattre trois heures dès qu’un comportement louche apparait."
        }
      </Text>
    </VStack>
    <Heading size="l" mb="5">
      Heureusement, on peut facilement éviter ça en suivant ces règles :
    </Heading>
    <IconList
      list={[
        'Soyez respectueux et utilisez votre tête, dans 95% ça suffira (mais lisez quand même la suite !).',
        'Évitez le spam et le flood ! [Le spam et le flood consistent à monopoliser seul ou à plusieurs un canal par des messages sans réel intérêt pour les autres joueurs]',
        'Le troll, harcèlement ou tout comportement blessant sera banni (dans le doute, ce sera un ban si ça se répète).',
        'Racisme, xénophobie, homophobie, sexisme ou tout type de discrimination sera banni.',
        'Évitez les sujets politiques, religieux et simplement les sujets sensibles. Notre communauté est très variée et vous ne savez pas qui vous risquez de blesser.',
        'Ne partagez pas de lien ou information politiquement incorrect (contenu explicite, NSFW, etc.) ! C’est un serveur de jeu, pas une tribune d’opinions.',
        'La pub sur le serveur est interdite ! Sauf dans le salon discord dédié (un message par semaine max).',
        'Tout partage d’informations personnelles et de votre responsabilité. L’équpe admin du Valhabba déconseille de le faire sous n’importe quelle forme.',
        'Le stream est autorisé tant qu’il est consensuel. Voir les détails un peu plus loin.',
        'Évidemment, le piratage sera banni ! Toute tentative, action de type pirate sera banni et entraînera votre inscription sur les listes noires des serveurs Valheim (et autres).',
      ]}
    />
  </>
);

export default DiscordRules;
