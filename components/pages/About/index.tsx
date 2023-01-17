import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Background from 'components/core/Containers/Background';
import { VStack } from 'components/core/Containers/Stack';
import { UnorderedList, ListItem } from 'components/core/DataDisplay/List';
import Icon from 'components/core/Images/Icon';
import ExternalLink from 'components/core/Interactive/ExternalLink';
import PageTitle from 'components/core/Typography/PageTitle';
import Text from 'components/core/Typography/Text';
import { MenuRoute, ROUTES_TO_LABEL } from 'utils/routes';

const About = () => (
  <Background w="4xl">
    <PageTitle title={ROUTES_TO_LABEL[MenuRoute.ABOUT]} />
    <VStack mt="8" spacing="6" align="start">
      <VStack align="start">
        <Text>Skali a été produit par :</Text>
        <UnorderedList stylePosition="inside">
          <ListItem>
            Astrid (alias Chinimala, alias Hedda au Valhabba)
            <ExternalLink
              href="https://www.linkedin.com/in/astrid-allemandou"
              ariaLabel="Linkedin Astrid Allemandou"
              ms="2"
              color="white"
            >
              <Icon as={FaLinkedin} />
            </ExternalLink>
            <ExternalLink
              href="https://github.com/Chinimala"
              ariaLabel="Github Chinimala"
              ms="2"
              color="white"
            >
              <Icon as={FaGithub} />
            </ExternalLink>
          </ListItem>
          <ListItem>
            Jean-Michel (alias Tripouille)
            <ExternalLink
              href="https://github.com/Tripouille"
              ariaLabel="Github Tripouille"
              ms="2"
              color="white"
            >
              <Icon as={FaGithub} />
            </ExternalLink>
          </ListItem>
        </UnorderedList>
        <Text>et a reçu la contribution de :</Text>
        <UnorderedList stylePosition="inside">
          <ListItem>
            Guillaume (alias GlaceCoding, alias Styrman au Valhabba)
            <ExternalLink
              href="https://github.com/GlaceCoding"
              ariaLabel="Github GlaceCoding"
              ms="2"
              color="white"
            >
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
        <ExternalLink href="https://github.com/Tripouille/valheim-skali" withIcon>
          Le dépôt est public sur Github.
        </ExternalLink>
      </Text>
      <Text>
        Si vous constatez le moindre bug ou souhaitez proposer une amélioration, contactez
        Hedda&nbsp;(Chinimala#5652) sur Discord.
      </Text>
    </VStack>
  </Background>
);

export default About;
