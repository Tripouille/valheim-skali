import React from 'react';
import Image from 'next/image';
import { Accordion, Box, Heading, Flex, Icon } from '@chakra-ui/react';
import { MdComputer } from 'react-icons/md';
import { GiPig, GiVillage, GiWarPick } from 'react-icons/gi';
import RuleAccordionItem from './RuleAccordionItem';
import RuleMultipleText from './RuleMultipleText';
import ItemIcon from './RuleAccordionItem/ItemIcon';

const pvpRule = [
  `Vis-à-vis des joueurs : 
nous ne sommes PAS un serveur où on combat n’importe qui n’importe comment. Si un joueur ne souhaite pas combattre ou interagir avec vous, c’est son droit, vous devez le respecter. Vous avez néanmoins la possibilité de faire des duels ou des guerres avec d’autres joueurs, si vous avez leur accord AVANT. Dans le cas d’une guerre, vous devez même avoir l’accord préalable de l’équipe d’administration.`,
  `Vis-a-vis des constructions : 
il est strictement interdit de voler, piéger ou détruire les bases des autres joueurs, par vos propres moyens ou par l’intermédiaire d’un monstre ou d’un événement. De même, il est interdit d’ouvrir la tombe d’un autre joueur, même “juste pour voir”.`,
  `La seule dérogation possible à ces règles consiste à obtenir une autorisation claire et non ambigüe de l’autre joueur. Un joueur peut vous autoriser, par exemple, certaines interactions avec sa tombe. Cette dérogation reste à réitérer systématiquement.`,
  `Enfin, il est également interdit de construire autour de lieux communs tels que les zones de boss, les chambres funéraires, les cryptes etc. Puisque cela en générait l’usage par les autres joueurs.`,
];

const effortRule = [
  `Vous êtes ici, dans le dixième royaume pour prouver votre valeur à Odin, tricher ne vous permettra pas d’atteindre ce but. Exploiter les mécaniques du jeu non plus. Au Valhabba il est strictement interdit de mettre en place des conditions vous permettant d’obtenir des ressources sans effort. Cela couvre, par exemple, les fermes automatiques (des constructions qui tuent les monstres automatiquement à leur apparition), et les abris d’observation en bordure de biomes (qui vous permettraient d’observer passivement la guerre que les monstres se livrent, pour récupérer ensuite les objets).`,
  `Plus généralement, si vous trouvez une “astuce”, demandez-vous et demandez-nous, si elle ne vous donne pas un avantage démesuré.`,
];

