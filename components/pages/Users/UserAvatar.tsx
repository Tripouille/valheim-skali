import Image from 'components/core/Images/Image';
import { avatarSize } from 'theme/admin';

export interface UserAvatarProps {
  src: string;
  size?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ src, size }) => {
  return (
    <Image
      src={src}
      width={size ?? avatarSize}
      height={size ?? avatarSize}
      alt="Avatar de l'utilisateur"
    />
  );
};

export default UserAvatar;
