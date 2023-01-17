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
        La zone de départ
      </Heading>
      <Paragraphs
        paragraphs={[
          'C’est là où tous les nouveaux arrivants débarquent. On l’appelle aussi la “zone 0”, c’est un cercle couvrant les 2500 premiers mètres du jeu et il est réservé aux nouveaux du serveur. En son sein, il y a quelques prairies (à l’Est surtout), les terres communales (là où tu trouveras les principaux PNJs), et les lieux des premières quêtes principales.',
          'Après dix jours (réels), ou après avoir obtenu une armure de cuivre améliorée trois fois, tu ne seras plus considéré comme débutant et tu devras quitter la zone 0. Tu pourras y retourner à l’occasion bien sûr, mais pas y récolter des ressources et tu devras déplacer ta base hors de la zone 0. Il faut bien laisser la place au suivant :)',
        ]}
      />
    </section>
    <section>
      <Heading size="l" mb={2}>
        Les quêtes
      </Heading>
      <Paragraphs
        paragraphs={[
          'Tu pourras les démarrer en parlant aux bons PNJ dans le jeu. Un conseil, parle à tous ceux que tu croiseras. Il n’y a bien entendu aucune obligation de faire les quêtes. C’est une mécanique de jeu complètement optionnelle pour vous. Elles sont là pour vous offrir plus de jeu et souvent, des bonus sympas pour votre progression.',
          "Attention : on fait de notre mieux pour que les quêtes soient les plus claires possibles, mais nous ne sommes que des joueurs passionnés, pas des pros. Si quelque chose est flou, n'hésitez pas à demander des conseils sur discord.",
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
        ]}
      />
    </section>
    <section>
      <Heading size="l" mb={2}>
        Les autres joueurs
      </Heading>
      <Paragraphs
        paragraphs={[
          'Personne n’est là pour vous, mais tout le monde est là avec vous pour le meilleur et pour le pire. La communauté est composée d’une myriade de groupes, tous là pour jouer en communauté. En moyenne, il y a 25 joueurs différents par jour et une dizaine tous les soirs (chiffres de Septembre-Décembre 2022) et chaque semaine nos rangs grossissent. Ça fait beaucoup de personnes avec qui interagir, donc n’hésitez pas à aller les saluer (surtout si vous cherchez des compagnons).',
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
        ]}
      />
    </section>
    <section>
      <Heading size="l" mb={2}>
        Clan
      </Heading>
      <Text mb={2}>
        Vous devrez rejoindre un des deux clans du serveur en arrivant (
        <WikiLink data-cy="clan" label="voir la page wiki Le clan" pageName="les-clans" external />
        ). Mais vous n’avez pas d’obligation envers votre clan. Ils sont là pour vous accompagner et
        pour le RP.
      </Text>
      <Text>
        S’il y a un problème technique (ou autre), demandez-leur de l’aide dans les salons “Papote”
        du discord. Seuls le jarl et l’oracle de votre clan peuvent contacter les admins (ne
        contactez pas les admins directement svp).
      </Text>
    </section>
    <section>
      <Heading size="l" mb={2}>
        Divers
      </Heading>
      <IconList
        list={[
          'Si vous voyez un monstre qui n’est pas présent dans le jeu de base, soyez très prudent ! (sauf pour les papillons, les papillons, ce sont nos amis <(°___°)> )',
          'Les ruches sont publiques, n’en bloquez pas l’accès.',
          'Si vous êtes arachnophobe, n’allez PAS dans les terres brumeuses.',
          'Ne laissez pas vos portails traîner dans la nature et n’en faites pas trop (13 max par joueur).',
          'Ne faites pas de pièges à joueurs (hors événements ou quêtes).',
          'Faire des bâtiments publics (ou des quêtes) sera toujours apprécié et récompensé !',
          'Retenez-vous de faire des constructions “industrielles”. Pas besoin d’être un artiste pour avoir un style un peu viking :)',
          'Si vous êtes arachnophobe, n’allez PAS dans les terres brumeuses, vraiment, j’insiste.',
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