const instanceRule = {
  introduction: [
    `Ce serveur est un monde multijoueur ... et le jeu n’est pas encore complètement optimisé pour ça.`,
    `Quand vous modifiez un endroit de notre monde, en y faisant une base par exemple, tous les joueurs qui passeront par là verront et subiront cette modification. Leur ordinateur devra recevoir l’information qu’un objet a été placé, que le terrain a été modifié (creusé, surélevé, aplati) ou encore qu’un troupeau vit ici. Puis leur ordinateur devra calculer tous les impacts que cette information a sur le reste de l’environnement. Ce qui entraîne rapidement des ralentissements du jeu, pour vous comme pour les autres.`,
    `Pour mitiger ça, nous avons donc des règles concernant :`,
  ],
  categories: [
    {
      title: 'Les instances',
      icon: MdComputer,
      iconColor: 'teal.100',
      text: [
        `Pour mesurer le risque de ralentissements, il suffit de connaître le nombre d’éléments que votre ordinateur doit prendre en compte autour de vous. Pour cela, il suffit d’appuyer sur F2 en jeu pour ouvrir un panneau d’information et d’y lire la ligne ’instances’. Dans une prairie, il sera typiquement entre 3000 et 5000.`,
        `Au Valhabba, quelle que soit votre installation, vous devez rester en dessous de 9500 instances. Au-delà de ça, l’équipe d’administration viendra “retirer” arbitrairement vos installations pour ramener ce chiffre à 9500.`,
        `Le terraformage de confort est autorisé dans l'enceinte de sa base principale uniquement.
				Il est interdit d'ériger des murailles de terre ou des tranchées contre les monstres. Vous êtes des vikings nom d'Odin !`,
      ],
      image: {
        src: 'https://cdn.discordapp.com/attachments/879308268034482176/880074813027278868/znBWtv2T9-oQtxWHbxpNuyZePd6R8suR2axEDgXkAnyfzueO-tSDtYY-MWTJnqjGazbfM9U4_yZ2q0b3ZQdLrB2P_FrqgCP4yjpr.png',
      },
    },
    {
      title: 'Les bêtes',
      icon: GiPig,
      iconColor: 'pink.300',
      text: [
        `Les animaux apprivoisés entraînant également des calculs supplémentaires, leur nombre est limité. Cela nous permet aussi de réguler l’économie du serveur. Tout joueur ou regroupement de joueurs jouant ensemble, ne peut avoir, quel que soit l’emplacement de ses bêtes, qu’un maximum de 40 têtes, réparties en :`,
        `- 15 sangliers,`,
        `- 10 loups,`,
        `- 10 ours,`,
        `- 5 lox.`,
      ],
    },
    {
      title: 'La taille des bases',
      icon: GiVillage,
      iconColor: 'orange.600',
      text: [
        `Dans la même idée, avoir une base géante gênera immanquablement les autres joueurs, c’est donc interdit.`,
        `La taille des bases est limitée à 3 balises (de 32 mètres de rayon chacune !) et seuls 3 avant-postes peuvent être balisés, avec une et une seule balise chacun. Cela concerne chaque joueur ou chaque regroupement de joueurs ; se mettre à plusieurs ne donne PAS plus de droits terriens.`,
        `De même, limitez la taille de vos jardins à maximum 75 m².`,
      ],
    },
    {
      title: 'Le minage',
      icon: GiWarPick,
      iconColor: 'silver',
      text: [
        `Enfin, comme les  modifications du terrain comptent également comme des instances°, le minage sauvage contribue aussi à ralentir le jeu des autres joueurs, en plus de rendre la carte hideuse.`,
        ` Au Valhabba, il est donc interdit de miner afin de récolter le minerai qui se trouve sous vos pieds, contentez-vous de celui qu’il y a en surface. La limite n'est PAS à -15 mètres ni à -5 mètres, elle est à 0 mètre.`,
        `La seule exception étant pour l’argent. Dans ce cas, nous vous demandons de réduire la taille du minage au strict minimum.`,
      ],
      notes: [
        `(° : reboucher votre trou ne fera même qu’amplifier le problème, car le jeu chargera votre trou, puis chargera son rebouchement.) `,
      ],
      image: {
        legend: 'Voici typiquement ce qu’on veut éviter !',
        src: 'https://cdn.discordapp.com/attachments/879308268034482176/880075448187498496/7SbpNZOU8PFVmknCFk_g45ENGtjFaoopyVdENgivvJi2V3nXG4IOrT2YTgm6qCPth7EgKdtZqXz-P_LZNnXzPUMAHLZhvxUQ8AEl.png',
      },
    },
  ],
};

const cheatRule = [
  `Rappelez-vous que vous êtes là pour convaincre Odin, pas Loky ! Nous ne forçons pas les joueurs à adopter un style de jeu très précis … tant que ceux-ci restent dans le style viking de la communauté (et donc de ce qu’autorise l’équipe d’administration). Ce n’est PAS parce que toutes les “astuces” possibles ne sont pas énumérées ici, qu’elles sont automatiquement autorisées. Dans le doute,  demandez à la communauté et demandez à l’équipe d’administration.`,
  `Par exemple, il est strictement interdit de se cacher, ou de cacher sa base, derrière une muraille de terre surélevée, derrière un fossé, ou derrière une construction boguée et invulnérable. En revanche si vous voulez construire en hauteur pas de problème ! La différence est que dans un cas, c’est une défense qui abuse d’une limitation du jeu, dans l’autre, c’est une défense “réaliste”. Dans le doute, demandez !`,
];

