import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { BiLinkExternal } from 'react-icons/bi';
import { getDataValue } from '@packages/utils/dataAttributes';
import Background from '@packages/components/core/Containers/Background';
import { VStack } from '@packages/components/core/Containers/Stack';
import Box from '@packages/components/core/Containers/Box';
import PageTitle from '@packages/components/core/Typography/PageTitle';
import Text from '@packages/components/core/Typography/Text';
import Heading from '@packages/components/core/Typography/Heading';
import { UnorderedList, ListItem } from '@packages/components/core/DataDisplay/List';
import Icon from '@packages/components/core/Images/Icon';
import Link from '@packages/components/core/Interactive/Link';

const About = () => (
  <Background w="4xl">
    <PageTitle title="A propos du site" />
    <VStack mt="8" spacing="6" align="start">
      <VStack align="start">
        <Text>Skali a été produit par :</Text>
        <UnorderedList stylePosition="inside">
          <ListItem>
            Astrid (alias Chinimala, alias Hedda au Valhabba)
            <Link
              dataCy={getDataValue('about')}
              href="https://www.linkedin.com/in/astrid-allemandou/"
              isExternal
              ms="2"
            >
              <Icon as={FaLinkedin} />
            </Link>
            <Link
              dataCy={getDataValue('about')}
              href="https://github.com/Chinimala"
              isExternal
              ms="2"
            >
              <Icon as={FaGithub} />
            </Link>
          </ListItem>
          <ListItem>
            Jean-Michel (alias Tripouille)
            <Link
              dataCy={getDataValue('about')}
              href="https://github.com/Tripouille"
              isExternal
              ms="2"
            >
              <Icon as={FaGithub} />
            </Link>
          </ListItem>
        </UnorderedList>
        <Text>et a reçu la contribution de :</Text>
        <UnorderedList stylePosition="inside">
          <ListItem>
            Guillaume (alias GlaceCoding, alias Styrman au Valhabba)
            <Link
              dataCy={getDataValue('about')}
              href="https://github.com/GlaceCoding"
              isExternal
              ms="2"
            >
              <Icon as={FaGithub} />
            </Link>
          </ListItem>
        </UnorderedList>
      </VStack>
      <Text>
        Skali est codé en{' '}
        <Link dataCy={getDataValue('about')} href="https://www.typescriptlang.org/" isExternal>
          Typescript
        </Link>{' '}
        <Link dataCy={getDataValue('about')} href="https://nextjs.org/" isExternal>
          NextJS
        </Link>
        , déployé sur{' '}
        <Link dataCy={getDataValue('about')} href="https://vercel.com/" isExternal>
          Vercel
        </Link>
        , et testé avec{' '}
        <Link dataCy={getDataValue('about')} href="https://jestjs.io/" isExternal>
          Jest
        </Link>
        ,{' '}
        <Link dataCy={getDataValue('about')} href="https://www.cypress.io/" isExternal>
          Cypress
        </Link>
        ,{' '}
        <Link dataCy={getDataValue('about')} href="https://storybook.js.org/" isExternal>
          Storybook
        </Link>{' '}
        et{' '}
        <Link dataCy={getDataValue('about')} href="https://www.chromatic.com/" isExternal>
          Chromatic
        </Link>
        . Il utilise les libraries{' '}
        <Link dataCy={getDataValue('about')} href="https://chakra-ui.com/" isExternal>
          Chakra UI
        </Link>
        ,{' '}
        <Link dataCy={getDataValue('about')} href="https://redux-saga.js.org/" isExternal>
          Redux-Saga
        </Link>{' '}
        et{' '}
        <Link dataCy={getDataValue('about')} href="https://next-auth.js.org/" isExternal>
          NextAuth.js
        </Link>
        .
      </Text>
      <Text>
        <Link
          dataCy={getDataValue('about')}
          href="https://github.com/Tripouille/valheim-skali"
          isExternal
        >
          Le dépôt est public sur Github. <Icon as={BiLinkExternal} verticalAlign="text-bottom" />
        </Link>
      </Text>
      <Text>
        Si vous constatez le moindre bug ou souhaitez proposer une amélioration, contactez Hedda
        l&apos;Itinérante (Chinimala#5652) sur Discord.
      </Text>
      <Box>
        <Heading size="md" my="4">
          Dernières mises à jour :
        </Heading>
        <UnorderedList stylePosition="inside" spacing="2">
          <ListItem>
            Page &quot;A propos&quot;, ajout de rôles et d&apos;un back-office pour les
            administrateurs
          </ListItem>
          <ListItem>
            Première publication : page d&apos;accueil, règlement, événements, commerce, mods,
            monde, connexion par discord
          </ListItem>
        </UnorderedList>
      </Box>
    </VStack>
  </Background>
);

export default About;
