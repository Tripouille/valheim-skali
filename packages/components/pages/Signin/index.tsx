import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import React from 'react';
import { GiVikingHelmet } from 'react-icons/gi';
import Background from '@packages/components/core/Containers/Background';
import Center from '@packages/components/core/Containers/Center';
import Button from '@packages/components/core/Interactive/Button';
import Text from '@packages/components/core/Typography/Text';
import { getDataValue } from '@packages/utils/dataAttributes';
import { getRouteParameterAsString } from '@packages/utils/routes';
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
