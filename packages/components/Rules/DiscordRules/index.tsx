import React from 'react';
import { Heading } from '@chakra-ui/layout';
import { FaArrowCircleRight } from 'react-icons/fa';
import RulesList from '../RulesList';

const discordRules = [
  'Soyez respectueux et utilisez votre tête, ainsi vous n’aurez pas à vous préoccuper du reste (mais lisez quand même la suite !).',
  'Le troll, harcèlement ou tout comportement visant à blesser autrui sera sanctionné.',
  'Racisme, homophobie, sexisme ou tout type de discrimination est strictement prohibé.',
  'Tout partage d’informations personnelles est de votre responsabilité. Nous ne l’encourageons, de toute évidence, pas.',
  'Ne pas partager aucun lien ou information "bizarre" (Contenu interdit/ Contenu sexuellement explicite/NSFW) ! Dans le doute, c’est l’équipe d’administration qui aura le dernier mot.',
  'La pub sur le serveur, est interdite ! À l’exception du contenu fait ou en rapport avec le serveur dans les salons dédiés (s’il y en a).',
  'Le stream est autorisé tant que vous avez la permission des joueurs que vous enregistrez. Voir les détails pour streamers un peu plus loin.',
  'Évidemment, le piratage est interdit ! Toute tentative, action de type pirate ou modifications des mods mènera à un ban immédiat et à votre inscription sur les listes noires des serveurs Valheim et autres jeux.',
  `Évitez le Spam et le flood ! Soyez mesurés, avant qu’on ne doive vous arrêter et vous jeter dans un cachot humide.
[Le spam et le flood consistent à monopoliser seul ou à plusieurs un canal par des messages sans réel intérêt pour les autres joueurs]`,
  'Nous avons de nombreux canaux de discussion. Veillez à poster vos messages dans les bons canaux, cela vous permettra d’être lu et évitera que vos messages soient supprimés par l’équipe d’administration.',
  'Évitez les sujets politiques et / ou religieux. Ces discussions sensibles mènent à des discordes qui ne sont pas souhaitables sur un serveur communautaire.',
  ' Lorsqu’une situation problématique et ou conflictuelle se présente, l’équipe d’administration garde la libre interprétation de la gravité des faits afin d’en décider la sanction. De surcroît, le staff garde la liberté de sanctionner tout comportement inapproprié, insultant ou dégradant, même si ce dernier respecte les règles énoncées.',
];

const DiscordRules: React.FC = () => (
  <>
    <Heading size="l" mb="5">
      Tu es sur internet, sois-y un bon exemple !
    </Heading>
    <RulesList list={discordRules} icon={FaArrowCircleRight} iconColor="blue.200" />
  </>
);

export default DiscordRules;
