import React from 'react';
import { signIn, signOut } from 'next-auth/react';
import { MdLogin, MdLogout } from 'react-icons/md';
import { DataAttributes } from '@packages/utils/types';
import { getDataValue } from '@packages/utils/dataAttributes';
import { MenuItem } from '@packages/components/core/Overlay/Menu';

export interface SignInOutProps extends DataAttributes {
  isConnected: boolean;
}

const SignInOut: React.FC<SignInOutProps> = ({ dataCy, isConnected }) => {
  const icon = isConnected ? <MdLogout size="20" /> : <MdLogin size="20" />;
  const label = isConnected ? 'Se déconnecter' : 'Se connecter';
  const onClick = () => (isConnected ? signOut() : signIn('discord'));

  return (
    <MenuItem dataCy={getDataValue(dataCy, 'sign_in_out')} icon={icon} onClick={onClick}>
      {label}
    </MenuItem>
  );
};

export default SignInOut;
