import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State } from 'store';
import selectUsers from 'store/users/selectors';
import { actions } from 'store/users/slice';
import { User, UserWithoutId } from 'store/users/type';
import { Button, Flex, List, Heading, ListItem, Input, Center } from '@chakra-ui/react';

export interface UserListProps {
  users: User[];
  pullUsers: () => void;
  onAddUser: (user: UserWithoutId) => void;
  onRemoveUser: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, pullUsers, onAddUser, onRemoveUser }) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    pullUsers();
  }, [pullUsers]);

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <List direction="column" backgroundColor="blue.200" p={12} rounded={6}>
        <Heading m={6} textAlign="center" border="3px black solid" p={3}>
          User List
        </Heading>
        {users.map(user => {
          return (
            <ListItem key={user._id}>
              <Flex justifyContent="space-between" mb="3">
                <Center width="100%" justifyContent="left">
                  {user.name}
                </Center>
                <Button backgroundColor="red.200" ml={3} onClick={() => onRemoveUser(user)}>
                  Remove
                </Button>
              </Flex>
            </ListItem>
          );
        })}
        <ListItem textAlign="center">
          <Flex textAlign="center" justifyContent="space-between">
            <Input width="100%" value={input} p={0} onChange={e => setInput(e.target.value)} />
            <Button
              backgroundColor="green.200"
              ml={3}
              onClick={() => {
                onAddUser({ name: input, age: 0 });
                setInput('');
              }}>
              Add
            </Button>
          </Flex>
        </ListItem>
      </List>
    </Flex>
  );
};

const mapStateToProps = (state: State) => {
  return {
    users: selectUsers(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    pullUsers: () => dispatch(actions.pullRequest()),
    onAddUser: (user: UserWithoutId) => dispatch(actions.addRequest(user)),
    onRemoveUser: (user: User) => dispatch(actions.removeRequest(user)),
  };
};

const ConnectedUserList = connect(mapStateToProps, mapDispatchToProps)(UserList);

export default ConnectedUserList;
