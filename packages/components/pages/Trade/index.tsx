import React from 'react';
import { GiPilgrimHat, GiStabbedNote } from 'react-icons/gi';
import { BsShopWindow } from 'react-icons/bs';
import Background from '@packages/components/core/Containers/Background';
import { VStack } from '@packages/components/core/Containers/Stack';
import PageTitle from '@packages/components/core/Typography/PageTitle';
import Text from '@packages/components/core/Typography/Text';
import Paragraphs from '@packages/components/core/Typography/Paragraphs';
import IconTitle from '@packages/components/core/Typography/IconTitle';
import DiscordButton from '@packages/components/core/Interactive/DiscordButton';
import ZoomableImage from '@packages/components/core/Images/ZoomableImage';
import { getDataValue } from '@packages/utils/dataAttributes';

const Trade = () => {
  return (
    <Background textAlign="justify">
      <VStack spacing="8">
        <PageTitle title="Commerce" />
        <Text w="full">
          Au Valhabba, le commerce, que ce soit sous forme de troc ou d&apos;achat et vente contre
          des piastres, est libre.
        </Text>
        <VStack align="start">
          <IconTitle title="Tarifs de référence" size="md" icon={GiStabbedNote} />
          <Text>
            Une liste de prix est mise à disposition pour vous donner un point de référence. Elle
            n&apos;a pas pour but de faire loi, juste de vous aider.
          </Text>
          <Text>
            Cette liste est à disposition des vikings membres du Valhabba :{' '}
            <DiscordButton
              dataCy={getDataValue('trade, price_list', 'discord_button')}
              href="https://discord.com/channels/843826987466227722/855814293416443914/932766189153812541"
              label="Lien vers les tarifs de référence"
            />
          </Text>
          <Paragraphs
            paragraphs={[
              `La tarification se base sur :`,
              `-/ des valeurs rentrées à la main pour quelques ressources de bases (à l'avenir on pourra les réajuster selon vos retours)`,
              `-/ des valeurs savamment calculées à partir de la chance d'obtenir les objets en tuant un monstre et de la chance de croiser ce monstre`,
              `-/ les objets nécéssaires à la recette d'un autre objet, vous avez donc le prix "coûtant" de l'objet.`,
            ]}
          />
          <Text>
            Dans chaque cas ces premiers tarifs se basent sur &quot;l&apos;offre&quot; et pas sur
            &quot;la demande&quot;. Ils sont évalués à partir de la facilité d&apos;obtention des
            objets, mais pas (encore) à partir de leur intérêt global.
          </Text>
        </VStack>
        <VStack align="start">
          <IconTitle title="Oglaf" size="md" icon={GiPilgrimHat} />
          <Paragraphs
            paragraphs={[
              `Un viking du nom de Oglaf est installé dans les terres communales. Il dit être un descendant des Vanirs et venir sur ces terres pour faciliter les échanges commerciaux. Il aime beaucoup se faire de l'argent.`,
              `Il vous donnera accès à une interface hôtel des ventes, sur laquelle vous pourrez acheter et vendre aux autres vikings.`,
            ]}
          />
          <ZoomableImage
            dataCy={getDataValue('trade', 'oglaf', 'zoomable_image')}
            src="https://cdn.discordapp.com/attachments/843851399943290921/929479675951063080/SPOILER_unknown.png"
            alt="Image de l'hôtel des ventes"
            height={220}
            width={400}
            objectFit="cover"
          />
        </VStack>
        <VStack align="start">
          <IconTitle title="Le Hall des Vanirs" size="md" icon={BsShopWindow} />
          <Paragraphs
            paragraphs={[
              `Il s'agit d'un grand hall acceuillant 8 marchands vendant (presque) tout et achetant (presque) tout.`,
              `Loin de vouloir court-circuiter les échanges entre joueurs, ces marchands vous permettront d'acquérir ce qui n'est pas en vente ailleurs, et peut-être également de vider vos coffres.  Cependant il y a une chose à savoir... ces marchands aiment l'argent et ne vous proposeront que des tarifs désavantageux. À vous de bien gérer votre bourse.`,
              `Ils vendent à 3 fois le tarif de référence, et achètent à sa moitié.`,
              `Comme tout s'achète avec des piastres, la piastre devient donc bien plus précieuse ! N'hésitez pas à en demander quand vous interagissez avec les autres vikings !`,
              `Pour vous rendre au hall des Vanirs, prenez le portail dans les terres communales, juste  derrière la maison d'Oglaf (le pnj Hotel des ventes).`,
            ]}
          />
        </VStack>
      </VStack>
    </Background>
  );
};

export default Trade;