const conflictRule = [
  `Notre communauté est variée et Valheim peut être un jeu long, nous l’avons même moddé pour en prolonger encore plus la durée. Ce qui veut dire que vous risquez de passer pas mal de temps avec plein de gens différents avec des caractères et des manières de s’exprimer différentes. Ça permet clairement de passer du bon temps, mais ça amène à se frotter rapidement à la sensibilité des autres joueurs, surtout quand la frustration s’y mêle. Contre ça, il n’y pas de recette magique, si ce n’est d’être compréhensif et bien intentionné.`,
  `Les disputes RP sont tout à fait autorisées et sont les bienvenues, ça met de l’ambiance. [RP = Role Play, ça veut simplement dire que tu agis et t’exprime comme le personnage qu’est censé être ton viking, et non comme un joueur gérant ce personnage].
Par contre, dès lors que vos échanges (RP ou non) affectent l’humeur de l’autre, il y a un problème, et il vous incombe de le résoudre. `,
  `Si vous mettez mal à l’aise un autre joueur, sans vous en rendre compte, on pourra vous le pardonner. Par contre, si vous réitérez ce comportement, malgré le fait qu’il vous ait déjà signalé sa gêne, là vous serez clairement en tort.`,
];

const startRule = [
  `Tout le monde démarre au même endroit, mais si tout le monde y reste, plus personne ne pourra y vivre et s’y développer. Après dix jours sur le serveur, ou après que tu aies obtenu une armure de cuivre améliorée trois fois, tu dois quitter la zone de départ (l'intérieur du premier cercle). Ce n’est donc pas un endroit pour t’y établir définitivement.`,
  `Tu pourras bien sûr y revenir de temps en temps, mais juste pour y interagir avec les autres joueurs (dans le village communautaire par exemple), pas pour y récolter des ressources dans la nature.`,
  `Si vous ne trouvez pas de quoi vous faire une embarcation, n’hésitez pas à demander de l’aide aux autres vikings. Une rumeur court même, disant qu’une série d’îlots te permettrait aussi d’atteindre au moins 3 autres îles, si tu es prêt à nager un peu.`,
];

const nameRule = [
  `Votre pseudo sur le serveur Discord doit correspondre à votre nom de viking sur le serveur de jeu. Vous pouvez facilement modifier ce pseudo en faisant un clic droit sur votre avatar, dans la colonne de droite de la fenêtre Discord. Cela ne changera votre nom que sur notre serveur Discord et nulle part ailleurs.`,
  `Il va de soi qu’il est interdit de créer un personnage ayant volontairement le même nom qu’un autre joueur.`,
  `Si tu viens dans le jeu avec d’autres personnages ils doivent avoir un nom que l’on pourra facilement associer à ton pseudo Discord.`,
  `Par exemple : le pseudo discord d’un des admins est “Gyda Selordotir” (Gyda fille de Selord en vieux Norois), c’est également le nom de son personnage joueur principal.  Mais vous pourrez également rencontrer : un personnage admin s’appelant “Selord”, un personnage RP s’appelant “Gyda RP” et un personnage pour les événements pvp s’appelant “Gydo”. Tous ces personnages appartiennent à une seule et même personne et peuvent être facilement reliés à son nom Discord “Gyda Selordotir”.`,
  `Enfin, si vous rejoignez un clan, vous pourrez l’afficher avant votre pseudo, si vous le souhaitez. De même, si vous remplissez les critères pour devenir aventurier réputé, vous devrez mettre votre surnom dans votre nom.`,
  `En voici la codification : [nom de clan] nom de viking, Titre d’aventurier réputé.
Par exemple : “[Loky] Gyda Selordotir” si le joueur fait partie du clan des Lokysons, “Gyda Selordotir, la chasseuse” si tel est son titre d'aventurier réputé ou encore “[Loky] Gyda Selordotir, la chasseuse” si le joueur fait partie du clan des Lokysons et est aventurier réputé.`,
];

