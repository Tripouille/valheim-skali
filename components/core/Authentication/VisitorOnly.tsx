import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSession from 'hooks/useSession';
import { SessionStatus } from 'utils/auth';
import { Children } from 'utils/types';

export interface VisitorOnlyProps {
  fallback?: Children;
  redirectOnFail?: Children;
  redirectUrl?: string;
  children: Children;
}

const VisitorOnly: React.FC<VisitorOnlyProps> = ({
  children,
  fallback,
  redirectOnFail,
  redirectUrl,
}) => {
  const session = useSession();
  const router = useRouter();

  const isVisitor = session.status === SessionStatus.UNAUTHENTICATED || session.data?.isNonMember;

  useEffect(() => {
    if (redirectOnFail && redirectUrl && !isVisitor && session.status !== SessionStatus.LOADING)
      router.push(redirectUrl);
  }, [isVisitor, redirectOnFail, redirectUrl, router, session.status]);

  if (isVisitor) return <>{children}</>;
  if (fallback) return <>{fallback}</>;
  return null;
};

export default VisitorOnly;
