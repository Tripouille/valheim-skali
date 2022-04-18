import React from 'react';
import {
  GiAbdominalArmor,
  GiBeerHorn,
  GiDungeonGate,
  GiLion,
  GiMonsterGrasp,
  GiOre,
  GiRoundStar,
  GiStoneWall,
  GiSwitchWeapon,
} from 'react-icons/gi';
import { SiHappycow } from 'react-icons/si';
import { HiCursorClick } from 'react-icons/hi';
import { BsSun } from 'react-icons/bs';
import { MdShareLocation } from 'react-icons/md';
import Background from 'components/core/Containers/Background';
import Box from 'components/core/Containers/Box';
import { VStack } from 'components/core/Containers/Stack';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from 'components/core/Feedback/Alert';
import PageTitle from 'components/core/Typography/PageTitle';
import Text from 'components/core/Typography/Text';
import Paragraphs from 'components/core/Typography/Paragraphs';
import IconTitle from 'components/core/Typography/IconTitle';
import Spoiler from 'components/core/Typography/Spoiler';
import Heading from 'components/core/Typography/Heading';
import IconList from 'components/core/DataDisplay/IconList';
import InlineKbd from 'components/core/DataDisplay/InlineKbd';
import Code from 'components/core/DataDisplay/Code';
import Icon from 'components/core/Images/Icon';
import ZoomableImage from 'components/core/Images/ZoomableImage';
import Figure from 'components/core/Images/Figure';

