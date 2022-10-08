import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { GiVikingHelmet } from 'react-icons/gi';
import Button from 'components/core/Interactive/Button';
import { getRouteParameterAsString } from 'utils/routes';

interface SigninButtonProps {
  label: string;
}

const SigninButton: React.FC<SigninButtonProps> = ({ label }) => {
  const router = useRouter();

  const onClick = () => {
    signIn('discord', { callbackUrl: getRouteParameterAsString(router.query.callbackUrl) });
  };

  return (
    <Button data-cy="signin" leftIcon={<GiVikingHelmet />} onClick={onClick}>
      {label}
    </Button>
  );
};

export default SigninButton;
