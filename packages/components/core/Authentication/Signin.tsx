import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import React from 'react';
import { GiVikingHelmet } from 'react-icons/gi';
import Background from '@packages/components/core/Containers/Background';
import Center from '@packages/components/core/Containers/Center';
import Button from '@packages/components/core/Interactive/Button';
import Text from '@packages/components/core/Typography/Text';
import { getDataValue } from '@packages/utils/dataAttributes';

enum AuthError {
  CALLBACK = 'Callback',
  SESSION_REQUIRED = 'SessionRequired',
}

const Signin = () => {
  const router = useRouter();

  const getErrorText = (): string => {
    if (router.query.error === AuthError.CALLBACK) {
      return "Il y a eu un problème avec l'authentification ; ou bien vous avez annulé votre connexion, dans ce cas il n'y a pas de problème :)";
    } else if (router.query.error === AuthError.SESSION_REQUIRED) {
      return "Vous n'êtes pas autorisé à visiter cette page. Veuillez vous connecter.";
    } else {
      return "Il y a eu un problème avec l'authentification. Réessayez ou contactez le propriétaire du site.";
    }
  };

  const getCallbackUrl = (): string | undefined => {
    return Array.isArray(router.query.callbackUrl)
      ? router.query.callbackUrl[0]
      : router.query.callbackUrl;
  };

  const onClick = () => {
    signIn('discord', { callbackUrl: getCallbackUrl() });
  };

  return (
    <Background h="full">
      <Center h="full" flexDirection="column">
        {router.query.error && <Text mb="3">{getErrorText()}</Text>}
        <Button
          dataCy={getDataValue('signin', 'button')}
          leftIcon={<GiVikingHelmet />}
          onClick={onClick}
        >
          Cliquez ici pour vous connecter avec Discord
        </Button>
      </Center>
    </Background>
  );
};

export default Signin;
