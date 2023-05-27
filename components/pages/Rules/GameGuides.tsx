import { chakra } from '@chakra-ui/react';
import { VStack } from 'components/core/Containers/Stack';
import IconList from 'components/core/DataDisplay/IconList';
import ExternalLink from 'components/core/Interactive/ExternalLink';
import WikiLink from 'components/core/Interactive/WikiLink';
import Heading from 'components/core/Typography/Heading';
import Paragraphs from 'components/core/Typography/Paragraphs';
import Text from 'components/core/Typography/Text';
import { getRoute, NavRoute } from 'utils/routes';

const GameGuides: React.FC = () => (
  <VStack align="start" spacing={4}>
    <section>
      <Heading size="l" mb={2}>
        Le RP (Role Play)
      </Heading>
      <Paragraphs
        paragraphs={[
          "C’est hautement encouragé parce qu’on en est très friand, mais pas du tout obligatoire. Ce qui l’est, c'est de ne pas casser le “délire” de ceux qui s’y investissent. Essayez à l’occasion, certes le RP ralentit votre progression, mais ça vous ouvre une facette complètement nouvelle du jeu !",
        ]}
      />
    </section>
    <section>
      <Heading size="l" mb={2}>
        Les zones
      </Heading>
      <Paragraphs
        paragraphs={[
          "La carte du Valhabba est séparée en deux régions. La première (appelée zone 0), qui s'étend sur 10km autour des pierres des déchus au point de départ, est très proche du jeu de base (appelé “vanilla”). La seconde région s'étend au-delà, elle comporte tous les biomes vanilla et de nouveaux biomes, avec de nouveaux monstres et un plus grand éventail de difficultés. Des PNJs “Godi d’Heimdallr” permettent d’y accéder facilement.",
          "Vous êtes libres de jouer dans les zones de votre choix. Mais ne vous installez pas définitivement à moins de 1000 mètres des pierres des déchus ou des Godi d'Heimdallr, pour garder ces zones libres pour les nouveaux joueurs.",
        ]}
      />
    </section>
    <section>
      <Heading size="l" mb={2}>
        Les métiers
      </Heading>
      <Text>
        Vous pouvez choisir jusqu’à deux métiers et obtenir des bonus en les exerçant. Regardez{' '}
        <WikiLink
          data-cy="metiers"
          label="la page wiki sur les métiers"
          pageName="les-metiers"
          external
        />{' '}
        pour plus d’informations.
      </Text>
    </section>
    <section>
      <Heading size="l" mb={2}>
        Les quêtes
      </Heading>
      <Paragraphs
        paragraphs={[
          'Vous pourrez les démarrer en parlant aux bons PNJs dans le jeu. Un conseil, parlez à tous ceux que vous croiserez. Il n’y a bien entendu aucune obligation de faire les quêtes. C’est une mécanique de jeu complètement optionnelle pour vous. Elles sont là pour vous offrir plus de jeu et souvent, des bonus sympas pour votre progression.',
          "Attention : on fait de notre mieux pour que les quêtes soient les plus claires possibles, mais nous ne sommes que des joueurs passionnés, pas des pros. Si quelque chose est flou, n'hésitez pas à demander des conseils sur discord.",
        ]}
      />
    </section>
    <section>
      <Heading size="l" mb={2}>
        Les ruches
      </Heading>
      <Paragraphs
        paragraphs={[
          "Pour obtenir du miel, il faut d'abord trouver une reine abeille dans la nature. Les reines abeille les plus proches des pierres des déchus ont probablement déjà été ramassées par d'anciens joueurs. Pour en trouver, vous pouvez vous éloigner, ou accomplir les quêtes qui vous en offrent une.",
          'Si vous jugez avoir suffisamment de ruches pour votre consommation de miel, laissez-en pour les futurs nouveaux joueurs. Cela leur fera plaisir de les trouver dans la nature.',
        ]}
      />
    </section>
    <section>
      <Heading size="l" mb={2}>
        La progression
      </Heading>
      <Paragraphs
        paragraphs={[
          'Tout le serveur est pensé pour prolonger le jeu et enrichir votre expérience. Il y a des nouveaux monstres, équipements, nourritures, objets, pièces de constructions et j’en passe.',
          'Le contenu a été plus que triplé et est encore étendu toutes les semaines. Prenez votre temps ! Le Valhabba ne se finit pas en une semaine, et les possibilités ne font qu’augmenter à chaque interaction avec la communauté (presque tout le monde à son petit ou gros projet à montrer aux autres joueurs).',
        ]}
      />
    </section>
    <section>
      <Heading size="l" mb={2}>
        Recevoir de l&apos;aide
      </Heading>
      <Paragraphs
        paragraphs={[
          'On a un wiki. Je vous ai dit qu’on avait un wiki ? Allez voir le wiki, y a plein d’info dedans 🙂',
          "Plus sérieusement, on a fait beaucoup d'ajouts et de modifications, mais tous ne sont pas présentés clairement (ou présentés tout court). N’hésitez vraiment pas à demander un coup de main ou une explication sur notre discord. C’est là pour ça et ça limitera votre frustration face aux bogues qui traînent encore dans le serveur ou face à des monstres trop insistants (dans les marais, dans les plaines, etc.).",
          "Si vous rencontrez un problème dans le jeu, et qu'il n'est pas résoluble directement par les autres joueurs, vous pouvez vous rendre à un bureau des lamentations dans un camp du Bifrost (PNJ-parchemin sur la première porte à droite en entrant) et y décrire ce qui vous arrive (avec autant de détails que possible) et ce qu'on peut y faire. Si vous n'avez pas accès au jeu ou à un PNJ, demandez à un autre joueur de le faire pour vous. Ne contactez pas directement les modérateurs s'il vous plaît.",
        ]}
      />
    </section>
    <section>
      <Heading size="l" mb={2}>
        Les autres joueurs
      </Heading>
      <Paragraphs
        paragraphs={[
          'Personne n’est là pour vous, mais tout le monde est là avec vous pour le meilleur et pour le pire. La communauté est composée d’une myriade de groupes, tous là pour jouer en communauté. En moyenne, il y a 10 à 15 joueurs différents par jour (chiffres de mai 2023) et chaque semaine nos rangs grossissent. Ça fait beaucoup de personnes avec qui interagir, donc n’hésitez pas à aller les saluer (surtout si vous cherchez des compagnons).',
          "Pour rencontrer du monde, rien ne vaut le Discord. Si vous lancez le Valhabba, envisagez de vous connecter aussi à un salon vocal de notre Discord, même s'il n'y a encore personne. Vous pourrez rencontrer du monde, et plus il y a de joueurs connectés en vocal, plus cela donne envie aux autres de rejoindre, plus il y a de joueurs qui rejoignent. Et plus on est de fous, plus on rit !",
          'Plusieurs joueurs proposent des services communautaires (explication de mécaniques, auberge de départ, forge, commerce, supermarché, équipe de sauvetage, transports de ressources, architecte, décorateur d’intérieur), appelez-les sur discord !',
          "Par contre, gardez en tête que les autres joueurs ne sont probablement pas encore vos potes ^^'. Ils ne se sont pas forcément connectés pour vous, ils peuvent avoir eu une journée compliquée, avoir une sensibilité et une manière de s’exprimer différente de la vôtre etc. etc. La communauté est plutôt bienveillante, mais c’est bien parce que tout le monde fait attention aux autres, faites de même svp :)",
          'Les disputes RP peuvent être amusantes et ajouter une chouette ambiance à vos aventures (surtout quand vous les partagez avec nous sur le discord), mais ça ne doit jamais être une excuse pour vous défouler. Lors d’un échange, RP ou non, si vous mettez mal à l’aise quelqu’un sans vous en apercevoir, ce sera pardonné… tant que ça ne se répète pas, là, on devra intervenir.',
        ]}
      />
    </section>
    <section>
      <Heading size="l" mb={2}>
        Pseudonyme
      </Heading>
      <Paragraphs
        paragraphs={[
          'Votre pseudo sur le serveur Discord doit correspondre à votre nom de viking sur le serveur de jeu. Vous pouvez facilement modifier ce pseudo en faisant un clic droit sur votre avatar, dans la colonne de droite de la fenêtre Discord. Cela ne changera votre nom que sur notre serveur Discord et nulle part ailleurs. Choisissez un nom qui vous est propre, sonne un peu viking et ne contient pas de qualificatif. Pas de “Olaf le valeureux” ou “Olaf le croqueur de goblins”, juste “Olaf” ou “Olaf Ragnarson” par exemple.',
          'Vous pouvez également ajouter des icones pour indiquer vos activités principales en jeu aux autres joueurs, comme vos 2 métiers par exemple.',
        ]}
      />
    </section>
    <section>
      <Heading size="l" mb={2}>
        Divers
      </Heading>
      <IconList
        list={[
          'Si vous voyez un monstre qui n’est pas présent dans le jeu de base, soyez très prudent !',
          'Ne laissez pas vos portails traîner dans la nature et n’en faites pas trop (13 max par joueur).',
          'Ne faites pas de pièges à joueurs (hors événements ou quêtes).',
          'Faire des bâtiments publics (ou des quêtes) sera toujours apprécié et récompensé !',
          'Retenez-vous de faire des constructions “industrielles”. Pas besoin d’être un artiste pour avoir un style un peu viking :)',
          <Text key="wiki">
            <chakra.span mr={1.5}>Plongez-vous dans le</chakra.span>
            <ExternalLink href={getRoute(NavRoute.WIKI)}>wiki</ExternalLink>, le wiki, c&apos;est la
            vie !
          </Text>,
        ]}
      />
    </section>
  </VStack>
);

export default GameGuides;
