import NextLink from 'next/link';
import React from 'react';
import Background from 'components/core/Containers/Background';
import { VStack } from 'components/core/Containers/Stack';
import IconList from 'components/core/DataDisplay/IconList';
import Button from 'components/core/Interactive/Button';
import PageTitle from 'components/core/Typography/PageTitle';
import Text from 'components/core/Typography/Text';
import { getRoute, OtherRoute, ROUTES_TO_LABEL } from 'utils/routes';
import DiscordButton from 'components/core/Interactive/DiscordButton';

const JoinPage = () => (
  <Background data-cy="join-valhabba">
    <VStack spacing="7">
      <PageTitle title={ROUTES_TO_LABEL[OtherRoute.JOIN]} />
      <Text>Pour rejoindre le Valhabba, vous devrez :</Text>
      <IconList
        list={[
          <NextLink key="rules" href={getRoute('rules')}>
            <Button>Lire notre règlement</Button>
          </NextLink>,
          <DiscordButton
            key="write-application"
            data-cy="write-application"
            href="https://discord.com/channels/1020648216552816661/1021003708286382163"
            label="Ecrire votre candidature sur notre Discord"
          />,
          "Répondre à quelques questions sur notre règlement, pour s'assurer que vous le comprenez bien",
          "Discuter avec un Viking du Valhabba, pour s'assurer que vous êtes prêt à rejoindre le Valhabba",
          'Installer nos mods et venir jouer !',
          'Choisir un clan (🔵Est ou 🟢Ouest) pour avoir accès aux canaux du Discord et à votre zone de clan',
        ]}
      />
      <Text>
        Si vous hésitez à nous rejoindre, ou que vous êtes en attente, jetez un oeil à notre{' '}
        <NextLink href={getRoute('wiki')}>
          <Button>Wiki</Button>
        </NextLink>{' '}
        ou encore aux{' '}
        <NextLink href={getRoute('events')}>
          <Button>événements en cours</Button>
        </NextLink>{' '}
        !
      </Text>
    </VStack>
  </Background>
);

export default JoinPage;
