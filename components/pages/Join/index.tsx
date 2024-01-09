import NextLink from 'next/link';
import { GiFeather, GiOpenBook } from 'react-icons/gi';
import { Alert } from '@chakra-ui/react';
import Secured from 'components/core/Authentication/Secured';
import SigninButton from 'components/core/Authentication/SigninButton';
import Background from 'components/core/Containers/Background';
import Box from 'components/core/Containers/Box';
import Flex from 'components/core/Containers/Flex';
import { VStack } from 'components/core/Containers/Stack';
import IconList from 'components/core/DataDisplay/IconList';
import Button from 'components/core/Interactive/Button';
import PageTitle from 'components/core/Typography/PageTitle';
import Text from 'components/core/Typography/Text';
import useSession from 'hooks/useSession';
import { SessionStatus } from 'utils/auth';
import { eventPrivilege, PermissionCategory } from 'utils/permissions';
import { getRoute, HiddenRoute, NavRoute, ROUTES_TO_LABEL } from 'utils/routes';

interface JoinIntroductionMainButtonProps {
  isConnected: boolean;
  hasApplication?: boolean;
}

const JoinIntroductionMainButton: React.FC<JoinIntroductionMainButtonProps> = ({
  isConnected,
  hasApplication,
}) => {
  if (hasApplication) {
    return (
      <NextLink href={getRoute(`${NavRoute.APPLICATIONS}/me`)}>
        <Button rightIcon={<GiFeather />}>Clique ici pour voir ta candidature</Button>
      </NextLink>
    );
  } else if (isConnected) {
    return (
      <NextLink href={getRoute('rules')}>
        <Button data-cy="go-to-rules" rightIcon={<GiOpenBook />}>
          Prêt ? Clique ici pour aller au règlement !
        </Button>
      </NextLink>
    );
  } else {
    return <SigninButton label="Prêt ? Connecte-toi maintenant !" />;
  }
};

const JoinIntroduction = () => {
  const { data: session, status } = useSession();
  const isConnected = status === SessionStatus.AUTHENTICATED;

  return (
    <Background data-cy="join-introduction">
      <VStack spacing="7">
        <PageTitle title={ROUTES_TO_LABEL[HiddenRoute.JOIN]} />
        <Alert status="error" fontSize="xl">
          {
            "Bonjour à toutes et à tous, nous sommes heureux de vous accueillir sur notre site dédié au jeu Valheim et à notre communauté. Cependant, nous sommes au regret de ne plus pouvoir accepter les recrutements pour le moment. En effet, nous subissons des incompatibilités logiciel sur nos mods du jeu, liées aux dernières versions de Valheim. Cela nous prend un temps considérable et le serveur est ainsi en maintenance. Nous supprimerons ce message une fois la situation rétablie. D'ici-là, il faudra s'armer de patience. Au plaisir de se retrouver prochainement en jeu, autour d'une bonne chope d'hydromel au Valhabba, SKÖLL!"
          }
        </Alert>
        <Text>Pour rejoindre le Valhabba, tu devras:</Text>
        <IconList
          list={[
            !isConnected && (
              <Flex key="signin" gap="5" align="center">
                <SigninButton label="Te connecter avec Discord" />
                <Box fontSize="sm" flex="1" maxW="3xl">
                  Cette connexion est tout aussi sécurisée que lorsque tu te connectes au logiciel
                  Discord. Nous ne recevons aucune autre donnée personnelle que ton adresse mail,
                  que nous n&apos;utilisons pas et ne renvoyons à personne.
                </Box>
              </Flex>
            ),
            'Lire notre règlement',
            'Ecrire une candidature, répondant à quelques questions et avec une présentation de ton personnage (RP)',
            "Répondre à un questionnaire, pour s'assurer que tu comprends bien le règlement",
            "T'annoncer sur notre Discord, pour nous rencontrer et donner tes disponibilités pour un rendez-vous",
            "Discuter quelques minutes avec un Viking du Valhabba pour s'assurer que tu es prêt à rejoindre ce nouveau monde",
            'Installer nos mods et venir jouer !',
          ]}
        />
        {session && !session.isNonMember ? (
          <Box>Que fais-tu ici ? Tu es déjà Viking !</Box>
        ) : (
          <>
            <JoinIntroductionMainButton
              isConnected={isConnected}
              hasApplication={session?.hasApplication}
            />
            <Text>
              Si tu hésites à nous rejoindre, ou que tu es en attente, jette un oeil à notre{' '}
              <NextLink href={getRoute(NavRoute.WIKI)}>
                <Button>Wiki</Button>
              </NextLink>{' '}
              <Secured permissions={{ [PermissionCategory.EVENT]: eventPrivilege.READ }}>
                ou encore aux{' '}
                <NextLink href={getRoute(NavRoute.EVENTS)}>
                  <Button>événements en cours</Button>
                </NextLink>{' '}
              </Secured>
              !
            </Text>
          </>
        )}
      </VStack>
    </Background>
  );
};

export default JoinIntroduction;
