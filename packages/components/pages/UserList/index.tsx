/* eslint-disable no-underscore-dangle */
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Input } from '@chakra-ui/react';
import { State } from '@packages/store';
import selectUsers from '@packages/store/users/selectors';
import { actions } from '@packages/store/users/slice';
import { User, UserWithoutId } from '@packages/store/users/type';
import Button from '@packages/components/core/Button';
import Center from '@packages/components/core/Center';
import Flex from '@packages/components/core/Flex';
import Heading from '@packages/components/core/Heading';
import { List, ListItem } from '@packages/components/core/List';

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
    <Flex height="full" alignItems="center" justifyContent="center">
      <List backgroundColor="blue.200" p={12} rounded={6}>
        <Heading m={6} textAlign="center" border="3px black solid" p={3}>
          User List
        </Heading>
        {users.map(user => (
          <ListItem key={user._id}>
            <Flex justifyContent="space-between" mb="3">
              <Image src={user.image} width="100" height="100" alt="user avatar" />
              <Center width="100%" justifyContent="left">
                {user.name}
              </Center>
              <Button
                elementCategories={[]}
                backgroundColor="red.200"
                ml={3}
                onClick={() => onRemoveUser(user)}
              >
                Remove
              </Button>
            </Flex>
          </ListItem>
        ))}
        <ListItem textAlign="center">
          <Flex textAlign="center" justifyContent="space-between">
            <Input width="100%" value={input} p={0} onChange={e => setInput(e.target.value)} />
            <Button
              elementCategories={[]}
              backgroundColor="green.200"
              ml={3}
              onClick={() => {
                onAddUser({ name: input, email: '', image: '' });
                setInput('');
              }}
            >
              Add
            </Button>
          </Flex>
        </ListItem>
      </List>
    </Flex>
  );
};

const mapStateToProps = (state: State) => ({
  users: selectUsers(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  pullUsers: () => dispatch(actions.pullRequest()),
  onAddUser: (user: UserWithoutId) => dispatch(actions.addRequest(user)),
  onRemoveUser: (user: User) => dispatch(actions.removeRequest(user)),
});

const ConnectedUserList = connect(mapStateToProps, mapDispatchToProps)(UserList);

export default ConnectedUserList;
