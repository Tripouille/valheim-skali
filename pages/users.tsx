import React from 'react';
import UserList from '@packages/components/pages/UserList';
import { ComponentWithAuth } from '@packages/utils/types';

const UsersPage: ComponentWithAuth = () => <UserList />;

UsersPage.needAuth = true;
export default UsersPage;
