import React from 'react';
import { Accordion } from '@chakra-ui/react';
import { MdCircle } from 'react-icons/md';
import CustomAccordionItem from '@packages/components/core/CustomAccordionItem';
import RulesList from '../RulesList';

const forbidden = [
  `Se cacher, ou de cacher sa base, derrière une muraille de terre surélevée, derrière un fossé, derrière des murs d’arbres ou derrière une construction boguée et invulnérable.`,
  `Se connecter avec d'autres mods que ceux de notre pack de mods, utiliser des logiciels annexes au jeu pour en altérer le fonctionnement, tenter d'utiliser la console du jeu, tenter d'obtenir la "seed" du serveur.`,
  `Faire une base possédant plus de 3 balises, avoir plus de trois avant postes balisés.`,
  `Privatiser et organiser les alentours d’une zone d’apparition automatique de monstres (les spawners). Par exemple un nid à Naingris, une pile d'ossements invoquant des Squelettes, un tas de pourriture invoquant des Draugrs, une fontaine de feu invoquant des Surtlings.`,
  `Construire à proximité (100 mètres) d’un lieu utilisable par les autres joueurs. Par exemple une chambre funéraire, une cave de troll, une crypte, une zone d’invocation de déchus.
La seule exception a cette règle concerne les rûches qui sont toutes invulnérables, publiques et disséminées dans la nature. Vous pouvez construire a proximité de l'une d'entre elle, mais en la laissant accessible à tous et en la laissant en dehors de toutes balises. `,
  `Mettre des pièges à joueurs ailleurs que dans votre base principalle ou utilisant des portails. En revanche, en installer dans votre base ne pose pas problème, tant qu’ils ne vous fournissent pas une défense absolue contre les monstres, et que vous ne séquestrez pas un joueur contre son gré.`,
  `Avoir systématiquement recours aux monstres d’un biome pour tuer ceux d’un autre.`,
];

const toAvoid = [
  `Faire une construction n’ayant pas de sens physique, ou étant trop étrange pour une époque viking.`,
  `Bloquer un canal où des bateaux pourraient vouloir circuler`,
  `Laisser traîner des portails sans un minimum de construction autour, faites au moins 3 murs, une porte et un toit.`,
  `Faire un potager ou une zone d’artisanat organisée de manière purement industrielle. Il y a des manières de s’organiser de manière efficace ET au moins un peu viking.`,
  `Toujours compter sur les monstres d’un biome pour tuer ceux d’un autre. Parfois vous avez peu de choix et il en va de votre survie, mais n’en faites pas une de vos stratégies de jeu.`,
];

const appreciated = [
  `Faire une grande base RP et magnifiquement décorée. Les bases ci-dessous respectent toutes la limite des 3 balises et des 9500 instances, et pourtant elles sont de belles tailles.`,
  `Faire de belles infrastructures publiques. Attention, par contre, à ne pas trop manger dans les instances d’une zone. Par exemple un pont permettant d’enjamber un canal tout en laissant passer les navires !`,
  `Prévenir le propriétaire d’une tombe quand on en trouve une. Sans y toucher ou l’ouvrir bien sûr. Peut-être a-t-il du mal à y retourner ou peut-être vous dira-t-il de vous servir pour retirer la tombe de notre monde.`,
  `Demander à son collègue qui vient de mourir s’il souhaite qu’on lui rapporte certains éléments de sa tombe afin de faciliter son retour (une cape qui protège du froid par exemple). Attention au mélange d’inventaire. Devons-nous aussi rappeler qu’il est interdit d’ouvrir ou de regarder une tombe sans l’accord du propriétaire ?!`,
];

const advice = [
  `L’île de départ ne possède que quelques chambres funéraires. Mieux vaut commercer ou aller voir plus loin pour faire une fonderie et un four à charbon. 
Par ailleurs il paraîtrait qu'un gué au Nord-Est permettrait de quitter l'île de départ si vous êtes prêt à nager une vingtaine de mètres`,
  `De plus en plus de services sont proposés par les joueurs dans le village communal : forge, miellerie, taverne, centre de mercenaire, bureau d’architecte, gîte etc. N’hésitez pas à en contacter les propriétaires et à demander leur service. Ça prendra toujours un peu de temps, car il vous faudra vous coordonner, mais ça sera toujours sympathique à faire. 🙂`,
  `Chaque semaine plusieurs nouveaux joueurs nous rejoignent. Si vous cherchez des compagnons de route, n’hésitez pas à le faire savoir sur le discord.`,
  `Avancer à votre rythme, tranquillement ou à fond, mais sachez que notre serveur est pensé et moddé pour augmenter la difficulté et prolonger l’expérience de jeu. Ne vous attendez pas à finir en une semaine.`,
  `Si vous voyez un monstre qui n’est pas présent dans le jeu de base soyez très prudent !
[sauf pour les papillons, les papillons, c’est nos amis <(°___°)> ]`,
  `Si vous êtes arachnophobe, n’allez PAS dans les terres brumeuses, vraiment.`,
  `On apprécie BEAUCOUP les joueurs RP sur notre serveur, mais rien ne vous y oblige. Un conseil, essayez un peu et trouvez le degré de RP qui vous amuse. 🙂`,
  `N’allez pas dans les zones 4 ou 5 seul. Elles sont faites pour être un enfer pour le joueur solo, et n’être abordable que par une petite équipe (3 à 4 vikings).`,
  `Si vous êtes arachnophobe, n’allez PAS dans les terres brumeuses, vraiment, j’insiste.`,
];

const GameGuides: React.FC = () => (
  <Accordion defaultIndex={[0, 1, 2, 3]} allowMultiple>
    <CustomAccordionItem title="Exemples de comportements strictement interdits :">
      <RulesList list={forbidden} icon={MdCircle} iconColor="red.400" />
    </CustomAccordionItem>
    <CustomAccordionItem title="Exemples de comportements peu appréciés, mais pas strictement interdits :">
      <RulesList list={toAvoid} icon={MdCircle} iconColor="orange.400" />
    </CustomAccordionItem>
    <CustomAccordionItem title="Exemples de comportements tout à fait appréciés :">
      <RulesList list={appreciated} icon={MdCircle} iconColor="green.400" />
    </CustomAccordionItem>
    <CustomAccordionItem title="Conseils">
      <RulesList list={advice} icon={MdCircle} iconColor="blue.400" />
    </CustomAccordionItem>
  </Accordion>
);

export default GameGuides;
