import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { MdComputer } from 'react-icons/md';
import { GiPig, GiVillage, GiWarPick } from 'react-icons/gi';
import Paragraphs from '@packages/components/core/Paragraphs';
import IconTitle from '@packages/components/core/IconTitle';
import Figure from '@packages/components/core/Figure';
import ZoomableImage from '@packages/components/core/ZoomableImage';

const InstanceRules = () => (
  <>
    <Paragraphs
      paragraphs={[
        `Ce serveur est un monde multijoueur ... et le jeu n’est pas encore complètement optimisé pour ça.`,
        `Quand vous modifiez un endroit de notre monde, en y faisant une base par exemple, tous les joueurs qui passeront par là verront et subiront cette modification. Leur ordinateur devra recevoir l’information qu’un objet a été placé, que le terrain a été modifié (creusé, surélevé, aplati) ou encore qu’un troupeau vit ici. Puis leur ordinateur devra calculer tous les impacts que cette information a sur le reste de l’environnement. Ce qui entraîne rapidement des ralentissements du jeu, pour vous comme pour les autres.`,
        `Pour mitiger ça, nous avons donc des règles concernant :`,
      ]}
    />
    <Box mb="4">
      <IconTitle title="Les instances" size="sm" icon={MdComputer} iconColor="teal.100" />
      <Paragraphs
        paragraphs={[
          `Pour mesurer le risque de ralentissements, il suffit de connaître le nombre d’éléments que votre ordinateur doit prendre en compte autour de vous. Pour cela, il suffit d’appuyer sur F2 en jeu pour ouvrir un panneau d’information et d’y lire la ligne ’instances’. Dans une prairie, il sera typiquement entre 3000 et 5000.`,
          `Au Valhabba, quelle que soit votre installation, vous devez rester en dessous de 9500 instances. Au-delà de ça, l’équipe d’administration viendra “retirer” arbitrairement vos installations pour ramener ce chiffre à 9500.`,
          `Le terraformage de confort est autorisé dans l'enceinte de sa base principale uniquement.
				Il est interdit d'ériger des murailles de terre ou des tranchées contre les monstres. Vous êtes des vikings nom d'Odin !`,
        ]}
      />
      <ZoomableImage
        src="https://cdn.discordapp.com/attachments/879308268034482176/880074813027278868/znBWtv2T9-oQtxWHbxpNuyZePd6R8suR2axEDgXkAnyfzueO-tSDtYY-MWTJnqjGazbfM9U4_yZ2q0b3ZQdLrB2P_FrqgCP4yjpr.png"
        alt="Screenshot des instances"
        height={200}
        width={550}
        objectFit="cover"
        objectPosition="top"
      />
    </Box>
    <Box mb="4">
      <IconTitle title="Les bêtes" size="sm" icon={GiPig} iconColor="pink.300" />
      <Paragraphs
        paragraphs={[
          `Les animaux apprivoisés entraînant également des calculs supplémentaires, leur nombre est limité. Cela nous permet aussi de réguler l’économie du serveur. Tout joueur ou regroupement de joueurs jouant ensemble, ne peut avoir, quel que soit l’emplacement de ses bêtes, qu’un maximum de 40 têtes, réparties en :`,
          `- 15 sangliers,`,
          `- 10 loups,`,
          `- 10 ours,`,
          `- 5 lox.`,
        ]}
      />
    </Box>
    <Box mb="4">
      <IconTitle title="La taille des bases" size="sm" icon={GiVillage} iconColor="orange.600" />
      <Paragraphs
        paragraphs={[
          `Dans la même idée, avoir une base géante gênera immanquablement les autres joueurs, c’est donc interdit.`,
          `Voici les restrictions à respecter :`,
        ]}
      />
      <Heading as="h3" size="l" mb="2">
        Droits terriens des joueurs :
      </Heading>
      <strong>Joueur solo :</strong> 6 balises, trois maximum au même endroit
      <Paragraphs fontSize="xs" paragraphs={[`(un endroit = un cercle de 200m de diamètre)`]} />
      <strong>Groupe de joueurs</strong> hors d&quot;un village officiel : pareil, mais SANS droits
      supplémentaires grâce au regroupement.
      <Paragraphs
        fontSize="xs"
        paragraphs={[
          `(c'est à dire 6 balises partagées par tout le groupe, et 3 max au même endroit)`,
        ]}
      />
      <strong>Village :</strong> Un village a le droit au même endroit à autant de balises
      qu&quot;il a de villageois (jusqu&quot;à 10 balises maximum). <br />
      Cependant chaque villageois n&quot;a individuellement plus le droit qu&quot;à 2 balises hors
      du village pour leur jeu personnel.
      <Paragraphs
        mt="4"
        paragraphs={[
          `En bref, chaque joueur peut occuper son propre terrain, mais pas trop de terrain, même si vous êtes plusieurs à jouer ensemble. Le seul moyen d'avoir plus de place est de constituer un village (voir les règles spécifiques des villages au Valhabba).`,
        ]}
      />
    </Box>
    <Box mb="4">
      <IconTitle title="Le minage" size="sm" icon={GiWarPick} iconColor="silver" />
      <Paragraphs
        paragraphs={[
          `Enfin, comme les  modifications du terrain comptent également comme des instances°, le minage sauvage contribue aussi à ralentir le jeu des autres joueurs, en plus de rendre la carte hideuse.`,
          ` Au Valhabba, il est donc interdit de miner afin de récolter le minerai qui se trouve sous vos pieds, contentez-vous de celui qu’il y a en surface. La limite n'est PAS à -15 mètres ni à -5 mètres, elle est à 0 mètre.`,
          `La seule exception étant pour l’argent. Dans ce cas, nous vous demandons de réduire la taille du minage au strict minimum.`,
        ]}
      />
      <Paragraphs
        fontSize="xs"
        paragraphs={[
          `(° : reboucher votre trou ne fera même qu’amplifier le problème, car le jeu chargera votre trou, puis chargera son rebouchement.) `,
        ]}
      />
      <Figure legend="Voici typiquement ce qu’on veut éviter !">
        <ZoomableImage
          src="https://cdn.discordapp.com/attachments/879308268034482176/880075448187498496/7SbpNZOU8PFVmknCFk_g45ENGtjFaoopyVdENgivvJi2V3nXG4IOrT2YTgm6qCPth7EgKdtZqXz-P_LZNnXzPUMAHLZhvxUQ8AEl.png"
          alt="Minage abusif"
          width={550}
          height={200}
          objectFit="cover"
          objectPosition="top"
        />
      </Figure>
    </Box>
  </>
);

export default InstanceRules;
