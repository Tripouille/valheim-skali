import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import CustomText from '@packages/components/CustomText';

const StreamerRules = () => (
  <>
    <CustomText
      paragraphs={[
        `La seule condition que nous mettons aux streams en direct est ... LE CONSENTEMENT DE CEUX QUI SERONT ENREGISTRÉS.`,
        `Concrètement si vous souhaitez streamer, ça se passe comme ça : vous streamez quand vous voulez, et où vous voulez, dès lors que :`,
      ]}
    />
    <Box mb="4">
      <Heading size="s" display="flex" alignItems="center">
        1/ Tous les joueurs qui apparaissent à votre écran vous ont donné leur accord.
      </Heading>
      <CustomText
        paragraphs={[
          `Si vous tombez sur quelqu'un de manière inattendue vous devez lui mettre dans le chat du jeu un message du style “Je streame en direct mon jeu, est ce que ça te dérange d'y apparaître ?”. À vous de trouver votre propre formule, mais elle doit dire clairement et sans ambigüité que vous enregistrez.`,
          `Si la personne vous dit oui, nickel, amusez-vous 🤗 Si elle vous dit non, c’est à vous de vous éloigner du joueur afin qu'il n'apparaisse plus dans votre stream.`,
        ]}
      />
    </Box>
    <Box mb="4">
      <Heading size="s" display="flex" alignItems="center">
        2/ Si vous êtes souhaitez streamer vos échanges vocaux dans notre discord, vous devez
        impérativement être dans le canal vocal &quot;Stream en direct&quot;
      </Heading>
      <CustomText
        paragraphs={[
          `Lorsqu’une personne vous y rejoint, vous devez la prévenir que vous enregistrez. En revanche, si ça ne plaît pas à celle-ci, c'est à elle de quitter le salon vocal.`,
          `De cette manière, ceux qui vous rejoignent seront doublement prévenus que leur voix est enregistrée (le nom du salon + votre annonce à chaque arrivée).`,
        ]}
      />
    </Box>
    <Box mb="4">
      <Heading size="s" display="flex" alignItems="center">
        3/ Quand vous streamez, changez votre pseudo discord et accolez-lui le préfixe :
        <Box as="span" bgColor="gray.800" ms="2" fontWeight="normal">
          [stream : 🟢]
        </Box>
      </Heading>
      <CustomText
        paragraphs={[
          `Afin d'être encore plus clair vis-à-vis des autres,  changez votre pseudo Discord et accolez-lui le préfix :  [stream : 🟢 ] (clic droit, changez le pseudo etc).`,
          `Exemple : si l’admin Gyda Selordotyr voulait streamer, il passerait du pseudo, “Gyda Selordotyr”, à  “[stream : 🟢] Gyda Selordotyr”.`,
        ]}
      />
    </Box>
    <Box mb="4">
      <Heading size="s" display="flex" alignItems="center">
        4/ Vous ne montrez pas le contenu du discord ni votre écran de connexion (et donc de
        l&apos;IP du serveur).
      </Heading>
    </Box>
  </>
);

export default StreamerRules;