const streamerRule = {
  introduction: [
    `La seule condition que nous mettons aux streams en direct est ... LE CONSENTEMENT DE CEUX QUI SERONT ENREGISTRÉS.`,
    `Concrètement si vous souhaitez streamer, ça se passe comme ça : vous streamez quand vous voulez, et où vous voulez, dès lors que :`,
  ],
  categories: [
    {
      title: `1/ Tous les joueurs qui apparaissent à votre écran vous ont donné leur accord.`,
      text: [
        `Si vous tombez sur quelqu'un de manière inattendue vous devez lui mettre dans le chat du jeu un message du style “Je streame en direct mon jeu, est ce que ça te dérange d'y apparaître ?”. À vous de trouver votre propre formule, mais elle doit dire clairement et sans ambigüité que vous enregistrez.`,
        `Si la personne vous dit oui, nickel, amusez - vous 🤗 Si elle vous dit non, c’est à vous de vous éloigner du joueur afin qu'il n'apparaisse plus dans votre stream.`,
      ],
    },
    {
      title: `2/ Si vous êtes souhaitez streamer vos échanges vocaux dans notre discord, vous devez impérativement être dans le canal vocal "Stream en direct"`,
      text: [
        `Lorsqu’une personne vous y rejoint, vous devez la prévenir que vous enregistrez. En revanche, si ça ne plaît pas à celle-ci, c'est à elle de quitter le salon vocal.`,
        `De cette manière, ceux qui vous rejoignent seront doublement prévenus que leur voix est enregistrée (le nom du salon + votre annonce à chaque arrivée).`,
      ],
    },
    {
      title: `3/ Quand vous streamez, changez votre pseudo discord et accolez-lui le préfixe :`,
      text: [
        `Afin d'être encore plus clair vis-à-vis des autres,  changez votre pseudo Discord et accolez-lui le préfix :  [stream : 🟢 ] (clic droit, changez le pseudo etc).`,
        `Exemple : si l’admin Gyda Selordotyr voulait streamer, il passerait du pseudo, “Gyda Selordotyr”, à  “[stream : 🟢] Gyda Selordotyr”.`,
      ],
    },
    {
      title: `4/ Vous ne montrez pas le contenu du discord ni votre écran de connexion (et donc de l'IP du serveur).`,
      text: [],
    },
  ],
};

