import React from 'react';
import { Accordion, Heading } from '@chakra-ui/react';
import CustomText from '@skali/components/CustomText';
import CustomAccordionItem from '@skali/components/CustomAccordionItem';
import InstanceRules from './InstanceRules';
import StreamerRules from './StreamerRules';

const gameRulesParts = [
  {
    title: '“Toute action PvP est interdite, sauf quand elle est consensuelle”',
    subtitle: '[action PvP = action d’un joueur à l’encontre d’un autre joueur]',
    content: (
      <CustomText
        paragraphs={[
          `Vis-à-vis des joueurs : 
nous ne sommes PAS un serveur où on combat n’importe qui n’importe comment. Si un joueur ne souhaite pas combattre ou interagir avec vous, c’est son droit, vous devez le respecter. Vous avez néanmoins la possibilité de faire des duels ou des guerres avec d’autres joueurs, si vous avez leur accord AVANT. Dans le cas d’une guerre, vous devez même avoir l’accord préalable de l’équipe d’administration.`,
          `Vis-a-vis des constructions : 
il est strictement interdit de voler, piéger ou détruire les bases des autres joueurs, par vos propres moyens ou par l’intermédiaire d’un monstre ou d’un événement. De même, il est interdit d’ouvrir la tombe d’un autre joueur, même “juste pour voir”.`,
          `La seule dérogation possible à ces règles consiste à obtenir une autorisation claire et non ambigüe de l’autre joueur. Un joueur peut vous autoriser, par exemple, certaines interactions avec sa tombe. Cette dérogation reste à réitérer systématiquement.`,
          `Enfin, il est également interdit de construire autour de lieux communs tels que les zones de boss, les chambres funéraires, les cryptes etc. Puisque cela en générait l’usage par les autres joueurs.`,
        ]}
      />
    ),
  },
  {
    title: '“Tout gain de ressources sans effort est interdit”',
    content: (
      <CustomText
        paragraphs={[
          `Vous êtes ici, dans le dixième royaume pour prouver votre valeur à Odin, tricher ne vous permettra pas d’atteindre ce but. Exploiter les mécaniques du jeu non plus. Au Valhabba il est strictement interdit de mettre en place des conditions vous permettant d’obtenir des ressources sans effort. Cela couvre, par exemple, les fermes automatiques (des constructions qui tuent les monstres automatiquement à leur apparition), et les abris d’observation en bordure de biomes (qui vous permettraient d’observer passivement la guerre que les monstres se livrent, pour récupérer ensuite les objets).`,
          `Plus généralement, si vous trouvez une “astuce”, demandez-vous et demandez-nous, si elle ne vous donne pas un avantage démesuré.`,
        ]}
      />
    ),
  },
  {
    title: '“Respectez le terrain et les FPS des autres joueurs”',
    content: <InstanceRules />,
  },
  {
    title: '“Tout abus d’une mécanique du jeu pour obtenir un avantage abusif est interdite”',
    subtitle:
      '[le terme “abusif” étant subjectif il sera soumis exclusivement à l’appréciation de l’équipe d’administration, si vous avez un doute, demandez !]',
    content: (
      <CustomText
        paragraphs={[
          `Rappelez-vous que vous êtes là pour convaincre Odin, pas Loky ! Nous ne forçons pas les joueurs à adopter un style de jeu très précis … tant que ceux-ci restent dans le style viking de la communauté (et donc de ce qu’autorise l’équipe d’administration). Ce n’est PAS parce que toutes les “astuces” possibles ne sont pas énumérées ici, qu’elles sont automatiquement autorisées. Dans le doute,  demandez à la communauté et demandez à l’équipe d’administration.`,
          `Par exemple, il est strictement interdit de se cacher, ou de cacher sa base, derrière une muraille de terre surélevée, derrière un fossé, ou derrière une construction boguée et invulnérable. En revanche si vous voulez construire en hauteur pas de problème ! La différence est que dans un cas, c’est une défense qui abuse d’une limitation du jeu, dans l’autre, c’est une défense “réaliste”. Dans le doute, demandez !`,
        ]}
      />
    ),
  },
  {
    title: '“Désamorcez les conflits plutôt que de les alimenter”',
    content: (
      <CustomText
        paragraphs={[
          `Notre communauté est variée et Valheim peut être un jeu long, nous l’avons même moddé pour en prolonger encore plus la durée. Ce qui veut dire que vous risquez de passer pas mal de temps avec plein de gens différents avec des caractères et des manières de s’exprimer différentes. Ça permet clairement de passer du bon temps, mais ça amène à se frotter rapidement à la sensibilité des autres joueurs, surtout quand la frustration s’y mêle. Contre ça, il n’y pas de recette magique, si ce n’est d’être compréhensif et bien intentionné.`,
          `Les disputes RP sont tout à fait autorisées et sont les bienvenues, ça met de l’ambiance. [RP = Role Play, ça veut simplement dire que tu agis et t’exprime comme le personnage qu’est censé être ton viking, et non comme un joueur gérant ce personnage].
Par contre, dès lors que vos échanges (RP ou non) affectent l’humeur de l’autre, il y a un problème, et il vous incombe de le résoudre. `,
          `Si vous mettez mal à l’aise un autre joueur, sans vous en rendre compte, on pourra vous le pardonner. Par contre, si vous réitérez ce comportement, malgré le fait qu’il vous ait déjà signalé sa gêne, là vous serez clairement en tort.`,
        ]}
      />
    ),
  },
  {
    title: "”La zone de départ (l'intérieur du premier cercle) n’est là … que pour votre départ”",
    content: (
      <CustomText
        paragraphs={[
          `Tout le monde démarre au même endroit, mais si tout le monde y reste, plus personne ne pourra y vivre et s’y développer. Après dix jours sur le serveur, ou après que tu aies obtenu une armure de cuivre améliorée trois fois, tu dois quitter la zone de départ (l'intérieur du premier cercle). Ce n’est donc pas un endroit pour t’y établir définitivement.`,
          `Tu pourras bien sûr y revenir de temps en temps, mais juste pour y interagir avec les autres joueurs (dans le village communautaire par exemple), pas pour y récolter des ressources dans la nature.`,
          `Si vous ne trouvez pas de quoi vous faire une embarcation, n’hésitez pas à demander de l’aide aux autres vikings. Une rumeur court même, disant qu’une série d’îlots te permettrait aussi d’atteindre au moins 3 autres îles, si tu es prêt à nager un peu.`,
        ]}
      />
    ),
  },
  {
    title: '“Ton nom doit bien être ton nom”',
    content: (
      <CustomText
        paragraphs={[
          `Votre pseudo sur le serveur Discord doit correspondre à votre nom de viking sur le serveur de jeu. Vous pouvez facilement modifier ce pseudo en faisant un clic droit sur votre avatar, dans la colonne de droite de la fenêtre Discord. Cela ne changera votre nom que sur notre serveur Discord et nulle part ailleurs.`,
          `Il va de soi qu’il est interdit de créer un personnage ayant volontairement le même nom qu’un autre joueur.`,
          `Si tu viens dans le jeu avec d’autres personnages ils doivent avoir un nom que l’on pourra facilement associer à ton pseudo Discord.`,
          `Par exemple : le pseudo discord d’un des admins est “Gyda Selordotir” (Gyda fille de Selord en vieux Norois), c’est également le nom de son personnage joueur principal.  Mais vous pourrez également rencontrer : un personnage admin s’appelant “Selord”, un personnage RP s’appelant “Gyda RP” et un personnage pour les événements pvp s’appelant “Gydo”. Tous ces personnages appartiennent à une seule et même personne et peuvent être facilement reliés à son nom Discord “Gyda Selordotir”.`,
          `Enfin, si vous rejoignez un clan, vous pourrez l’afficher avant votre pseudo, si vous le souhaitez. De même, si vous remplissez les critères pour devenir aventurier réputé, vous devrez mettre votre surnom dans votre nom.`,
          `En voici la codification : [nom de clan] nom de viking, Titre d’aventurier réputé.
Par exemple : “[Loky] Gyda Selordotir” si le joueur fait partie du clan des Lokysons, “Gyda Selordotir, la chasseuse” si tel est son titre d'aventurier réputé ou encore “[Loky] Gyda Selordotir, la chasseuse” si le joueur fait partie du clan des Lokysons et est aventurier réputé.`,
        ]}
      />
    ),
  },
  {
    title: 'Règles pour les streamers',
    content: <StreamerRules />,
  },
];

const GameRules: React.FC = () => (
  <>
    <Heading size="l" mb="5">
      Vous faites partie de toute une communauté, ne l’oubliez pas !
    </Heading>
    <Accordion defaultIndex={Array.from(Array(gameRulesParts.length).keys())} allowMultiple>
      {gameRulesParts.map(({ title, subtitle, content }, index) => (
        <CustomAccordionItem key={title} title={`${index + 1}. ${title}`} subtitle={subtitle}>
          {content}
        </CustomAccordionItem>
      ))}
    </Accordion>
  </>
);

export default GameRules;
