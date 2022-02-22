import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State } from '@packages/store';
import { User } from '@packages/store/users/type';
import { actions as userActions } from '@packages/store/users/slice';
import selectUsers from '@packages/store/users/selectors';
import { Role } from '@packages/store/roles/type';
import { actions as roleActions } from '@packages/store/roles/slice';
import selectRoles from '@packages/store/roles/selectors';
import { getDataValue } from '@packages/utils/dataAttributes';
import { AdminNavRoute, ROUTES_TO_LABEL } from '@packages/utils/routes';
import { ROUTES_TO_PERMISSIONS } from '@packages/utils/auth';
import Secured from '@packages/components/core/Authentication/Secured';
import {
  Table,
  TableCaption,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@packages/components/core/DataDisplay/Table';
import { avatarSize, getCellWidth, rowIconWidth, tableSize } from '../utils';
import MemberRow from './MemberRow';

export interface UsersProps {
  users: User[];
  pullUsers: () => void;
  onRemoveUser: (user: User) => void;
  roles: Role[];
  pullRoles: () => void;
}

const Members: React.FC<UsersProps> = ({ users, pullUsers, roles, pullRoles }) => {
  useEffect(() => pullUsers(), [pullUsers]);
  useEffect(() => pullRoles(), [pullRoles]);

  return (
    <Secured permissions={ROUTES_TO_PERMISSIONS[AdminNavRoute.MEMBERS]}>
      <Table
        variant="striped"
        colorScheme="blue"
        size={tableSize}
        w={{ base: '100%', md: '90%', xl: '70%' }}
        margin="auto"
        sx={{ tableLayout: 'fixed' }}
      >
        <TableCaption placement="top" mt="0" pt="0" fontFamily="Norse" fontSize="2xl">
          {ROUTES_TO_LABEL[AdminNavRoute.MEMBERS]}
        </TableCaption>
        <Thead>
          <Tr>
            <Th width={getCellWidth(`${avatarSize}px`)}></Th>
            <Th textAlign="center">Pseudo en jeu</Th>
            <Th textAlign="center" display={{ base: 'none', md: 'table-cell' }}>
              Pseudo discord
            </Th>
            <Th textAlign="center" display={{ base: 'none', sm: 'table-cell' }}>
              Rôles
            </Th>
            <Th width={getCellWidth(rowIconWidth)}></Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map(user => (
            <MemberRow
              dataCy={getDataValue('members', user._id)}
              key={user._id}
              user={user}
              roles={roles}
            />
          ))}
        </Tbody>
      </Table>
    </Secured>
  );
};

const mapStateToProps = (state: State) => ({
  users: selectUsers(state),
  roles: selectRoles(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  pullUsers: () => dispatch(userActions.pullRequest()),
  onRemoveUser: (user: User) => dispatch(userActions.removeRequest(user)),
  pullRoles: () => dispatch(roleActions.pullRequest()),
});

const ConnectedMembers = connect(mapStateToProps, mapDispatchToProps)(Members);

export default ConnectedMembers;
