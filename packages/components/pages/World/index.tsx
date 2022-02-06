import React from 'react';
import Background from '@packages/components/core/Containers/Background';
import { VStack } from '@packages/components/core/Containers/Stack';
import PageTitle from '@packages/components/core/Typography/PageTitle';
import Paragraphs from '../../core/Typography/Paragraphs';
import IconList from '../../core/DataDisplay/IconList';
import Figure from '../../core/Images/Figure';
import ZoomableImage from '../../core/Images/ZoomableImage';
import { getDataValue } from '@packages/utils/dataAttributes';

const World = () => {
  return (
    <Background textAlign="justify">
      <VStack spacing="10">
        <PageTitle title="Les îles du Valhabba" />
        <VStack align="start" w="full">
          <Paragraphs
            paragraphs={[
              `Au Valhabba on n'a pas un monde classique, oh ça non.`,
              `Notre monde est composé de 20 à 30 îles dont la grande majorité est inspirée d'îles existant dans la vraie vie (Royaume Uni, Irlande, Madagascar etc.) ou dans des mondes de fiction (Le Seigneur des Anneaux, le Trône de Fer, the Elder Scrolls etc.).`,
              `Si on dit "inspirée" c'est que les îles de notre monde ne correspondent pas tout à fait à leur source d'inspiration.`,
            ]}
          />
          <IconList
            list={[
              `Tout d'abord elles ne respectent que grossiérement la topologie de leur source.`,
              `Leurs paysages ont subi des "ajustements" pour être plus jouables. (Oui oui croyez-moi, les montagnes étaient bien plus violentes avant)`,
              `Elles arborent des biomes sans aucun liens volontaires avec les environnements de leur source.`,
              `Des modifications aléatoires du terrain ont été effectué par le moteur de Valheim (une rivière par ci, une montagne par là). C'est léger, mais quand il y en a ça se voit.`,
              `Le niveau de la mer ne correspond que grossiérement à celui de la source.`,
              `Elles peuvent être inclinées par rapport à leur présentation classique.`,
            ]}
          />
          <Paragraphs
            paragraphs={[
              `Néanmoins une fois que vous savez où vous êtes vous ne manquerez pas de reconnaitre les lieux. `,
              `Profitez en pour pimenter votre jeu, mais attention mieux vaut demander à l'équipe d'admin avant de s'établir dans un lieu très symbolique. `,
              `Vous vous doutez bien que beaucoup vont vouloir établir leur forge en Orodruin, la montagne du destin du seigneur des anneaux. Certains lieux symboliques seront donc plutôt réservés à des évenements ou des quêtes permanents plutôt que pour des bases de joueurs.`,
              `Afin de vous aider à identifier ces îles, voilà les contours de certaines d'entre elles, présentées dans un ordre arbitraire.`,
              `En revanche, gardez en tête que certains souhaitent découvrir par eux-mêmes où se situent les îles. Faites donc attention à éviter les phrases du style "On se retrouve chez moi, j'habite au milieu de Lordaeron".`,
            ]}
          />
        </VStack>
        <VStack textAlign="center" spacing="9">
          {[
            {
              id: 'start_islands',
              legend: 'Voici les deux îles de départs, complêtes avec leurs biomes.',
              src: 'https://cdn.discordapp.com/attachments/927273027203391499/927281697236590612/SPOILER_unknown.png',
            },
            {
              id: 'corse_sardaigne',
              legend: 'La Corse et la Sardaigne',
              src: 'https://media.discordapp.net/attachments/927273027203391499/927282272120487936/Corse_Sardaigne.png',
            },
            {
              id: 'island',
              legend: "L'Islande",
              src: 'https://media.discordapp.net/attachments/927273027203391499/927282335135715338/Island.png',
            },
            {
              id: 'tamriel',
              legend: 'Tamriel',
              src: 'https://media.discordapp.net/attachments/927273027203391499/927282407114178690/Tamriel.png',
            },
            {
              id: 'united_kingdom',
              legend: 'Le Royaume Uni',
              src: 'https://media.discordapp.net/attachments/927273027203391499/927282479939862578/RU.png',
            },
            {
              id: 'westeros',
              legend: 'Westeros',
              src: 'https://media.discordapp.net/attachments/927273027203391499/927282755157508136/Westeros.png',
            },
            {
              id: 'kalimdor',
              legend: 'Kalimdor',
              src: 'https://media.discordapp.net/attachments/927273027203391499/927282835151265892/Kalimdor.png',
            },
            {
              id: 'azeroth',
              legend: "Le continent d'Azeroth",
              src: 'https://media.discordapp.net/attachments/927273027203391499/927282924317995078/Azeroth.png',
            },
            {
              id: 'ireland',
              legend: "L'Irlande",
              src: 'https://media.discordapp.net/attachments/927273027203391499/927283015334363186/Irland.png',
            },
            {
              id: 'middle_earth',
              legend: 'La terre du milieu',
              src: 'https://media.discordapp.net/attachments/927273027203391499/927283078576111636/TerreDuMilieu.png',
            },
            {
              id: 'japan',
              legend: 'Le Japon',
              src: 'https://media.discordapp.net/attachments/927273027203391499/927283138336534599/Japon.png',
            },
          ].map(image => (
            <Figure key={image.id} legend={image.legend}>
              <ZoomableImage
                dataCy={getDataValue('world', image.id, 'zoomable_image')}
                src={image.src}
                alt={image.legend}
                height={400}
                width={400}
                objectFit="contain"
                objectPosition="top"
              />
            </Figure>
          ))}
        </VStack>
      </VStack>
    </Background>
  );
};

export default World;
