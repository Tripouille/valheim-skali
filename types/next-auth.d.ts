import { DefaultSession } from 'next-auth';
import { Permissions } from 'utils/permissions';

declare module 'next-auth' {
  interface Session {
    permissions: Permissions;
    user: DefaultSession['user'] & {
      _id?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    permissions: Permissions;
  }
}
