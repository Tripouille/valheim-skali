import React from 'react';
import { Box } from '@chakra-ui/react';
import { MdComputer } from 'react-icons/md';
import { GiPig, GiVillage, GiWarPick } from 'react-icons/gi';
import CustomText from '@packages/components/CustomText';
import IconTitle from '@packages/components/IconTitle';
import Figure from '@packages/components/Figure';

const InstanceRules = () => (
  <>
    <CustomText
      paragraphs={[
        `Ce serveur est un monde multijoueur ... et le jeu n’est pas encore complètement optimisé pour ça.`,
        `Quand vous modifiez un endroit de notre monde, en y faisant une base par exemple, tous les joueurs qui passeront par là verront et subiront cette modification. Leur ordinateur devra recevoir l’information qu’un objet a été placé, que le terrain a été modifié (creusé, surélevé, aplati) ou encore qu’un troupeau vit ici. Puis leur ordinateur devra calculer tous les impacts que cette information a sur le reste de l’environnement. Ce qui entraîne rapidement des ralentissements du jeu, pour vous comme pour les autres.`,
        `Pour mitiger ça, nous avons donc des règles concernant :`,
      ]}
    />
    <Box mb="4">
      <IconTitle title="Les instances" size="sm" icon={MdComputer} iconColor="teal.100" />
      <CustomText
        paragraphs={[
          `Pour mesurer le risque de ralentissements, il suffit de connaître le nombre d’éléments que votre ordinateur doit prendre en compte autour de vous. Pour cela, il suffit d’appuyer sur F2 en jeu pour ouvrir un panneau d’information et d’y lire la ligne ’instances’. Dans une prairie, il sera typiquement entre 3000 et 5000.`,
          `Au Valhabba, quelle que soit votre installation, vous devez rester en dessous de 9500 instances. Au-delà de ça, l’équipe d’administration viendra “retirer” arbitrairement vos installations pour ramener ce chiffre à 9500.`,
          `Le terraformage de confort est autorisé dans l'enceinte de sa base principale uniquement.
				Il est interdit d'ériger des murailles de terre ou des tranchées contre les monstres. Vous êtes des vikings nom d'Odin !`,
        ]}
      />
      <Figure
        src="https://cdn.discordapp.com/attachments/879308268034482176/880074813027278868/znBWtv2T9-oQtxWHbxpNuyZePd6R8suR2axEDgXkAnyfzueO-tSDtYY-MWTJnqjGazbfM9U4_yZ2q0b3ZQdLrB2P_FrqgCP4yjpr.png"
        imagePosition="top"
        height="200px"
        maxW="550px"
      />
    </Box>
    <Box mb="4">
      <IconTitle title="Les bêtes" size="sm" icon={GiPig} iconColor="pink.300" />
      <CustomText
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
      <CustomText
        paragraphs={[
          `Dans la même idée, avoir une base géante gênera immanquablement les autres joueurs, c’est donc interdit.`,
          `La taille des bases est limitée à 3 balises (de 32 mètres de rayon chacune !) et seuls 3 avant-postes peuvent être balisés, avec une et une seule balise chacun. Cela concerne chaque joueur ou chaque regroupement de joueurs ; se mettre à plusieurs ne donne PAS plus de droits terriens.`,
          `De même, limitez la taille de vos jardins à maximum 75 m².`,
        ]}
      />
    </Box>
    <Box mb="4">
      <IconTitle title="Le minage" size="sm" icon={GiWarPick} iconColor="silver" />
      <CustomText
        paragraphs={[
          `Enfin, comme les  modifications du terrain comptent également comme des instances°, le minage sauvage contribue aussi à ralentir le jeu des autres joueurs, en plus de rendre la carte hideuse.`,
          ` Au Valhabba, il est donc interdit de miner afin de récolter le minerai qui se trouve sous vos pieds, contentez-vous de celui qu’il y a en surface. La limite n'est PAS à -15 mètres ni à -5 mètres, elle est à 0 mètre.`,
          `La seule exception étant pour l’argent. Dans ce cas, nous vous demandons de réduire la taille du minage au strict minimum.`,
        ]}
      />
      <CustomText
        fontSize="xs"
        paragraphs={[
          `(° : reboucher votre trou ne fera même qu’amplifier le problème, car le jeu chargera votre trou, puis chargera son rebouchement.) `,
        ]}
      />
      <Figure
        src="https://cdn.discordapp.com/attachments/879308268034482176/880075448187498496/7SbpNZOU8PFVmknCFk_g45ENGtjFaoopyVdENgivvJi2V3nXG4IOrT2YTgm6qCPth7EgKdtZqXz-P_LZNnXzPUMAHLZhvxUQ8AEl.png"
        imagePosition="top"
        legend="Voici typiquement ce qu’on veut éviter !"
        height="200px"
        maxW="550px"
      />
    </Box>
  </>
);

export default InstanceRules;
