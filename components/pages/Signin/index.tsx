import { useRouter } from 'next/router';
import React from 'react';
import Background from 'components/core/Containers/Background';
import Center from 'components/core/Containers/Center';
import Text from 'components/core/Typography/Text';
import { getRouteParameterAsString } from 'utils/routes';
import SigninButton from 'components/core/Authentication/SigninButton';
import { getAuthErrorMessage } from './utils';

const Signin = () => {
  const router = useRouter();

  return (
    <Background data-cy="signin" h="full">
      <Center h="full" flexDirection="column">
        {router.query.error && (
          <Text mb="3">{getAuthErrorMessage(getRouteParameterAsString(router.query.error))}</Text>
        )}
        <SigninButton label="Cliquez ici pour vous connecter avec Discord" />
      </Center>
    </Background>
  );
};

export default Signin;
