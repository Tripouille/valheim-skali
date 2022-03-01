import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { BiLinkExternal } from 'react-icons/bi';
import Background from '@packages/components/core/Containers/Background';
import { VStack } from '@packages/components/core/Containers/Stack';
import Box from '@packages/components/core/Containers/Box';
import PageTitle from '@packages/components/core/Typography/PageTitle';
import Text from '@packages/components/core/Typography/Text';
import Heading from '@packages/components/core/Typography/Heading';
import { UnorderedList, ListItem } from '@packages/components/core/DataDisplay/List';
import Icon from '@packages/components/core/Images/Icon';
import ExternalLink from './ExternalLink';

const About = () => (
  <Background w="4xl">
    <PageTitle title="A propos du site" />
    <VStack mt="8" spacing="6" align="start">
      <VStack align="start">
        <Text>Skali a été produit par :</Text>
        <UnorderedList stylePosition="inside">
          <ListItem>
            Astrid (alias Chinimala, alias Hedda au Valhabba)
            <ExternalLink href="https://www.linkedin.com/in/astrid-allemandou" ms="2">
              <Icon as={FaLinkedin} />
            </ExternalLink>
            <ExternalLink href="https://github.com/Chinimala" ms="2">
              <Icon as={FaGithub} />
            </ExternalLink>
          </ListItem>
          <ListItem>
            Jean-Michel (alias Tripouille)
            <ExternalLink href="https://github.com/Tripouille" ms="2">
              <Icon as={FaGithub} />
            </ExternalLink>
          </ListItem>
        </UnorderedList>
        <Text>et a reçu la contribution de :</Text>
        <UnorderedList stylePosition="inside">
          <ListItem>
            Guillaume (alias GlaceCoding, alias Styrman au Valhabba)
            <ExternalLink href="https://github.com/GlaceCoding" ms="2">
              <Icon as={FaGithub} />
            </ExternalLink>
          </ListItem>
        </UnorderedList>
      </VStack>
      <Text>
        Skali est codé en{' '}
        <ExternalLink href="https://www.typescriptlang.org/">Typescript</ExternalLink>{' '}
        <ExternalLink href="https://nextjs.org/">NextJS</ExternalLink>, déployé sur{' '}
        <ExternalLink href="https://vercel.com/">Vercel</ExternalLink>, et testé avec{' '}
        <ExternalLink href="https://jestjs.io/">Jest</ExternalLink>,{' '}
        <ExternalLink href="https://www.cypress.io/">Cypress</ExternalLink>,{' '}
        <ExternalLink href="https://storybook.js.org/">Storybook</ExternalLink> et{' '}
        <ExternalLink href="https://www.chromatic.com/">Chromatic</ExternalLink>. Il utilise les
        libraries <ExternalLink href="https://chakra-ui.com/">Chakra UI</ExternalLink>,{' '}
        <ExternalLink href="https://react-query.tanstack.com/">React Query</ExternalLink> et{' '}
        <ExternalLink href="https://next-auth.js.org/">NextAuth.js</ExternalLink>.
      </Text>
      <Text>
        <ExternalLink href="https://github.com/Tripouille/valheim-skali">
          Le dépôt est public sur Github. <Icon as={BiLinkExternal} verticalAlign="text-bottom" />
        </ExternalLink>
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
