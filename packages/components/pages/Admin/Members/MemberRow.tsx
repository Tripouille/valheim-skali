import { useMemo } from 'react';
import { BiEdit } from 'react-icons/bi';
import { useDisclosure } from '@chakra-ui/react';
import { limitedWidthVariant } from '@packages/theme/components/LimitedWidthText';
import { getDataValue, DataAttributes } from '@packages/utils/dataAttributes';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import { User } from '@packages/data/user';
import { compareRolesFromName, Role } from '@packages/data/role';
import { Wrap } from '@packages/components/core/Containers/Wrap';
import IconButton from '@packages/components/core/Interactive/IconButton';
import Tag from '@packages/components/core/DataDisplay/Tag';
import { Td, Tr } from '@packages/components/core/DataDisplay/Table';
import Secured from '@packages/components/core/Authentication/Secured';
import { getUserRoles, rowIconSize } from '../utils';
import MemberModal from './MemberModal';
import MemberAvatar from './MemberAvatar';

export interface MemberRowProps extends DataAttributes {
  user: User;
  roles: Role[];
}

const MemberRow: React.FC<MemberRowProps> = ({ dataCy, user, roles }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userRoles = useMemo(
    () => getUserRoles(user, roles).sort(compareRolesFromName),
    [user, roles],
  );

  return (
    <Tr>
      <Td>
        <MemberAvatar dataCy={dataCy} src={user.image} />
      </Td>
      <Td textAlign="center" {...limitedWidthVariant}>
        {user.nameInGame}
      </Td>
      <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center" {...limitedWidthVariant}>
        {user.name}
      </Td>
      <Secured permissions={{ [PermissionCategory.ROLE]: PermissionPrivilege.READ }}>
        <Td display={{ base: 'none', sm: 'table-cell' }}>
          {
            <Wrap justify="center">
              {userRoles.map(role => {
                return role ? <Tag key={role._id} label={role.name} /> : null;
              })}
            </Wrap>
          }
        </Td>
      </Secured>
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
