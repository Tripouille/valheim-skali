import Image from 'components/core/Images/Image';
import { avatarSize } from '../utils';

export interface UserAvatarProps {
  src: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ src }) => {
  return <Image src={src} width={avatarSize} height={avatarSize} alt="Avatar de l'utilisateur" />;
};

export default UserAvatar;
