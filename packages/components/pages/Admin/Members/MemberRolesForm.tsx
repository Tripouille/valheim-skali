import { BsPlusLg } from 'react-icons/bs';
import { isUserWithInfos, User } from '@packages/data/user';
import { Role } from '@packages/data/role';
import { getDataValue, DataAttributes } from '@packages/utils/dataAttributes';
import { Wrap } from '@packages/components/core/Containers/Wrap';
import Box from '@packages/components/core/Containers/Box';
import { Menu, MenuButton, MenuItem, MenuList } from '@packages/components/core/Overlay/Menu';
import Tag from '@packages/components/core/DataDisplay/Tag';
import Button from '@packages/components/core/Interactive/Button';

export interface MembersRoleFormProps extends DataAttributes {
  user: User;
  roles: Role[];
}

const MembersRoleForm: React.FC<MembersRoleFormProps> = ({ dataCy, user, roles }) => {
  const userHasInfos = isUserWithInfos(user);
  const nonOwnedRoles = userHasInfos ? roles.filter(role => !user.roles.includes(role._id)) : roles;

  return (
    <Wrap>
      {userHasInfos &&
        user.roles.map(roleId => {
          const role = roles.find(r => r._id === roleId);
          return role ? <Tag key={roleId} label={role.name} size="lg" onClose={() => {}} /> : null;
        })}
      {nonOwnedRoles.length > 0 && (
        <Box>
          <Menu placement="bottom" gutter={0}>
            <MenuButton
              dataCy={getDataValue(dataCy, 'add_role')}
              as={Button}
              leftIcon={<BsPlusLg />}
              lineHeight="1em"
              colorScheme="green"
            >
              Ajouter un rôle
            </MenuButton>
            <MenuList minW="min-content">
              {nonOwnedRoles.map(role => (
                <MenuItem
                  key={role._id}
                  dataCy={getDataValue(dataCy, 'add_role', role._id)}
                  justifyContent="center"
                >
                  <Tag label={role.name} size="lg" />
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
      )}
    </Wrap>
  );
};

export default MembersRoleForm;
