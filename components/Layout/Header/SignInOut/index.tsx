import { signIn, signOut } from 'next-auth/react';
import { MenuItem } from '@chakra-ui/react';
import { MdLogin, MdLogout } from 'react-icons/md';

export interface SignInOutProps {
  isConnected: boolean;
}

const SignInOut: React.FC<SignInOutProps> = ({ isConnected }) => {
  const icon = isConnected ? <MdLogout size="20" /> : <MdLogin size="20" />;
  const label = isConnected ? 'Se déconnecter' : 'Se connecter';
  const onClick = () => (isConnected ? signOut() : signIn('discord'));

  return (
    <MenuItem icon={icon} onClick={onClick}>
      {label}
    </MenuItem>
  );
};

export default SignInOut;
