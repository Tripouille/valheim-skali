import React from 'react';
import { signIn, signOut } from 'next-auth/react';
import { MdLogin, MdLogout } from 'react-icons/md';
import { createDataAttributes } from '@packages/utils/dataAttributes/createDataAttributes';
import { MenuItem } from '@packages/components/core/Menu';

export interface SignInOutProps {
  isConnected: boolean;
}

const SignInOut: React.FC<SignInOutProps> = ({ isConnected }) => {
  const icon = isConnected ? <MdLogout size="20" /> : <MdLogin size="20" />;
  const label = isConnected ? 'Se déconnecter' : 'Se connecter';
  const onClick = () => (isConnected ? signOut() : signIn('discord'));

  return (
    <MenuItem
      icon={icon}
      onClick={onClick}
      {...createDataAttributes(['nav_bar', 'account_menu', 'drop_down', 'sign_in_out'])}
    >
      {label}
    </MenuItem>
  );
};

export default SignInOut;
