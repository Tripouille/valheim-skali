import { DefaultSession } from 'next-auth';
import { Permission } from '@packages/utils/constants';

declare module 'next-auth' {
  interface Session {
    permissions?: Permission[];
    user: DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    permissions?: Permission[];
  }
}
