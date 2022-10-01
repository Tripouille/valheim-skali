import NextLink from 'next/link';
import { GiFeather, GiOpenBook } from 'react-icons/gi';
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
import { getRoute, OtherRoute, ROUTES_TO_LABEL } from 'utils/routes';

interface JoinIntroductionMainButtonProps {
  isConnected: boolean;
  hasApplication?: boolean;
}

const JoinIntroductionMainButton: React.FC<JoinIntroductionMainButtonProps> = ({
  isConnected,
  hasApplication,
}) => {
  if (hasApplication) {
    //TODO
    return (
      <NextLink href={getRoute('rules')}>
        <Button rightIcon={<GiFeather />}>Clique ici pour voir ta candidature</Button>
      </NextLink>
    );
  } else if (isConnected) {
    return (
      <NextLink href={getRoute('rules')}>
        <Button rightIcon={<GiOpenBook />}>Prêt ? Clique ici pour aller au règlement !</Button>
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
        <PageTitle title={ROUTES_TO_LABEL[OtherRoute.JOIN]} />
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
            "Passer un petit test, pour s'assurer que tu comprends bien le règlement",
            "Discuter avec un Viking du Valhabba, pour s'assurer que tu es prêt à rejoindre le Valhabba",
            'Installer nos mods et venir jouer !',
            'Choisir un clan (🔵Est ou 🟢Ouest) pour avoir accès aux canaux du Discord et à ta zone de clan',
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
              <NextLink href={getRoute('wiki')}>
                <Button>Wiki</Button>
              </NextLink>{' '}
              <Secured permissions={{ [PermissionCategory.EVENT]: eventPrivilege.READ }}>
                ou encore aux{' '}
                <NextLink href={getRoute('events')}>
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
