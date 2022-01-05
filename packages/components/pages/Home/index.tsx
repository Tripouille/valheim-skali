import React from 'react';
import { Heading, Box } from '@chakra-ui/react';
import Background from '@packages/components/core/Background';
import Paragraphs from '@packages/components/core/Paragraphs';
import Carousel from '@packages/components/core/Carousel';

const Home = () => (
  <Background textAlign="justify">
    <Heading as="h1" size="xl" fontFamily="Norse" mb="5" textAlign="center">
      Bienvenue au Skali du Valhabba
    </Heading>
    <Box mb="5">
      <Paragraphs
        paragraphs={[
          `Mis en ligne le 20 mai par plusieurs joueurs expérimentés, Valhabba est un serveur de jeu
        Valheim mêlant différents principes et mods pour étendre la durée et la difficulté du jeu en
        fonction de la progression du joueur, le tout en préservant le charme originel de Valheim.`,
          `Aujourd'hui cette communauté regroupe des joueurs débutants comme expérimentés,
        cherchant tous l'aventure et des interactions "vikings" (échanges
        économiques, événements PvP, regroupements...). Incarne ton Viking et forge ta légende au
        sein de duels à la hache, de courses de karvs, de combats de forts, de compétitions de tir à
        l'arc, de chasses etc. Tout cela sous le regard des dieux aux caractères changeants.`,
        ]}
      />
    </Box>

    <Heading as="h1" size="l" textAlign="left">
      Quelques souvenirs
    </Heading>
    <Carousel
      elementCategories={['home', 'memory']}
      images={[
        {
          src: 'https://media.discordapp.net/attachments/843884013122486352/919186234646097940/A8.png',
          alt: "Prêts à affronter l'Aîné",
        },
        {
          src: 'https://media.discordapp.net/attachments/843884013122486352/918269777984782366/unknown.png',
          alt: 'Pirates victorieux',
        },
        {
          src: 'https://media.discordapp.net/attachments/843884013122486352/911705614563049492/unknown.png',
          alt: 'Départ de la course de sangliers',
        },
        {
          src: 'https://media.discordapp.net/attachments/843884013122486352/889249325564182568/unknown.png',
          alt: 'Course de karv dans les terres cendrées',
        },
        {
          src: 'https://media.discordapp.net/attachments/843884013122486352/864235426470690853/20210712220223_1.jpg',
          alt: 'La quête pour sauver un viking mourant',
        },
        {
          src: 'https://media.discordapp.net/attachments/843884013122486352/860930873541394472/unknown.png',
          alt: "Bataille à l'arc",
        },
        {
          src: 'https://media.discordapp.net/attachments/843884013122486352/859926344006631474/event.png',
          alt: 'Réunion pré-event autour de La Voix',
        },
        {
          src: 'https://cdn.discordapp.com/attachments/843884013122486352/859872467513769994/20210630210552_1.jpg',
          alt: 'Réunion pré-event autour de La Voix',
        },
        {
          src: 'https://media.discordapp.net/attachments/843884013122486352/847593462064480326/unknown.png',
          alt: "Sacrifice d'un trophée en groupe",
        },
        {
          src: 'https://media.discordapp.net/attachments/843884013122486352/847593161231826954/SPOILER_Boss_2.jpg',
          alt: "Sacrifice pour invoquer l'Aîné",
        },
        {
          src: 'https://media.discordapp.net/attachments/843884013122486352/846464515398434906/unknown.png',
          alt: 'Podium après une course de karv',
        },
        {
          src: 'https://media.discordapp.net/attachments/843884013122486352/846458136943394846/unknown.png',
          alt: 'Course de karv dans une rivière',
        },
        {
          src: 'https://media.discordapp.net/attachments/843884013122486352/845036036602069012/unknown.png',
          alt: 'Des vikins dans un karv',
        },
        {
          src: 'https://media.discordapp.net/attachments/843884013122486352/844664574707892224/SPOILER_unknown.png',
          alt: 'Des vikings sur un radeau',
        },
        {
          src: 'https://puu.sh/IkwCB/82b6c64a85.jpg',
          alt: "Prisons d'événement",
        },
        {
          src: 'https://media.discordapp.net/attachments/894670894012727357/896822669327106058/SPOILER_valheim_2021-10-10_19-31-49.png',
          alt: 'Trônes de podium pour course de karv',
        },
      ]}
      height={200}
    />

    <Heading as="h1" size="l" textAlign="left">
      Quelques paysages
    </Heading>
    <Carousel
      elementCategories={['home', 'landscape']}
      images={[
        {
          src: 'https://media.discordapp.net/attachments/894670894012727357/916819870811815946/paysage_gd_nord.png',
          alt: 'Rivière dans la montagne',
        },
        {
          src: 'https://media.discordapp.net/attachments/894670894012727357/900381856032235630/Capture_decran_2021-10-20_155511.jpg',
          alt: 'Herbe avec pack HD',
        },
        {
          src: 'https://media.discordapp.net/attachments/894670894012727357/913049507665674320/20211124135043_1.jpg',
          alt: 'Flanc pentu de montagne',
        },
        {
          src: 'https://media.discordapp.net/attachments/894670894012727357/895768418463133716/valheim_2021-10-07_18-03-23.png',
          alt: 'Rivière avec le pack HD',
        },
        {
          src: 'https://media.discordapp.net/attachments/894670894012727357/912993380944998440/unknown.png',
          alt: 'Vue sur terres brumeuses et mer depuis montagnes',
        },
        {
          src: 'https://media.discordapp.net/attachments/894670894012727357/907012176215162961/unknown.png',
          alt: "Camp gobelin à l'orée des bois",
        },
        {
          src: 'https://media.discordapp.net/attachments/894670894012727357/901405223162114088/SPOILER_unknown.png',
          alt: 'Sauron o.o',
        },
        {
          src: 'https://media.discordapp.net/attachments/894670894012727357/895768414243663882/valheim_2021-10-07_18-37-49.png',
          alt: 'Paysage campagnard avec le pack HD',
        },
        {
          src: 'https://media.discordapp.net/attachments/894670894012727357/900460305438617630/unknown.png',
          alt: 'Par-dessus les nuages',
        },
        {
          src: 'https://media.discordapp.net/attachments/894670894012727357/895768362922176563/valheim_2021-10-07_16-59-29.png',
          alt: 'Marais avec le pack HD',
        },
        {
          src: 'https://media.discordapp.net/attachments/894670894012727357/899464345476550706/Mountains.png',
          alt: 'Montagnes scintillantes',
        },
        {
          src: 'https://i.imgur.com/3MIqxIj.jpeg',
          alt: 'Grandes plaines',
        },
        {
          src: 'https://media.discordapp.net/attachments/894670894012727357/897608088830488596/unknown.png',
          alt: 'Vue dégagée depuis les montagnes',
        },
      ]}
      height={200}
    />

    <Heading as="h1" size="l" textAlign="left">
      Quelques statistiques
    </Heading>
    <Carousel
      elementCategories={['home', 'statistics']}
      images={[
        {
          src: 'https://media.discordapp.net/attachments/843884013122486352/917910351889170542/unknown.png',
          alt: 'Coût et raffinage des objets',
        },
        {
          src: 'https://media.discordapp.net/attachments/843884013122486352/917553593874264064/unknown.png',
          alt: 'Protection, dégâts et prix des objets',
        },
        {
          src: 'https://media.discordapp.net/attachments/843884013122486352/916804596381388800/unknown.png',
          alt: 'Dégâts et vie des monstres',
        },
        {
          src: 'https://media.discordapp.net/attachments/843884013122486352/916751549177421844/unknown.png',
          alt: "Quantité ramassée en 60 min. d'extermination statique sur des non étoilés",
        },
      ]}
      height={200}
    />

    <Heading as="h1" size="l" mb="3" textAlign="left">
      Le Skali
    </Heading>
    <Paragraphs
      paragraphs={[
        `Le Skali est un site permettant aux dieux et aux vikings de partager des informations et de
      s'organiser. Il est et sera toujours en développement. Par conséquent, les images
      ci-dessus seront bientôt disséminées dans différentes sections !`,
      ]}
    />
  </Background>
);

export default Home;
