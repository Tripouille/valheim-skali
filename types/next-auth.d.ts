import { DefaultSession } from 'next-auth';
import { Permissions } from '@packages/utils/auth';

declare module 'next-auth' {
  interface Session {
    permissions: Permissions;
    user: DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    permissions: Permissions;
  }
}
