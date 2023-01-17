import React from 'react';
import { VStack } from 'components/core/Containers/Stack';
import Text from 'components/core/Typography/Text';

const LongVersion: React.FC = () => (
  <VStack align="start">
    <Text>
      Bienvenue sur le site du serveur Valhabba, vous trouverez ici nos règles (règles “Discord”,
      règles “En Jeu”), quelques guides de jeu et SURTOUT notre wiki.
    </Text>

    <Text>
      Notre règlement suit un principe simple :{' '}
      <strong>chacun doit laisser de la place aux autres</strong>.
    </Text>

    <Text>
      Valheim étant plutôt prévu pour une dizaine de joueurs que pour une centaine, ça demande
      forcément quelques adaptations. Elles sont décrites dans notre règlement.
    </Text>

    <Text>
      Si cela vous convient, alors vous êtes le/la bienvenu/e ! Pour nous rejoindre, il faudra faire
      une candidature sur ce site, répondre à un questionnaire sur les règlements et les guides de
      jeu, puis venir papoter 5 à 10 minutes avec un de nos membres sur discord.
    </Text>

    <Text>
      Un dernier point, mettre en place ce serveur et cette communauté demande beaucoup d’effort et
      de travail. Tout ceci est fait bénévolement par l’équipe d’administration et est souvent très
      frustrant sur le plan technique et sur le plan social. Merci d’être compréhensif et de
      respecter la communauté et son travail 🙂
    </Text>
  </VStack>
);

export default LongVersion;
