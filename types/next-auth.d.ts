/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultSession } from 'next-auth';
import { Permissions } from 'utils/permissions';
import { StrictReactNode } from 'utils/types';

declare module 'next-auth' {
  interface Session {
    permissions: Permissions;
    isNonMember: boolean;
    hasApplication: boolean;
    user: DefaultSession['user'] & {
      _id?: string;
      nameInGame?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    permissions: Permissions;
  }
}

declare module 'react-string-replace' {
  export = (
    text?: string | ReactNodeArray | undefined,
    regex?: string | RegExp | undefined,
    cb?: ((match: string, index: number, offset: number) => ReactNode) | undefined,
  ): StrictReactNode[] => {};
}
