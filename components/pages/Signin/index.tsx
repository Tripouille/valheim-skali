import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import React from 'react';
import { GiVikingHelmet } from 'react-icons/gi';
import Background from 'components/core/Containers/Background';
import Center from 'components/core/Containers/Center';
import Button from 'components/core/Interactive/Button';
import Text from 'components/core/Typography/Text';
import { getDataValue } from 'utils/dataAttributes';
import { getRouteParameterAsString } from 'utils/routes';
import { getAuthErrorMessage } from './utils';

const Signin = () => {
  const router = useRouter();

  const onClick = () => {
    signIn('discord', { callbackUrl: getRouteParameterAsString(router.query.callbackUrl) });
  };

  return (
    <Background h="full">
      <Center h="full" flexDirection="column">
        {router.query.error && (
          <Text mb="3">{getAuthErrorMessage(getRouteParameterAsString(router.query.error))}</Text>
        )}
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
