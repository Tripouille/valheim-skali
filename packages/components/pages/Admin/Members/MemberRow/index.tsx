import { BiEdit } from 'react-icons/bi';
import { useDisclosure } from '@chakra-ui/react';
import { limitedWidthVariant } from '@packages/theme/components/LimitedWidthText';
import { getDataValue, DataAttributes } from '@packages/utils/dataAttributes';
import { isUserWithInfos, User } from '@packages/store/users/type';
import { Role } from '@packages/store/roles/type';
import { Wrap } from '@packages/components/core/Containers/Wrap';
import IconButton from '@packages/components/core/Interactive/IconButton';
import Tag from '@packages/components/core/DataDisplay/Tag';
import { Td, Tr } from '@packages/components/core/DataDisplay/Table';
import { rowIconSize } from '../../utils';
import MemberModal from '../MemberModal';
import MemberAvatar from '../MemberAvatar';

export interface MemberRowProps extends DataAttributes {
  user: User;
  roles: Role[];
}

const MemberRow: React.FC<MemberRowProps> = ({ dataCy, user, roles }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userHasInfos = isUserWithInfos(user);

  return (
    <Tr>
      <Td>
        <MemberAvatar dataCy={dataCy} src={user.image} />
      </Td>
      <Td textAlign="center" {...limitedWidthVariant}>
        {userHasInfos ? user.nameInGame : null}
      </Td>
      <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center" {...limitedWidthVariant}>
        {user.name}
      </Td>
      <Td display={{ base: 'none', sm: 'table-cell' }}>
        {userHasInfos && (
          <Wrap justify="center">
            {user.roles?.map(roleId => {
              const role = roles.find(r => r._id === roleId);
              return role ? <Tag key={roleId} label={role.name} /> : null;
            })}
          </Wrap>
        )}
      </Td>
      <Td>
        <IconButton
          dataCy={getDataValue(dataCy, 'edit')}
          aria-label="Modifier l'utilisateur"
          title="Modifier l'utilisateur"
          icon={<BiEdit size="30" />}
          variant="ghost"
          size={rowIconSize}
          onClick={onOpen}
        />
        <MemberModal
          dataCy={getDataValue(dataCy, 'modal')}
          isOpen={isOpen}
          onClose={onClose}
          user={user}
          roles={roles}
        />
      </Td>
    </Tr>
  );
};

export default MemberRow;