const Mods = () => {
  return (
    <Background data-cy="mods" textAlign="justify">
      <VStack spacing="10">
        <PageTitle title="Mods" />
        <Alert status="warning" w="5xl">
          <AlertIcon />
          <AlertTitle whiteSpace="nowrap" me="5">
            Spoiler Alert !
          </AlertTitle>
          <AlertDescription>
            Cette page contient des informations que vous pourriez vouloir découvrir par vous-même.
            Certaines ont été masquées (et sont visibles sur un clic) pour ne pas gâcher votre
            expérience découverte du serveur.
          </AlertDescription>
        </Alert>
        <VStack align="start" w="full" spacing="3">
          <IconTitle title="Préambule" size="md" icon={GiDungeonGate} />
          <Paragraphs
            paragraphs={[
              `Au Valhabba, nous avons un certain nombre de mods que nous sélectionnons et ajustons (depuis des mois) selon une idée simple : "prolonger la durée de jeu de Valheim tout en respectant son esprit et son équilibre initial".
Parce qu'on trouve le jeu de base déjà très bien, même si on se permet d'y ajouter des choses.`,
              `Dans la suite de cette page, nous allons décrire les différences que notre serveur présente par rapport à un jeu classique. Si certaines vous seront accessibles dès vos premiers pas au Valhabba, la plupart ne se révéleront à vous que progressivement.`,
              `Nous ajouterons aussi que, même si, par simplicité, on parle de ces modifications comme si elles étaient exclusivement les nôtres, ce n'est pas le cas.
Elles viennent de différents mods gracieusement mis à disposition par d'autres développeurs. Notre travail, à nous, a consisté à choisir de bons assortiments de mods et à configurer des milliers de paramètres (littéralement) pour vous proposer une expérience étendue de Valheim.`,
              `Sachez qu’il y a et il y aura toujours des choses à revoir et à réajuster, mais après les loooooongs mois de vie active de ce serveur et de sa communauté, nous pensons nous en être plutôt bien tirés. L’orientation que nous avons choisie pour le serveur  a probablement quelque chose à offrir à tous les styles de jeu.`,
            ]}
          />
        </VStack>
        <VStack align="start" w="full" spacing="3">
          <IconTitle title="Déplacements et animaux" size="md" icon={GiLion} />
          <Text>Ici :</Text>
          <IconList
            list={[
              `Les cochons et les loxs apprivoisés vous suivent sur commande.`,
              `L'équitation porcine est un sport reconnu, l'équitation lupine elle n'est accessible qu'aux plus méritants !`,
              <span key="lox_milking">
                Les loxs peuvent être traits (mais ils ne font pas meuuuuuuh
                <Icon as={SiHappycow} aria-label="Cow icon" mx="2" boxSize={6} mb="-3px" />
                ).
              </span>,
            ]}
          />
        </VStack>
        <VStack align="start" w="full" spacing="3">
          <IconTitle title="Qualité de vie" size="md" icon={BsSun} />
          <IconList
            list={[
              `Ici, pas de montres ou d'horloges, il vous suffit de lever les yeux au ciel et vous verrez affiché si nous sommes au début ou à la fin du matin, de l'après midi, de la nuit etc.`,
              `Par facilité, vous n'aurez pas besoin de rentrer l'IP et le mot de passe du serveur. Ce sera fait automatiquement pour vous.`,
              <span key="inventory">
                Au Valhabba, vous aurez un inventaire séparé pour votre équipement (des cases en
                plus) ainsi que 3 emplacements supplémentaires assignés aux touches
                <InlineKbd>B</InlineKbd>,<InlineKbd>N</InlineKbd> et
                <InlineKbd>,</InlineKbd>.
              </span>,
              `D'ailleurs vous pourrez (enfin !) exposer vos armures (et une grande partie des objets) en les accrochant sur des présentoirs.`,
              `Si vous êtes en pleine nature ou n'êtes juste pas très écolo, vous avez une poubelle associée à votre inventaire. Par contre, une fois dans la poubelle impossible de récupérer quoi que ce soit !`,
              `Pour les plus perfectionnistes d'entre vous, la plupart de vos statistiques de jeu vous sont également accessibles (combien de morts, contre quoi, combien de dégâts, contre qui etc).`,
            ]}
          />
        </VStack>
        <VStack align="start" w="full" spacing="3">
          <IconTitle title="Consommables" size="md" icon={GiBeerHorn} />
          <Text>Ici il y a :</Text>
          <IconList
            list={[
              `de très nombreux nouveaux plats. Vous débloquerez chaque recette quand vous aurez touché au moins une fois chaque élément la composant.`,
              `de nouvelles plantes à cultiver. Si vous rêviez de patates, de tomates, d'ail, de piment et de riz, vous êtes bien tombé. 😁 `,
              `Et pour faire plaisir au petit viking qui se cache dans votre foi, il y a de nouvelles bières et potions !`,
            ]}
          />
          <Text>
            Tout ceci étant bien entendu équilibré et constamment rééquilibré, pour ne pas procurer
            d&apos;avantages ou de désavantages ruinant l&apos;expérience de jeu.
          </Text>
        </VStack>
        <VStack align="start" w="full" spacing="3">
          <IconTitle title="Renouvellement des ressources" size="md" icon={GiOre} />
          <Text>Au Valhabba :</Text>
          <IconList
            list={[
              `La nature est grande et forte ! À peine une souche disparaît, une petite pousse du même arbre réapparaît.`,
              `Vous pouvez même planter la plupart des arbres du jeu, si vous en avez les graines... Mais ces graines ne s'obtiennent que sur certains monstres.`,
              `Les ruches sont indestructibles, publiques et non déplaçables. En vous promenant vous pourrez donc accéder à toutes les ruches du jeu. Cela permet de mettre tout le monde au même niveau.`,
              `L'étain et l'obsidienne, eux, réapparaissent automatiquement, et nous expérimentons la réapparition automatique du cuivre.`,
              `Et enfin, les donjons et les cryptes sont remis à zéros automatiquement, au bout d'un certain temps.`,
              `Il en va de même pour les monstres des camps de gobelins, mais malheureusement ce n'est pas le cas de leurs bâtiments. Il faut donc en prendre soin !`,
            ]}
          />
          <Text>
            Il va de soi que les coûts pour planter et les chronomètres de réapparition sont ajustés
            pour ne pas rendre les ressources trop faciles d&apos;accès.
          </Text>
        </VStack>
        <VStack align="start" w="full" spacing="3">
          <IconTitle title="De nouvelles pièces de construction" size="md" icon={GiStoneWall} />
          <Text>Pour plus de styles et de RP, nous avons ajouté :</Text>
          <IconList
            list={[
              `des nouvelles portes de toutes tailles, des herses, des trappes, des fenêtres, des vitraux et des ponts levis.`,
              `des nouveaux styles de murs en pierre.`,
              `des demi-murs verticaux et de grands pylônes de pierres pour ceux qui aiment le détail et les bâtiments grandioses.`,
              `des poutres plus petites ou grandes, inclinés ou nom, le tout en pierre, fer ou cristal.`,
              `de nouveaux ateliers pour cuisiner ou fabriquer de nouveaux objets.`,
              `des pièges pour animaux sauvages.`,
              `des tiroirs de rangements permettant de stocker une et une seule ressource tout en l'affichant à l'avant du tiroir.`,
            ]}
          />
        </VStack>
        <VStack align="start" w="full" spacing="3">
          <IconTitle title="Nouveau monstres" size="md" icon={GiMonsterGrasp} />
          <Text>En plus des créatures autochtones,</Text>
          <IconList
            list={[
              <span key="coast">
                Les côtes ont été envahies par des <Spoiler>Molluscans</Spoiler>.
              </span>,
              <span key="meadow">
                Les prairies ont été envahies (modérément) par des{' '}
                <Spoiler>squelettes fantômes et des guerriers squelettes</Spoiler>.
              </span>,
              <span key="black_forest">
                Les forêts noires (éloignées) ont été envahies par des{' '}
                <Spoiler>
                  nains gris tisseurs de ronces, des Wendigo des forêts et des trolls lanceurs
                </Spoiler>
                .
              </span>,
              <span key="swamp">
                Les marais ont été envahis par des{' '}
                <Spoiler>
                  perfides, loups garous noirs, loups garous sombres, Wendigo des marais, sorciers
                  fantômes et des Grigs
                </Spoiler>
                .
              </span>,
              <span key="mountain">
                Les montagnes ont été envahies par des{' '}
                <Spoiler>
                  Yétis, loups garous blancs, guerriers squelette gelés et des Golems
                  d&apos;obsidienne
                </Spoiler>
                .
              </span>,
              <span key="plain">
                Les plaines ont été envahies par des{' '}
                <Spoiler>
                  gobelins ronds, shamans gobelins ronds, Shamans gobelins grands et fous, garours
                  rouges et des loups garous marrons
                </Spoiler>
                .
              </span>,
              <span key="mist">
                Les terres brumeuses ont été envahies par des{' '}
                <Spoiler>
                  sorciers fantômes, garours gris, garours noirs, loups garous noirs en armure, et
                  des araignées de six espèces (des arbres, des forêts, frigides, tannées, vertes,
                  et de froid)
                </Spoiler>
                .
              </span>,
              <span key="ash">
                Les terres cendrées ont été envahies par des{' '}
                <Spoiler>
                  guerriers squelette de feu, fantômes vengeurs, Grigs, golems de feu et des titans
                  de feu
                </Spoiler>
                .
              </span>,
              <span key="north">
                Le grand nord a été envahi par des{' '}
                <Spoiler>
                  Yétis, guerriers squelettes gelés, loups garous blancs, golems d&apos;obsidienne
                  et des titans de glace
                </Spoiler>
                .
              </span>,
              <span key="molluscan">
                Les océans par des{' '}
                <Spoiler>serpents jeunes et les mers éloignées par des krakens</Spoiler>.
              </span>,
            ]}
          />
          <Figure legend="Voici à quoi ressemble une partie de ces bêtes !">
            <ZoomableImage
              data-cy="monsters"
              src="https://cdn.discordapp.com/attachments/883463860642799678/887248665406750760/SPOILER_unknown.png"
              alt="Images des monstres des mods"
              height={200}
              width={200}
              objectFit="cover"
            />
          </Figure>
          <Text>
            Chacun de ces monstres offre des ressources classiques et parfois de nouvelles
            ressources qui permettent à leur tour de créer de nouveaux objets et équipements. Voici
            la liste de ces nouveautés (à vous de découvrir comment les obtenir) :
          </Text>
          <Text>
            <Spoiler>
              Griffe de Yéti, Croc de garou, Dent cariée, Poudre osseuse monstrueuse, Sac à poudre,
              Corne de Titan, Ivoire monstrueux, Poudre osseuse démoniaque, Coeur de glace, Coeur de
              magma, Coeur maudit, Coeur de glace supérieur, Coeur de magma supérieur, Coeur de
              magie, Crochets d&apos;araignées, Morve de goblin, Bière gobeline, Livre
              indéchiffrable, Flasque étrange, Branche incrustée de runes (baguette), Base
              alchmagique gobeline, Purifieur, Essence des forêts, Essence des montagnes, Essence
              des marais, Flametal Ore, Acier purifié, Icemetal, Fragment d&apos;Ithildin, Fragment
              de Galvorn, Lingot d&apos;Ithildin, Lingot de Galvorn, Crinière séléne blanche,
              Crinière séléne rouge, Crinière séléne sombre, Crinière séléne ultime, Cuir garours
              noir, Cuir garours gris, Cuir garours rouge, Cuir garours ultime, Soie des forêts,
              Soie verte, Soie des arbres, Soie sylvestre, Soie tannée, Soie frigide, Soie gelée,
              Soie extremophile, Soie ultime, Koeur de Kraken.
            </Spoiler>
          </Text>
          <Figure legend="Et voici l'image de la plupart d'entre eux :">
            <ZoomableImage
              data-cy="loots"
              src="https://cdn.discordapp.com/attachments/883463860642799678/887254362940899338/SPOILER_SPOILER_unknown.png"
              alt="Images des loots des monstres"
              height={200}
              width={200}
              objectFit="cover"
            />
          </Figure>
          <Text>
            (Malgré nos efforts, tous ces objets n&apos;ont pas des icônes uniques dans votre
            inventaire, attention à ne pas les confondre. De plus, certains sont vendus au marchand
            quand vous cliquez sur le bouton &quot;vendre&quot;, prenez garde !)
          </Text>
        </VStack>
        <VStack align="start" w="full" spacing="3">
          <IconTitle title="Nouveaux objets" size="md" icon={GiAbdominalArmor} />
          <Text>
            À partir de tout cela nous avons également ajouté de nouveaux équipements pour compléter
            la progression des joueurs dans chaque biome du Valhabba. Cela comprend :
          </Text>
          <IconList
            list={[
              `de nouvelles armes : atgeirs, haches et épées à deux mains, épée à une main, haches de lancer et dagues, arc.`,
              `des nouvelles armures suivant deux voies distinctes : la voie du Valhalla et la voie du Folkvangr. Découvrez les après les plaines et l'armure de lin !`,
              `des dons des dieux (les admins) : des équipements spéciaux récompensant des hauts faits, des magnifiques histoires RP, des participations épiques à des événements ou même d'organisation d'événements ! 
Bref n'importe quelle implication significative de votre part pour faire vivre notre communauté. 🙂`,
            ]}
          />
        </VStack>
        <VStack align="start" w="full" spacing="3">
          <IconTitle
            title="Les changements majeurs par rapport au jeu de base"
            size="md"
            icon={GiSwitchWeapon}
          />
          <Text>Au Valhabba :</Text>
          <IconList
            list={[
              `Votre viking ne traverse pas le multivers ! Chez nous vous aurez un personnage entièrement nouveau qui ne pourra pas importer ou exporter de ressources vers d'autres mondes. Comme tout le reste de nos mods, ce n'est PAS négotiable.`,
              <Box key="zones" borderWidth="1px" borderColor="blue.800" p="5px">
                <Text>
                  Les monstres sont de plus en plus forts au fur et à mesure de votre éloignement du
                  point de départ. Au bord de la carte, vous pouvez croiser des monstres avec 5
                  étoiles (voire même plus). Cet éloignement est déterminé par des zones :
                </Text>
                <ZoomableImage
                  data-cy="zones"
                  src="https://cdn.discordapp.com/attachments/843847641766690856/864466400918372372/unknown.png"
                  alt="Images des monstres des mods"
                  height={200}
                  width={200}
                  objectFit="cover"
                />
                <Text>Voici une courte description de ces zones :</Text>
                <IconList
                  list={[
                    'Niveau 0 : zone jeune viking (zone noob)',
                    'Niveau 1 : zone vikings (légèrement plus dur que le jeu vanilla)',
                    `Niveau 2 : zone des Jarls (difficulté  avancée)`,
                    `Niveau 3 : zone viking aventurier (zone où le défi (et ses récompenses) commence !)`,
                    `Niveau 4 : zone berserker (Êtes-vous prêt à mourir ?)`,
                    `Niveau 5 : zone Nibelheim (Que faites vous là ? Et seul en plus ?! Faites demi-tour immédiatement et revenez en équipe)`,
                  ]}
                  icon={MdShareLocation}
                  iconColor="red.600"
                />
              </Box>,
              <Box key="zones" borderWidth="1px" borderColor="blue.800" p="5px">
                <Text>
                  Les monstres peuvent avoir différents &quot;caractères&quot; symbolisés par des
                  étoiles colorées. Cela permet de varier un peu la dynamique des combats (vitesse,
                  résistance, dégats etc.).
                </Text>
                <Text>Dans chaque zone vous pourrez rencontrer des monstres :</Text>
                <Text>
                  <Icon as={GiRoundStar} color="blue.200" fontSize="lg" mb="-2px" />{' '}
                  <strong>Curieux</strong> (couleur bleu clair): ils vous détectent et vous
                  approchent plus facilement
                </Text>
                <Text>
                  <Icon as={GiRoundStar} color="purple.500" fontSize="lg" mb="-2px" />{' '}
                  <strong>Rapide</strong> (couleur violette): ils courent plus vite
                </Text>
                <Text>
                  <Icon as={GiRoundStar} color="blue.500" fontSize="lg" mb="-2px" />{' '}
                  <strong>Renforcé</strong> (couleur bleu foncé): ils ont plus d&apos;armure mais
                  courent moins vite
                </Text>
                <Text>
                  <Icon as={GiRoundStar} color="red.600" fontSize="lg" mb="-2px" />{' '}
                  <strong>Agressif</strong> (couleur rouge): ils frappent plus vite et plus fort
                </Text>
                <Text>
                  <Icon as={GiRoundStar} color="white" fontSize="lg" mb="-2px" />{' '}
                  <strong>Scindable</strong> (couleur blanche): ils se divisent en deux versions
                  d&apos;eux même, se partageant les étoiles de leur progéniteur
                </Text>
                <Text>
                  <Icon as={GiRoundStar} color="green" fontSize="lg" mb="-2px" />{' '}
                  <strong>Régénératif</strong> (couleur verte): ils regagnent plus vite leur vie
                </Text>
                <Text>
                  Tous les monstres n&apos;ont pas forcément de caractère et les caractères sont
                  répartis dans les différentes zones selon l&apos;esprit de chaque zone.
                </Text>
              </Box>,
              `Beaucoup de recettes vanilla ont été adaptées. Par exemple, il faut souvent un objet du niveau précédent pour fabriquer le niveau suivant (du cuir pour le bronze, du bronze pour le fer etc.)`,
            ]}
          />
        </VStack>
        <VStack align="start" w="full" spacing="3">
          <IconTitle title="Infos pratiques sur les mods" size="md" icon={HiCursorClick} />
          <Text>
            Nous ne donnons de détails que sur les mods difficiles à découvrir seul. Pour le reste
            nous vous laissons explorer par vous même 😊
          </Text>
          <Box>
            <Heading as="h3" size="sm" mb="1">
              Options de placement avancées des constructions :
            </Heading>
            <Text>
              Pour utiliser cette option, équipez-vous d&apos;un marteau, cliquez sur une
              construction dans le menu, puis appuyez sur <InlineKbd>F1</InlineKbd>. Vous devriez
              voir apparaître le message <Code>AMD active</Code> en haut de votre écran. Appuyez sur{' '}
              <InlineKbd>F3</InlineKbd> pour désactiver l&apos;option.
            </Text>
            <Text>
              Lorsqu&apos;elle est activée, votre construction se fige sur place et vous pouvez la
              manipuler via :
            </Text>
            <Text>
              -/ les touches directionnelles <InlineKbd>↑</InlineKbd>
              <InlineKbd>↓</InlineKbd>
              <InlineKbd>←</InlineKbd>
              <InlineKbd>→</InlineKbd> (pour la décaler sur les côtés et en profondeur)
            </Text>
            <Text>
              -/ la combinaison <InlineKbd me="0">Ctrl</InlineKbd> + <InlineKbd ms="0">↑</InlineKbd>{' '}
              ou <InlineKbd>↓</InlineKbd> (pour la décaler en hauteur)
            </Text>
            <Text>
              -/ la combinaison <InlineKbd me="0">Ctrl</InlineKbd> + molette (pour l&apos;incliner
              vers l&apos;avant ou l&apos;arrière)
            </Text>
            <Text>
              -/ la combinaison <InlineKbd me="0">Alt</InlineKbd> + molette (pour l&apos;incliner
              sur les côtés)
            </Text>
            <Text>
              -/ une fois la position de votre objet ajustée à votre guise, vous pouvez le placer
              avec un clic gauche.
            </Text>
            <Text>
              -/ mais avant vous pouvez également sauvegarder ces ajustements en appuyant sur la
              touche <InlineKbd>7</InlineKbd> de votre pavé numérique
            </Text>
            <Text>
              -/ Ensuite, la prochaine fois que vous entrerez dans ce mod d&apos;ajustement, appuyez
              sur la touche <InlineKbd>8</InlineKbd> et les rotations précédentes se chargeront
              directement.
            </Text>
          </Box>
          <Text>
            Si vous sélectionnez un objet et appuyez sur <InlineKbd>Suppr</InlineKbd>, l&apos;objet
            sera détruit !
          </Text>
          <Text>Tous les types de bois sont maintenant transformables en charbon.</Text>
          <Text>
            Vous pouvez passer en vue à la première personne en appuyant sur{' '}
            <InlineKbd>F10</InlineKbd> (et enlever l&apos;interface en appuyant sur{' '}
            <InlineKbd>Ctrl</InlineKbd> + <InlineKbd>F3</InlineKbd>).
          </Text>
        </VStack>
      </VStack>
    </Background>
  );
};

export default Mods;
