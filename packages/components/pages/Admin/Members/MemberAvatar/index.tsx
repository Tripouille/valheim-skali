import { getDataValue, DataAttributes } from '@packages/utils/dataAttributes';
import Image from '@packages/components/core/Images/Image';
import { avatarSize } from '../../utils';

export interface MemberAvatarProps extends DataAttributes {
  src: string;
}

const MemberAvatar: React.FC<MemberAvatarProps> = ({ dataCy, src }) => {
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

export default MemberAvatar;
