import React from 'react';
import { ComponentWithAuth } from '@packages/utils/types';
import { Permission } from '@packages/utils/constants';
import UserList from '@packages/components/pages/UserList';

const UsersPage: ComponentWithAuth = () => <UserList />;

UsersPage.needAuth = { permission: Permission.USER };
export default UsersPage;
