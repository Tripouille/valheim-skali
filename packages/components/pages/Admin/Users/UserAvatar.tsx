import { getDataValue, DataAttributes } from '@packages/utils/dataAttributes';
import Image from '@packages/components/core/Images/Image';
import { avatarSize } from '../utils';

export interface UserAvatarProps extends DataAttributes {
  src: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ dataCy, src }) => {
  return (
    <Image
      dataCy={getDataValue(dataCy, 'avatar')}
      src={src}
      width={avatarSize}
      height={avatarSize}
      alt="Avatar de l'utilisateur"
    />
  );
};

export default UserAvatar;