const GameRules: React.FC = () => (
  <>
    <Heading size="l" mb="5">
      Vous faites partie de toute une communauté, ne l’oubliez pas !
    </Heading>
    <Accordion defaultIndex={[0, 1, 2, 3, 4, 5, 6, 7, 8]} allowMultiple>
      <RuleAccordionItem
        index="1"
        title="“Toute action PvP est interdite, sauf quand elle est consensuelle”"
        subtitle="[action PvP = action d’un joueur à l’encontre d’un autre joueur]">
        <RuleMultipleText content={pvpRule} />
      </RuleAccordionItem>
      <RuleAccordionItem index="2" title="“Tout gain de ressources sans efforts est interdit”">
        <RuleMultipleText content={effortRule} />
      </RuleAccordionItem>
      <RuleAccordionItem index="3" title="“Respectez le terrain et les FPS des autres joueurs”">
        <RuleMultipleText content={instanceRule.introduction} />
        {instanceRule.categories.map(({ icon, iconColor, title, text, notes, image }) => (
          <Box key={title} mb="4">
            <Heading size="s" display="flex" alignItems="center" color={iconColor}>
              <Icon as={icon} w="2em" h="2em" me="3" color={iconColor} />
              {title}
            </Heading>
            <RuleMultipleText content={text} />
            {notes && <RuleMultipleText content={notes} fontSize="xs" />}
            {image && (
              <figure>
                {image.legend && <figcaption>{image.legend}</figcaption>}
                <Box height="200px" maxWidth="550px" position="relative" textAlign="left">
                  <Image src={image.src} layout="fill" objectFit="cover" objectPosition="top" />
                </Box>
              </figure>
            )}
          </Box>
        ))}
      </RuleAccordionItem>
      <RuleAccordionItem
        index="4"
        title="“Tout abus d’une mécanique du jeu pour obtenir un avantage abusif est interdite”"
        subtitle="[le terme “abusif” étant subjectif il sera soumis exclusivement à l’appréciation
                  de l’équipe d’administration, si vous avez un doute, demandez !]">
        <RuleMultipleText content={cheatRule} />
      </RuleAccordionItem>
      <RuleAccordionItem index="5" title="“Désamorcez les conflits plutôt que de les alimenter”">
        <RuleMultipleText content={conflictRule} />
      </RuleAccordionItem>
      <RuleAccordionItem
        index="6"
        title="”La zone de départ (l'intérieur du premier cercle) n’est là … que pour votre départ”">
        <RuleMultipleText content={startRule} />
      </RuleAccordionItem>
      <RuleAccordionItem index="7" title="“Ton nom doit bien être ton nom”">
        <RuleMultipleText content={nameRule} />
      </RuleAccordionItem>
      <RuleAccordionItem index="8" title="Règles pour les streamers">
        <RuleMultipleText content={streamerRule.introduction} />
        <Box mb="4">
          <Heading size="s" display="flex" alignItems="center">
            {streamerRule.categories[0].title}
          </Heading>
          <RuleMultipleText content={streamerRule.categories[0].text} />
        </Box>
        <Box mb="4">
          <Heading size="s" display="flex" alignItems="center">
            {streamerRule.categories[1].title}
          </Heading>
          <RuleMultipleText content={streamerRule.categories[1].text} />
        </Box>
        <Box mb="4">
          <Heading size="s" display="flex" alignItems="center">
            {streamerRule.categories[2].title}
            <Box as="span" bgColor="gray.800" ms="2" fontWeight="normal">
              [stream : 🟢]
            </Box>
          </Heading>
          <RuleMultipleText content={streamerRule.categories[2].text} />
        </Box>
        <Box mb="4">
          <Heading size="s" display="flex" alignItems="center">
            {streamerRule.categories[3].title}
          </Heading>
        </Box>
      </RuleAccordionItem>
    </Accordion>
    <h2>
      <Flex flex="1" textAlign="left" my="3">
        <Heading size="l">Donc pour résumer :</Heading>
      </Flex>
    </h2>
    <Flex mb="1">
      <ItemIcon>1</ItemIcon>Toute action PvP est interdite, sauf quand elle est consensuelle
    </Flex>
    <Flex mb="1">
      <ItemIcon>2</ItemIcon>Tout gain de ressources sans efforts est interdit
    </Flex>
    <Flex mb="1">
      <ItemIcon>3</ItemIcon>Respectez le terrain et les FPS des autres joueurs
    </Flex>
    <Flex mb="1">
      <ItemIcon>4</ItemIcon>Tout abus d’une mécanique du jeu pour obtenir un avantage abusif est
      interdit
    </Flex>
    <Flex mb="1">
      <ItemIcon>5</ItemIcon>Désamorcez les conflits plutôt que de les alimenter
    </Flex>
    <Flex mb="1">
      <ItemIcon>6</ItemIcon>La zone de départ n’est là … que pour votre départ
    </Flex>
    <Flex mb="1">
      <ItemIcon>7</ItemIcon>Ton nom doit bien être ton nom
    </Flex>
    <Flex mb="1">
      <ItemIcon>8</ItemIcon>Si tu stream, aie le consentement de ceux que tu enregistres
    </Flex>
  </>
);

export default GameRules;
